const _ = require('lodash');
const {
    resResolve,
    responseError
} = require('../errcode/index');

const categoryService = require('../model/categoryService');

module.exports = (app) => {
    app.get('/api/category/all', (req, res) => {
        const offset = Number(req.query.from || 0);
        const limit = Number(req.query.page_size || 20);


        if (_.isNaN(offset) || _.isNaN(limit)) {
            res.send(resResolve(99, {}, '参数错误'));
            return;
        }

        categoryService.findAll({
            order: [
                ['sequence', 'DESC'],
                ['id', 'DESC']
            ]
        }).then((data) => {
            const result = data.slice(offset, offset + limit);
            let count = data.length;

            if (count - offset < limit) {
                result.push({
                    id: 0,
                    name: '其他',
                    description: '',
                    sequence: 1
                });
            }
            count += 1;

            res.send(resResolve(0, {
                total: count,
                list: result
            }));
        });
    });

    app.get('/api/category', (req, res) => {
        categoryService.findByParentId(req.query.id).then((data) => {
            const result = _.map(data, (item) => { return item.toJSON(); });

            // 一级分类
            if (!req.query.id || req.query.id === '0') {
                result.push({
                    id: 0,
                    name: '其他',
                    description: '',
                    sequence: 1
                });
            }

            res.send(resResolve(0, result));
        });
    });

    // app.post('/api/category/update', (req, res) => {
    //     req.body.id = Number(req.body.id);
    //     const result = validate(req.body, SCHEMA.categoryUpdate);
    //     if (!_.isEmpty(result.errors)) {
    //         res.send(resResolve(99, null, result.errors));
    //         return;
    //     }
    //     category.update(req.body).then(() => {
    //         res.send(resResolve(0));
    //     }, (err) => {
    //         res.send(resResolve(99));
    //     });
    // });

    app.post('/api/category/new', (req, res) => {
        categoryService.create(req.body).then((data) => {
            res.send(resResolve(0, {
                id: data.id
            }));
        }, (err) => {
            if (_.isNumber(err)) {
                res.send(resResolve(err));
            } else {
                res.send(resResolve(99, err.toString()));
            }
        });
    });

    // app.post('/api/category/del', (req, res) => {
    //     req.body.id = Number(req.body.id);
    //     const result = validate(req.body.id, SCHEMA.categoryDel);
    //     if (!_.isEmpty(result.errors)) {
    //         res.send(resResolve(99, null, result.errors));
    //         return;
    //     }

    //     category.del(req.body.id).then(() => {
    //         res.send(resResolve(0));
    //     });
    // });

    app.post('/api/category/edit', (req, res) => {
        const body = req.body;
        const promiseArray = [];

        if (_.isEmpty(req.body)) {
            res.send(resResolve(99));
            return;
        }

        let promiseChain = Promise.resolve();
        if (_.has(body, 'new') && body.new.length) {
            promiseChain = promiseChain.then(() => { return categoryService.createMulti(body.new); });
        }
        if (_.has(body, 'del') && body.del.length) {
            promiseChain = promiseChain.then(() => { return categoryService.delMulti(body.del); });
        }
        if (_.has(body, 'update') && body.update.length) {
            promiseChain = promiseChain.then(() => { return categoryService.updateMulti(body.update); });
        }
        promiseChain.then(() => {
            res.send(resResolve(0));
        }).catch((err) => {
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
