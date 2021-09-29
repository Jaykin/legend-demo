// file upload middleware
const del = require('del');
const _ = require('lodash');
const md5File = require('md5-file/promise');
const {
    resResolve,
    responseError,
    responseSuccess
} = require('../errcode');

const fileService = require('../model/fileService');
const chunkService = require('../model/chunkFileService');
const CODE = require('../errcode/code');

const {
    uploadChunk
} = require('../lib/fileStorage');


const fileUtils = require('./fileUtils');
const chunkUtils = require('./chunkUtils');


module.exports = (app) => {
    app.post('/api/chunk/open', (req, res) => {
        // ext, size, name, md5
        // 创建一个暂时的 file
        // 根据 md5 来处理
        // return file_id, uploaded chunks md5 list

        if (!req.body.md5) {
            res.send(resResolve(99));
            return;
        }
        req.body.path = 'null';

        fileService
            .findByHash(req.body.md5)
            .then((file) => {
                if (!file) {
                    fileUtils.resolveDataType(req);
                    // 如果文件名称和分类重复了，则将原重复的文件标志成删除状态
                    // 并创建一条新的记录。
                    /* eslint-disable max-len */
                    const promiseChain = req.body.duplicate_id ?
                        fileService.updateDel(req.body.duplicate_id, 1) : Promise.resolve(0);

                    return promiseChain.then(() => {
                        return fileUtils.getToCreateFileData(req);
                    }).then((data) => {
                        data.status = 2;
                        return fileService.create(data).then((file) => {
                            return Promise.resolve({
                                id: file.id,
                                chunks: []
                            });
                        });
                    });
                } else if (file.status === 0) {
                    if (file.name === req.body.name) {
                        return Promise.reject({
                            code: CODE.FILE_EXIST,
                            data: file.toJSON()
                        });
                    } else {
                        // 创建新记录。
                        fileUtils.resolveDataType(req);
                        /* eslint-disable max-len */
                        const promiseChain = req.body.duplicate_id ?
                            fileService.updateDel(req.body.duplicate_id, 1) : Promise.resolve(0);

                        return promiseChain
                            .then(() => {
                                return fileUtils.getToCreateFileData(req);
                            })
                            .then((data) => {
                                data.status = 0;
                                data.path = file.path;
                                return fileService.create(data).then((file) => {
                                    return Promise.reject(CODE.FILE_NEW_RECORD);
                                });
                            });
                    }
                } else if (file.status === 1) {
                    return Promise.reject({
                        code: CODE.FILE_DELETED,
                        data: {
                            id: file.id
                        }
                    });
                } else if (file.status === 2) {
                    if (file.name === req.body.name) {
                        return chunkService.findAllByFileId(file.id);
                    } else {
                        return Promise.reject(CODE.FILE_SAME_FILE_IN_PROGRESS);
                    }
                }
            })
            .then((result) => {
                res.send(resResolve(0, result));
            }, (err) => {
                console.log(err);
                if (_.isNumber(err)) {
                    res.send(responseError(err));
                } else if (_.isNumber(err.code)) {
                    res.send(resResolve(err.code, err.data));
                } else {
                    res.send(resResolve(99, JSON.stringify(err)));
                }
            });
    });

    /**
     * file_id,
     * md5
     */

    app.post('/api/chunk/upload', (req, res) => {
        uploadChunk(req, res)
            .then((req) => {
                return md5File(req.file.path);
            })
            .then((md5) => {
                if (md5 !== req.body.md5) {
                    return Promise.reject({
                        errcode: CODE.CHUNK_MD5_INVALID,
                        msg: {
                            src: req.body.md5,
                            actual: md5,
                            index: req.body.chunk
                        }
                    });
                }

                return chunkService.findOrCreate({
                    md5,
                    file_id: req.body.file_id,
                    idx: req.body.chunk,
                    path: req.file.path,
                    size: req.file.size
                });
            })
            .then((chunk) => {
                res.send(responseSuccess(0, {
                    id: chunk.id
                }));
            }, (err) => {
                console.log(err);
                if (_.isNumber(err)) {
                    res.send(responseError(err));
                } else if (_.isObject(err) && err.errcode) {
                    res.send(responseError(err.errcode, err.msg));
                } else {
                    res.send(resResolve(99, err.toString()));
                }
            });
    });

    // todo 重构文件更新的机制。
    app.post('/api/chunk/close', (req, res) => {
        let chunksTmp;
        fileService
            .findByIdWithAllStatus(req.body.file_id)
            .then((file) => {
                // 如果文件是删除状态的话，则直接更新文件信息
                if (file.status === 1) {
                    fileUtils.resolveDataType(req);
                    const omitList = ['path', 'size', 'md5', 'status'];
                    return fileUtils.getToCreateFileData(req, omitList).then((data) => {
                        data.status = 0;
                        return fileService.update(file.id, data);
                    });
                }
                return chunkUtils
                    .validateChunk(req)
                    .then((info) => {
                        return chunkUtils.combineChunks(info);
                    })
                    .then(({
                        finalPath,
                        file_id,
                        chunks
                    }) => {
                        chunksTmp = chunks;
                        return fileService.updatePath(finalPath, file_id);
                    })
                    .then(([affectedCount]) => {
                        if (!affectedCount) {
                            return Promise.reject(99);
                        }
                        const chunkPaths = _.map(chunksTmp, (chunk) => {
                            return chunk.path;
                        });
                        return del(chunkPaths, {
                            force: true
                        });
                    });
            })
            .then(() => {
                res.send(resResolve(0));
            })
            .catch((err) => {
                console.log(err);
                if (_.isNumber(err)) {
                    res.send(responseError(err));
                } else if (_.isObject(err) && err.errcode) {
                    res.send(responseError(err.errcode, err.msg));
                } else {
                    res.send(resResolve(99, err.toString()));
                }
            });
    });
};
