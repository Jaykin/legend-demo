const path      = require('path');
const webdriver = require('selenium-webdriver');
const $         = require('selenium-query');
const request   = require('superagent');

const basePath  = path.resolve(process.env.__BASE_PATH__);
const walleAuth = require(path.join(basePath, 'configs/walle.auth.json'));
const logger    = require('./logger');
const error     = require('./error');

const _serializeParams = request.serialize['application/x-www-form-urlencoded'];
const walleAddr = 'http://192.168.1.222:8088';
let browser     = null;
let cookieStr   = '';
let taskId      = null;

/**
 * 登录walle
 * @return {Promise}
 */
const _login = () => {
    const { email, password } = walleAuth;
    browser.get(`${walleAddr}/site/login`);

    return new Promise((resolve, reject) => {
        $(browser).find('#loginform-username').val(email)
            .then(() => $(browser).find('#loginform-password').val(password))
            .then(() => $(browser).find('button').attr('name', 'login-button').click())
            .then(() => {
                const $username = $(browser).find('field-loginform-username');
                const $password = $(browser).find('field-loginform-password');

                if ($username.hasClass('has-error') ||
                    $password.hasClass('has-error')) {
                    reject('walle登录用户名或密码错误，请检查');
                } else {
                    logger('Walle 登陆成功！');
                    resolve(true);
                }
            });
    });
};

/**
 * 登录后获取cookies
 * @return {Promise}
 */
const _getCookies = () => browser.manage().getCookies()
    .then((cookies) => {
        cookies.forEach((cookie) => {
            cookieStr += `${cookie.name}=${cookie.value};`;
        });
        logger('Walle cookies 获取成功！');
    });

/**
 * 从DOM中获取上线单信息
 * @param {String} projectId 部署项目在walle的id
 * @param {String} commitMsg 上线单标题
 * @return {Array} commitInfo 包含提交上线单所需所有信息的数组
 */
const _getCommitInfo = (projectId, commitMsg) => {
    browser.get(`${walleAddr}/task/submit?projectId=${projectId}`);

    const commitInfo = [projectId, commitMsg];
    let errorCount = 0;
    const errorMap = [
        'name为_csrf的input值',
        '#start select list第一项value',
        '#end select list第一项value',
    ];

    const _readTheFuckingDOM = () => Promise.all([
        // 获取页面中 name 为 _csrf 的 input 的 value
        // 它是提交上线单的post请求 _csrf 的参数值
        $(browser).find('input').attr('name', '_csrf').val(),
        // 获取页面中 id 为 start 的 select list 的第一个option 的 value
        // 它是提交上线单的post请求 i_don_not_care_this 的参数值
        $(browser).find('#start').children().eq(0).prop('value'),
        // 获取页面中 id 为 end 的 select list 的第一个option 的 value
        // 它是提交上线单的post请求 Task[commit_id] 的参数值
        $(browser).find('#end').children().eq(0).prop('value'),
    ])
    .then((values) => {
        values.forEach((item, index) => {
            if (!item) {
                logger(`获取${errorMap[index]}时出错`);
                errorCount += 1;
            }
        });

        if (errorCount) {
            logger('重新读取dom数据，请稍候……');

            // reset errorCount
            errorCount = 0;

            return _readTheFuckingDOM();
        }
        logger('上线单信息获取完成！');
        return commitInfo.concat(values);
    });

    return _readTheFuckingDOM();
};

/**
 * 提交上线单
 * @param {Array} commitInfo 包含提交上线单所需所有信息的数组
 * @return {Promise}
 */
const _commit = (commitInfo) => {
    const [projectId, commitMsg, _csrf, iDontCare, commitID] = commitInfo;

    const formData = {
        _csrf,
        'Task[title]'      : commitMsg,
        'Task[file_list]'  : '*',
        'Task[branch]'     : '',
        i_don_not_care_this: iDontCare,
        'Task[commit_id]'  : commitID,
    };

    logger(`上线单 commit id: ${commitID}`);

    const formDataStr = _serializeParams(formData);

    return request
            .post(`${walleAddr}/task/submit?projectId=${projectId}`)
            .set('Cookie', cookieStr)
            .send(formDataStr);
};

/**
 * 获取task id
 * @return {String} taskId
 */
const _getTaskID = () => {
    browser.get(`${walleAddr}/task/`);
    return $(browser).find('.task-operation').attr('data-id');
};

const _approve = (id) => {
    taskId = id;
    return request
            .get(`${walleAddr}/task/task-operation`)
            .set('Cookie', cookieStr)
            .query({
                id,
                operation: 1,
            });
};

/**
 * 部署
 * @param {String} taskId
 * @return {Promise}
 */
const _deploy = (taskID) => {
    if (!taskID || typeof taskID !== 'string') {
        throw error('请检查deploy 方法中的 taskID');
    }

    logger('开始部署，请稍候……');

    const paramStr = _serializeParams({ taskId: taskID });

    return request.post(`${walleAddr}/walle/start-deploy`)
            .set('Cookie', cookieStr)
            .send(paramStr);
};


/**
 * 退出登录
 */
const _logoutAndQuit = () => {
    browser.get(`${walleAddr}/site/logout`);
    return browser.quit();
};


/**
 * walle deploy全流程
 * @param {String} projectId
 * @param {String} commitMsg
 * @return {Promise}
 */
const walleDeploy = (projectId, commitMsg) => {
    logger('准备登陆 Walle');
    browser = new webdriver.Builder().forBrowser('chrome').build();

    return _login()
            .then(() => _getCookies())
            .then(() => _getCommitInfo(projectId, commitMsg))
            .then(commitInfo => _commit(commitInfo))
            .then((res) => {
                if (!res || !res.ok) {
                    throw error('提交上线单 error');
                }
                logger('上线单提交成功！');
                return _getTaskID();
            })
            .then((taskID) => {
                logger(`部署 task id: ${taskID}`);
                return _approve(taskID);
            })
            .then((res) => {
                const { code, msg } = res.body;

                if (code !== 0) {
                    throw error(`上线单审核 error: ${msg}`);
                }

                logger('上线单审核成功！');
                return _deploy(taskId);
            })
            .then((res) => {
                const { code, msg } = res.body;

                if (code !== 0) {
                    throw error(`部署 error: ${msg}`);
                }

                logger('部署成功！');
                return _logoutAndQuit();
            });
};

module.exports = walleDeploy;
