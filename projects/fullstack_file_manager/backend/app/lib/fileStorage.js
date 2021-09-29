const multer = require('multer');
const mkdirp = require('mkdirp');
const fs = require('fs');
const path = require('path');
const del = require('del');

const config = require('../config');
const maxFileSize = 5 * 1024 * 1024;

const storage = multer.diskStorage({
    destination(req, file, cb) {
        const date = new Date();
        const year = date.getUTCFullYear();
        const month = date.getUTCMonth() + 1;
        const day = date.getUTCDate();

        const dest = path.resolve(config.upload_path, `${year}/${month}/${day}`);

        mkdirp.sync(dest);
        cb(null, dest);
    },
    filename(req, file, cb) {
        const date = new Date();
        const ts = date.getTime();
        cb(null, ts.toString());
    }
});


const chunkTmpDir = path.resolve(config.upload_path, 'chunktmp');
mkdirp.sync(chunkTmpDir);
const chunkStorage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, chunkTmpDir);
    },
    filename(req, file, cb) {
        const date = new Date();
        const ts = date.getTime();
        cb(null, ts.toString());
    }
});

// 重写 _handleFile 方法，提到获取到文件路径，避免在 request abort, aborted 的时候无法删除文件的问题。
// storage._handleFile = chunkStorage._handleFile = function _handleFile(req, file, cb) {
//     const that = this;

//     that.getDestination(req, file, (err, destination) => {
//         if (err) return cb(err);

//         that.getFilename(req, file, (err, filename) => {
//             if (err) return cb(err);

//             const finalPath = path.join(destination, filename);
//             const outStream = fs.createWriteStream(finalPath);

//             req.file = req.file || {};
//             req.file.path = destination;
//             req.file.filename = filename;

//             req.on('aborted', () => {
//                 outStream.end();
//             });


//             file.stream.pipe(outStream);
//             outStream.on('error', cb);
//             outStream.on('finish', () => {
//                 cb(null, {
//                     destination,
//                     filename,
//                     path: finalPath,
//                     size: outStream.bytesWritten
//                 });
//             });
//         });
//     });
// };


const chunkUpload = multer({
    storage: chunkStorage,
    limits: {
        fileSize: maxFileSize
    }
}).single('file');

const fileUpload = multer({
    storage,
    limits: {
        fileSize: maxFileSize
    }
}).single('file');


function uploadFunctionGen(cb) {
    return function (req, res) {
        return new Promise((resolve, reject) => {
            // function delFile(req, rejectFn) {
            //     try {
            //         del(path.resolve(req.file.path, req.file.filename)).then(() => {
            //             reject('request abort');
            //         });
            //     } catch (err) {
            //         // log something
            //     }
            // }

            // req.on('abort', () => {
            //     delFile(req, reject);
            // });
            // req.on('aborted', () => {
            //     delFile(req, reject);
            // });

            cb(req, res, (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(req);
                }
            });
        });
    };
}


// const uploadFile = uploadFunctionGen((req, res, cb) => {
//     fileUpload(req, res, cb);
// });

// const uploadChunk = uploadFunctionGen((req, res, cb) =>  {
//     chunkUpload(req, res, cb);
// });

const uploadFile = (req, res) => {
    return new Promise((resolve, reject) => {
        fileUpload(req, res, (err) => {
            if (err) {
                reject(err);
            } else {
                resolve(req);
            }
        });
    });
};

const uploadChunk = (req, res) => {
    return new Promise((resolve, reject) => {
        chunkUpload(req, res, (err) => {
            if (err) {
                reject(err);
            } else {
                resolve(req);
            }
        });
    });
};


function createFilePath() {
    return new Promise((resolve, reject) => {
        const date = new Date();
        const year = date.getUTCFullYear();
        const month = date.getUTCMonth() + 1;
        const day = date.getUTCDate();
        const dest = path.resolve(config.upload_path, `${year}/${month}/${day}/`);
        mkdirp(dest, (err) => {
            if (err) {
                reject(err);
            }
            resolve(dest);
        });
    });
}

exports.uploadFile = uploadFile;
exports.uploadChunk = uploadChunk;
exports.createFilePath = createFilePath;
