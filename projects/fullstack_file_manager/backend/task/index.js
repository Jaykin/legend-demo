const program = require('commander');
const path = require('path');
const taskSettings = require('./task');
const exec = require('child_process').exec;
const gulp = require('gulp');
program
    .command('deploy')
    .option('-t,--test', 'push to test folder')
    .option('-r,--release', 'push to test folder')
    .action((options) => {
        let targetPath = '';
        if (options.release) {
            targetPath = path.resolve(taskSettings.deployPath, 'release');
        } else {
            targetPath = path.resolve(taskSettings.deployPath, 'test');
        }
        console.log(taskSettings.deployPath);
        let comment;
        read('请输入 comment:')
            // .then((data) => {
            //     comment = data;
            //     return execPromise(`cd /d ${taskSettings.deployPath} && svn update`);
            // })
            .then((output) => {
                return copy(targetPath);
            })
            // .then(() => {
            //     console.log('正在提交代码');
            //     return execPromise(`cd /d ${taskSettings.deployPath} && svn status && svn add --force .  && svn commit -m "${comment}"`);
            // })
            .then(() => {
                console.log('提交代码完毕');
                process.exit();
            }, (err) => {
                console.log(err);
                process.exit();
            });
    });


program.parse(process.argv);

function copy(destination) {
    return new Promise((resolve, reject) => {
        console.log(taskSettings.files);
        gulp
            .src(taskSettings.files, {
                base: './'
            })
            .pipe(gulp.dest(destination))
            .on('end', () => {
                resolve();
            })
            .on('error', () => {
                reject();
            });
    });
}

function execPromise(cmd) {
    return new Promise((resolve, reject) => {
        const executer = exec(cmd, (err, stdout, stderr) => {
            if (err) {
                reject(err);
            } else {
                resolve(stdout);
            }
        });
        executer.stdout.on('data', (data) => {
            process.stdout.write(data);
        });
    });
}

function read(prompt) {
    return new Promise((resolve, reject) => {
        process.stdout.write(`${prompt}:`);
        process.stdin.resume();
        process.stdin.setEncoding('utf-8');
        process.stdin.on('data', (chunk) => {
            resolve(chunk);
        });
    });
}
