const glob = require('glob');
const path = require('path');

const basePath = path.resolve(process.env.__BASE_PATH__);
const configsPath = path.join(basePath, 'configs/*.conf.json');

/**
 * 对configs文件夹内的所有文件名称进行扫描
 * @return {Promise} 包含所有文件名的数组
 */
const projectScanner = () => {
    const projects = [];
    return new Promise((resolve, reject) => {
        glob(configsPath, (err, files) => {
            if (err) reject(err);

            files.forEach((file) => {
                const filePathArr = file.split('/');
                const configFile = filePathArr[filePathArr.length - 1];

                const fileName = configFile.split('.')[0];
                projects.push(fileName);
            });

            resolve(projects);
        });
    });
};

module.exports = projectScanner;
