// const section = require('../model/section');
const _ = require('lodash');
const CODE = require('../errcode/code');
const fileService = require('../model/fileService');
const resResolve = require('../errcode/index').resResolve;
const sectionService = require('../model/sectionService');


module.exports = function (app) {
    app.get('/api/section', (req, res) => {
        const { from = 0, page_size = 10000 } = req.query;

        sectionService.findAndCountAll(from, page_size).then((result) => {
            const sections = _.map(result.rows, section => ({
                section_id: section.id,
                section_name: section.name,
                section_brief: section.description
            }));

            if (result.count - Number(from) < Number(page_size)) {
                sections.push({
                    section_id: 0,
                    section_name: '其他',
                    section_brief: ''
                });
            }
            result.count += 1;

            res.send(resResolve(0, {
                total: result.count,
                list: sections
            }));
        });
    });

    app.post('/api/section/update', (req, res) => {
        sectionService.update(req.body).then(() => {
            res.send(resResolve(0));
        }, (err) => {
            if (_.isNumber(err)) {
                res.send(resResolve(err));
            } else {
                res.send(resResolve(99, err.toString()));
            }
        });
    });

    app.post('/api/section/new', (req, res) => {
        sectionService.create(req.body).then((id) => {
            res.send(resResolve(0, {
                id
            }));
        }, (err) => {
            if (_.isNumber(err)) {
                res.send(resResolve(err));
            } else {
                res.send(resResolve(99, err.toString()));
            }
        });
    });

    app.post('/api/section/del', (req, res) => {
        sectionService
            .delete(req.body.id)
            .then(() => {
                res.send(resResolve(0));
            }, (err) => {
                if (_.isNumber(err)) {
                    res.send(resResolve(err));
                } else {
                    res.send(resResolve(99, err.toString()));
                }
            });
    });
};
