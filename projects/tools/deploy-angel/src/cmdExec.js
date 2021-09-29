const exec = require('child_process').exec;

/**
 * 执行命令行命令
 * @param {String} 命令行命令
 * @return {Promise}
 */
const cmdExec = command => new Promise((resolve, reject) => {
    exec(command, (error, stdout) => {
        if (error) reject(error);

        console.log(stdout);
        resolve(true);
    });
});

module.exports = cmdExec;
