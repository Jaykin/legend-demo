const carClassification = require('../assets/car_brand_line_model');
const _ = require('lodash');


const getBrands = () => {
    return _.map(carClassification.brands, (brand) => {
        return _.omit(brand, 'series');
    });
};

/**
 *
 * @param {Number} id
 */
const getSeries = (id) => {
    const brandId = Number(id);
    return _.find(carClassification.brands, (brand) => {
        return Number(brand.id) === brandId;
    }).series;
};

/**
 *
 * @param {Number} brandId
 * @param {Number} seriesId
 */
const getModels = (brandId, seriesId) => {
    const bId = Number(brandId);
    const sId = Number(seriesId);
    const series = getSeries(bId);
    return _.find(series, (item) => {
        return Number(item.id) === sId;
    }).models;
};


/**
 *
 * @param {Number} brandId
 * @param {Number} seriesId
 * @param {Number} modelId
 */
const getModel = (brandId, seriesId, modelId) => {
    const mId = modelId;
    const models = getModels(brandId, seriesId);
    return _.find(models, (model) => {
        return Number(model.id) === mId;
    });
};

const getModelAllInfo = (brandId, seriesId, modelId) => {
    const result = [{}, {}, {}];
    const bId = Number(brandId);
    const sId = Number(seriesId);
    const mId = Number(modelId);

    if (!brandId) {
        return result;
    }
    const brand = _.find(carClassification.brands, (brand) => {
        return Number(brand.id) === bId;
    });
    result[0] = _.omit(brand, 'series');

    if (!seriesId) {
        return result;
    }
    const seriesItem = _.find(brand.series, (item) => {
        return Number(item.line_id) === sId;
    });
    result[1] = _.omit(seriesItem, 'models');

    if (!modelId) {
        return result;
    }
    const model = _.find(seriesItem.models, (model) => {
        return Number(model.id) === mId;
    });
    result[2] = model;

    return result;
};

module.exports = {
    getBrands,
    getSeries,
    getModels,
    getModel,
    getModelAllInfo
};
