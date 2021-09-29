// file upload middleware
const _ = require('lodash');
const md5File = require('md5-file/promise');
const {
    resResolve,
    responseError,
    responseSuccess
} = require('../errcode');

const fileService = require('../model/fileService');
const sectionService = require('../model/sectionService');
const categoryService = require('../model/categoryService');

const CODE = require('../errcode/code');
const {
    errcode
} = require('../errcode/index');
const {
    getModelAllInfo
} = require('../model/brand');

const fs = require('fs');
const {
    uploadFile,
} = require('../lib/fileStorage');
const fileUtils = require('./fileUtils');
module.exports = (app) => {

    app.post('/api/file/upload', (req, res) => {
        uploadFile(req, res)
            .then(() => {
                fileUtils.resolveDataType(req);
                req.body.name = req.body.file_name || req.file.originalname;
                req.body.description = req.body.description || '';

                return fileService.findSameByIdsAndName(req.body);
            })
            .then((data) => {
                if (data) {
                    return Promise.reject({
                        code: CODE.FILE_ALL_SAME,
                        file_id: data.id
                    });
                }
                return Promise.resolve();
            })
            .then(() => {
                return md5File(req.file.path);
            })
            .then((hash) => {
                return fileUtils.getToCreateFileData(req).then((data) => {
                    _.extend(data, {
                        path: req.file.path,
                        size: req.file.size,
                        md5: hash,
                        ext: req.file.originalname.split('.').pop(),
                    });
                    return Promise.resolve(data);
                });
            })
            .then((data) => {
                return fileService.create(data);
            })
            .then((file) => {
                res.send(resResolve(0, {
                    id: file.id
                }));
            })
            .catch((err) => {
                if (_.isNumber(err)) {
                    res.send(resResolve(err));
                } else if (_.isNumber(err.code)) {
                    res.send(resResolve(err.code, {
                        file_id: err.file_id
                    }));
                } else {
                    res.send(resResolve(99, err.message));
                }
            });
    });

    app.get('/api/file/is_duplicate', (req, res) => {
        const info = {
            ext: req.query.ext,
            brand_id: req.query.brand_id,
            series_id: req.query.series_id,
            model_id: req.query.model_id,
            section_id: req.query.section_id,
            type_ids: req.query.type_ids || '',
            name: req.query.name
        };
        Promise
            .all([fileService.findSameByIdsAndName(info), fileService.findSameByName({
                name: req.query.name,
                ext: req.query.ext
            })])
            .then((data) => {
                const file = data[0] || data[1];

                if (file && file.status === 2) {
                    return Promise.resolve({
                        code: CODE.FILE_IN_PROGRESS,
                        id: file.id
                    });
                }
                if (!_.isEmpty(data[0])) {
                    return Promise.resolve({
                        code: CODE.FILE_ALL_SAME,
                        id: data[0].id
                    });
                } else if (!_.isEmpty(data[1])) {
                    return Promise.resolve({
                        code: CODE.FILE_SAME_NAME,
                        id: data[1].id
                    });
                } else {
                    return Promise.resolve(0);
                }
            }).then((data) => {
                res.send(resResolve(0, {
                    type: data.code,
                    msg: errcode[data.code],
                    duplicate_id: data.id
                }));
            }).catch((err) => {
                console.log(err);
                if (_.isNumber(err)) {
                    res.send(resResolve(err));
                } else {
                    res.send(resResolve(99, null, err));
                }
            });
    });

    // todo：后面将上传过但是没有写入数据库的文件的相关信息放到内存里面。
    // 然后定期清理掉相关的数据。
    app.post('/api/file/replace', (req, res) => {
        uploadFile(req, res)
            .then(() => {
                return md5File(req.file.path);
            })
            .then((hash) => {
                _.each(['brand_id', 'series_id', 'model_id', 'section_id', 'is_open', 'is_recommend', 'sequence'], (value) => {
                    if (_.has(req.body, value)) {
                        req.body[value] = Number(req.body[value]);
                    }
                });

                const data = {
                    id: req.body.file_id,
                    name: req.body.name || req.file.originalname,
                    path: req.file.path,
                    size: req.file.size,
                    brand_id: req.body.brand_id,
                    series_id: req.body.series_id,
                    model_id: req.body.model_id,
                    section_id: req.body.section_id,
                    md5: hash,
                    ext: req.file.originalname.split('.').pop(),
                    description: req.body.description || '',
                    type_ids: req.body.type_ids,
                    is_open: req.body.is_open,
                    is_recommend: req.body.is_recommend,
                    sequence: req.body.sequence
                };

                // const result = validate(data, SCHEMA.fileUpload);
                // if (!_.isEmpty(result.errors)) {
                //     return Promise.reject(result.errors);
                // }

                return Promise
                    .all([sectionService.findById(data.section_id), categoryService.findByIds(data.type_ids.split(','))])
                    .then((resultData) => {
                        const [section, category] = resultData;
                        const carInfo = getModelAllInfo(data.brand_id, data.series_id, data.model_id);
                        if (section) {
                            data.section_name = section.name;
                        }

                        const typeSeq = ['type_a', 'type_b', 'tyep_c'];
                        _.forEach(category, (item, index) => {
                            data[`${typeSeq[index]}_id`] = item.id;
                            data[`${typeSeq[index]}_name`] = item.name;
                        });

                        if (carInfo[0]) {
                            // data.brand_name = carInfo[0].brand_name;
                            data.brand_name = carInfo[0].name;
                        }
                        if (carInfo[1]) {
                            // data.series_name = carInfo[1].line_name;
                            data.series_name = carInfo[1].line;
                        }
                        if (carInfo[2]) {
                            // data.model_name = carInfo[2].model_name;
                            data.model_name = carInfo[2].name;
                        }

                        return fileService.update(data.id, data);
                    });
            })
            .then((count) => {
                if (count) {
                    res.send(resResolve(0));
                } else {
                    return Promise.reject(99);
                }
            })
            .catch((err) => {
                console.log(err);
                if (_.isNumber(err)) {
                    res.send(resResolve(err));
                } else {
                    res.send(resResolve(99, null, err));
                }
            });
    });


    app.post('/api/file/update', (req, res) => {
        _.each(['brand_id', 'series_id', 'model_id', 'type_a_id', 'type_b_id',
            'type_c_id', 'section_id', 'id', 'is_open'
        ], (value) => {
            if (_.has(req.body, value)) {
                req.body[value] = Number(req.body[value]);
            } else {
                req.body[value] = 0;
            }
        });

        // const result = validate(req.body, SCHEMA.fileUpdate);
        // if (!_.isEmpty(result.errors)) {
        //     res.send(resResolve(99, null, result.errors));
        //     return;
        // }

        const promiseArray = [];
        if (_.has(req.body, 'section_id')) {
            promiseArray.push(sectionService.findById(req.body.section_id));
        }
        if (_.has(req.body, 'type_ids')) {
            promiseArray.push(categoryService.findByIds(req.body.type_ids.split(',')));
        }
        const body = req.body;
        console.log(body)

        if (promiseArray.length) {
            Promise.all(promiseArray).then((resultData) => {
                const [section, category] = resultData;
                const carInfo = getModelAllInfo(body.brand_id, body.series_id, body.model_id);
                if (section) {
                    body.section_name = section.name;
                } else if (Number(req.body.section_id) === 0) {
                    body.section_name = '其他';
                }

                if (category) {
                    const typeSeq = ['type_a', 'type_b', 'type_c'];
                    _.forEach(category, (item, index) => {
                        const prefix = typeSeq[index];
                        body[`${prefix}_id`] = item.id;
                        body[`${prefix}_name`] = item.name;
                    });
                }
                if (carInfo[0]) {
                    // body.brand_name = carInfo[0].brand_name;
                    body.brand_name = carInfo[0].name;
                }
                if (carInfo[1]) {
                    // body.series_name = carInfo[1].line_name;
                    body.series_name = carInfo[1].line;
                }
                if (carInfo[2]) {
                    // body.model_name = carInfo[2].model_name;
                    body.model_name = carInfo[2].name;
                }

                return fileService.update(body.id, _.omit(body, 'id'));
            }).then(() => {
                res.send(resResolve(0));
            });
        } else {
            fileService.update(req.body.id, _.omit(body, 'id')).then(() => {
                res.send(resResolve(0));
            });
        }
    });

    app.get('/api/file', (req, res) => {
        const query = _.omitBy(req.query, (value, key) => {
            return (value === '' || key === 'from' || key === 'page_size');
        });
        const {
            from = 0, page_size = 20
        } = req.query;

        function resolveFiles(files) {
            return _.map(files, (file) => {
                return ({
                    file_id: file.id,
                    file_name: file.name,
                    file_brand_id: file.brand_id,
                    file_brand_name: file.brand_name,
                    file_series_id: file.series_id,
                    file_series_name: file.series_name,
                    file_model_id: file.model_id,
                    file_model_name: file.model_name,
                    file_type_a_id: file.type_a_id,
                    file_type_b_id: file.type_b_id,
                    file_type_c_id: file.type_c_id,
                    file_type_a_name: file.type_a_name,
                    file_type_b_name: file.type_b_name,
                    file_type_c_name: file.type_c_name,
                    file_fromat: file.ext,
                    file_is_open: file.is_open,
                    file_brief: file.description,
                    file_size: file.size,
                    file_upload_time: file.upload_date,
                    file_section_id: file.section_id,
                    file_section_name: file.section_name,
                    file_download_url: `/api/file/download?id=${file.id}`,
                    file_is_recommend: file.is_recommend,
                    file_path: `${file.path}.${file.ext}`,
                    file_sequence: file.sequence
                });
            });
        }

        fileService
            .findAllByDesc(query, Number(from), Number(page_size))
            .then(({
                count,
                rows
            }) => {
                res.send(resResolve(0, {
                    files: resolveFiles(rows),
                    file_total: count
                }));
            });
    });

    app.get('/api/file/download', (req, res) => {
        fileService.findById(req.query.id).then((data) => {
            if (!data) {
                res.send(resResolve(CODE.FILE_NOT_EXIST));
                return;
            }
            res.download(data.path, `${data.name}.${data.ext}`);
        });
    });

    app.post('/api/file/del', (req, res) => {
        fileService.updateDel(req.body.id, 1).then(() => {
            res.send(resResolve(0));
        }, (err) => {
            if (_.isNumber(err)) {
                res.send(resResolve(err));
            } else {
                res.send(resResolve(99, null, err));
            }
        });
    });

    //recommend 推荐的文档
    app.get('/api/file/recommend', (req, res) => {
        const query = _.omitBy(req.query, (value, key) => {
            return (value === '' || key === 'from' || key === 'page_size');
        });
        const {
            from = 0, page_size = 20
        } = req.query;

        function resolveFiles(files) {
            const result = null;
            return _.map(files, (file) => {
                if (parseInt(file.is_recommend, 10) === 1) {
                    return ({
                        file_id: file.id,
                        file_name: file.name,
                        file_fromat: file.ext,
                        file_size: file.size,
                        file_download_url: `/api/file/download?id=${file.id}`,
                        file_is_recommend: file.is_recommend,
                        file_is_aa: file.upload_date
                    });
                }
            });
        }

        fileService
            .findAllByDesc(query, Number(from), Number(page_size))
            .then(({
                count,
                rows
            }) => {
                res.send(resResolve(0, {
                    files: resolveFiles(rows),
                    file_total: count
                }));
            });
    });

    // 获取文件路径
    app.get('/api/file/:fileId', (req, res) => {

        fileService.findById(req.params.fileId).then((data) => {
            if (!data) {
                res.send(resResolve(CODE.FILE_NOT_EXIST));
                return;
            }

            fs.readFile(data.path, function(err, data) {
                res.set('Content-Type', 'application/pdf');
                res.send(data);
            });
        });
    });
};
