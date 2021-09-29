const logger   = require('./logger');
const path     = require('path');

const basePath = path.resolve(process.env.__BASE_PATH__);
let configs    = null;

/**
 * 根据用户输入的命令检测对应的配置
 * @param {Array} projects configs文件夹中所有项目配置
 * @param {String} project 用户指定的项目名称
 * @param {String} env     用户指定的环境
 * @param {String} repo    用户指定的提交仓库（svn或walle）
 * @return {Boolean}       用户指定的配置是否有效
 */
const _isValidConfig = (projects, project, env, repo) => {
    const projectIndex = projects.indexOf(project);

    if (projectIndex === -1) {
        logger('configs文件夹中');
        logger(`没有找到项目[ ${project} ]对应的配置文件`);
        logger('请检查');
        return false;
    }

    const configPath = path.join(basePath, `configs/${project}.conf.json`);
    configs = require(configPath);

    if (!configs) {
        logger(`配置文件 ${configPath} 中无内容`);
        logger('请在配置后重试');
        return false;
    } else if (!configs.dist || !configs.dist.trim()) {
            // 配置文件中没有dist key || dist值为空字符串 || dist值全为空格
        logger(`配置文件 ${configPath} 中`);
        logger('没有配置项目打包文件路径');
        logger('请配置在json文件的 dist key下，然后重试');
        return false;
    } else if (!env) {
        logger(`配置文件 ${configPath} 中`);
        logger(`没有配置指定的更新环境 ${env} 的路径`);
        return false;
    } else if (!repo) {
        const repoArr = Object.keys(configs);
        let hasValidEnv = 0;
        // 用户不设置repo的时候
        // 检测配置文件中，是否svn和walle下，是否有用户指定的环境配置
        repoArr.forEach((repoItem) => {
            if (repoItem !== 'dist') {
                if (!configs[repoItem][env]) {
                    logger(`配置文件 ${configPath} 中`);

                    if (repoItem === 'svn') {
                        logger(`没有配置 svn 中 ${env} 环境的路径`);
                    } else {
                        logger(`没有配置 walle 中 ${env} 环境的项目id`);
                    }

                    logger('请配置在json文件的对应的key下，然后重试');

                    hasValidEnv -= 1;
                } else {
                    hasValidEnv += 1;
                }
            }
        });

        if (hasValidEnv < 0) return false;
    } else if (!configs[repo][env]) {
        // 配置文件中好不到用户指定的repo或env配置
        logger(`配置文件 ${configPath} 中`);
        logger(`没有配置 ${repo} 中 ${env} 环境的路径或项目id`);
        logger('请配置在json文件的对应的key下，然后重试');
        return false;
    }

    return true;
};


/**
 * 获取用户指定的项目配置
 * @param {Array} projects configs文件夹中所有项目配置
 * @param {String} project 用户指定的项目名称
 * @param {String} env     用户指定的环境
 * @param {String} repo    用户指定的提交仓库（svn或walle）
 * @return {Object}        用户指定的配置
 */
const getTargetPaths = (projects, project, env, repo) => {
    const isValidConfig = _isValidConfig(projects, project, env, repo);

    if (!isValidConfig) process.exit(1);

    return {
        dist : configs.dist,
        svn  : configs.svn[env],
        walle: configs.walle[env],
    };
};

module.exports = getTargetPaths;
