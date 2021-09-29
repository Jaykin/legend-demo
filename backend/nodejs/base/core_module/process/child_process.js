// child_process

const chlid_process = require('child_process');

chlid_process.exec('echo \\$HOME变量为：$HOME', (error, stdout, stderr) => {
    if (error == null) {
        // 成功
        console.log(`stdout: ${stdout}`);
    } else {
        // 失败
        console.error(error);
    }
});