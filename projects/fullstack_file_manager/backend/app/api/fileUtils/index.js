const _ = require('lodash');
const sectionService = require('../../model/sectionService');
const categoryService = require('../../model/categoryService');
const {
    getModelAllInfo
} = require('../../model/brand');

function resolveTypeIds(req) {
    req.body.type_ids = req.body.type_ids || '0,0,0';
    return req.body.type_ids.split(',').map((id) => {
        return id ? Number(id) : 0;
    });
}

/**
 * resolve params type of  req.body
 * @param {Request} req
 * @returns {void}
 */
function resolveDataType(req) {
    const keys = ['brand_id', 'series_id', 'model_id', 'section_id', 'is_open', 'is_recommend', 'sequence'];
    _.forEach(keys, (key) => {
        req.body[key] = Number(req.body[key] || 0);
    });
}

/* eslint-disable max-len */
function getSectionAndCateInfo(req) {
    return Promise.all(
        [
            sectionService.findById(req.body.section_id),
            categoryService.findByIds(req.body.type_ids.split(','))
        ]);
}


function resolveCatesInfo(data, category) {
    const types = ['type_a', 'type_b', 'type_c'];
    _.forEach(category, (item, index) => {
        data[`${types[index]}_id`] = item.id;
        data[`${types[index]}_name`] = item.name;
    });
}

function resolveSectionInfo(data, section) {
    if (section) {
        data.section_name = section.name;
    }
}

function resolveCarInfo(data, carInfo) {
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
}

function getCarInfo(req) {
    return getModelAllInfo(req.body.brand_id, req.body.series_id, req.body.model_id);
}

/**
 *
 * @param {Request} req
 * @returns {Promise}
 */
function getToCreateFileData(req, omitList = []) {
    const [type_a_id = 0, type_b_id = 0, type_c_id = 0] = resolveTypeIds(req);
    const carInfo = getCarInfo(req);

    const data = _.extend({},
        _.omit(req.body, omitList), {
            type_a_id,
            type_b_id,
            type_c_id
        }
    );


    return getSectionAndCateInfo(req).then(([section, category]) => {
        resolveCatesInfo(data, category);
        resolveSectionInfo(data, section);
        resolveCarInfo(data, carInfo);
        return Promise.resolve(data);
    });
}


module.exports = {
    getToCreateFileData,
    resolveDataType
};
