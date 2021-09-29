const _ = require('lodash');
const {
    getBrands,
    getSeries
} = require('../model/brand');
const {
    resResolve
} = require('../errcode');

module.exports = (app) => {
    app.get('/api/car_classification', (req, res) => {
        const brandId = parseInt(req.query.brand_id, 10);
        const seriesId = parseInt(req.query.series_id, 10);

        if (!_.has(req.query, 'brand_id')) {
            res.send(resResolve(0, getBrands()));
            return;
        }

        const series = getSeries(brandId);
        if (!_.has(req.query, 'series_id')) {
            res.send(resResolve(0, _.map(series, seriesItem => _.omit(seriesItem, 'models'))));
            return;
        }

        if (_.isEmpty(series)) {
            res.send(resResolve(99, null));
        } else {
            const models = _.find(series, seriesItem => parseInt(seriesItem.line_id, 10) === seriesId).models;
            res.send(resResolve(0, models));
        }
    });
};
