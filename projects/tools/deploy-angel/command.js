#!/usr/bin/env node

require('./config');
const program = require('commander');

const system = process.env.__SYSTEM__;

const logger         = require('./src/logger');
const error          = require('./src/error');
const projectScanner = require('./src/projectScanner');
const getTargetPaths = require('./src/getTargetPaths');
const puts           = require('./src/puts');
const svnPush        = require('./src/svnPush');
const walleDeploy    = require('./src/walleDeploy');

const promptMsg = '请输入commit信息：';
let finMsg      = 'Walle 部署完成！';
let distPath    = null;
let svnPath     = null;
let walleID     = null;

const deploy = (project, env, repo) => {
    projectScanner().then((projects) => {
        const { dist, svn, walle } = getTargetPaths(projects, project, env, repo);

        distPath = dist;
        svnPath = svn;
        walleID = walle;

        return puts(promptMsg);
    })
    .then((commitMsg) => {
        if (!repo) {
            return svnPush(distPath, svnPath, commitMsg)
                .then(() => walleDeploy(walleID, commitMsg));
        }

        if (repo === 'svn') {
            finMsg = 'SVN 代码提交完成！';
            return svnPush(distPath, svnPath, commitMsg);
        }

        if (repo === 'walle') {
            finMsg = 'Walle 代码部署完成！';
            return walleDeploy(walleID, commitMsg);
        }

        throw error('repo参数只能为svn或walle，请检查');
    })
    .then(() => {
        logger(finMsg);
        process.exit(0);
    })
    .catch((err) => {
        throw error(err);
    });
};

if (system === 'mac') {
    program
        .arguments('<project> <env> [repo]')
        .action((project, env, repo) => {
            deploy(project, env, repo);
        });
} else {
    program
        .command('deploy <project> <env> [repo]')
        .action((project, env, repo) => {
            deploy(project, env, repo);
        });
}

program.parse(process.argv);
