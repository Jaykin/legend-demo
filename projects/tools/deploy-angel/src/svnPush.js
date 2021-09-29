const system  = process.env.__SYSTEM__;
const fs      = require('fs-extra');
const cmdExec = require('./cmdExec');
const logger  = require('./logger');

/**
 * 拼接 cd 到 svn 仓库路径的命令
 * @param {String} svnPath svn 仓库路径
 * @return {String} 最终的cd命令
 */
const _cdToSvnPath = (svnPath) => {
    let cdCommand = '';
    if (system === 'mac') {
        cdCommand = `cd ${svnPath}`;
    } else {
        cdCommand = `cd /d ${svnPath}`;
    }

    return cdCommand;
};

/**
 * 执行 svn update 命令
 * @return {Promise}
 */
const _update = svnPath => cmdExec(`${_cdToSvnPath(svnPath)} && svn update`);

/**
 * 把新文件commit到svn仓库
 * @return {Promise}
 */
const _commit = (svnPath, commitMsg) => cmdExec(`${_cdToSvnPath(svnPath)} && svn status && svn add --force .  && svn commit -m "${commitMsg}"`);

/**
 * 把打包好的新文件从dist目录复制到svn仓库
 * @param {String} distPath dist目录路径
 * @param {String} svnPath  svn仓库路径
 * @return {Promise}
 */
const _copy = (distPath, svnPath) => new Promise((resolve, reject) => {
    // 清空目标 svn 目录
    fs.emptyDir(svnPath, (error) => {
        if (error) reject(error);
        logger('清空 svn 仓库完成');
        // 复制 dist 下的文件到目标 svn 目录
        fs.copy(distPath, svnPath, (err) => {
            if (err) reject(err);
            resolve('复制 dist 代码到 svn 仓库完成');
        });
    });
});

/**
 * svn更新文件全流程
 * @param {String} distPath
 * @param {String} svnPath
 * @param {String} commitMsg
 * @return {Promise}
 */
const push = (distPath, svnPath, commitMsg) => {
    logger('准备更新SVN代码');
    return _update(svnPath)
            .then(() => _copy(distPath, svnPath)).then((successMsg) => {
                logger(successMsg);
                logger('SVN代码提交中，请稍候……');
                return _commit(svnPath, commitMsg);
            });
};

module.exports = push;
