const os = require('os');

process.env.__BASE_PATH__ = __dirname;

if (os.platform() === 'darwin') {
    process.env.__SYSTEM__ = 'mac';
} else {
    process.env.__SYSTEM__ = 'windows';
}

process.env.__PROJECT_PREFIX__ = '[deploy-angel]';
