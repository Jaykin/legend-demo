import { exts } from '../_utils/config';

const ALL_DES = '不限';
// const ALL_VALUE = 'all';
const ALL_ID = 'all';
// 避免与后台返回的ID为0冲突（select时value即id）
const OTHER_ID = '0';
const OTHER_DES = '其他';


const mapCarIdToValue = id => +id ? id + '' : ALL_ID;
const mapTypeAIdToValue = id => id === undefined ? ALL_ID : id + '';
const mapTypeIdToValue = id => +id ? id + '' : ALL_ID;
const mapTypeAData = (id, name) => id === undefined ? [] : [{ id, name }];
const mapTypeData = (id, name) => +id ? [{ id, name }] : [];

/**
 * 将后台数据结构 映射为 表单组件需要的数据结构
 * @param {Object} originData - 后台返回的文件信息数据结构
 * @returns {Object} - 最终适合前端使用的文件信息数据结构
 *
*/
export const backDataMapToFormData = (originData) => {
    const backData = originData || {};
    let fileId, allItem, otherItem, brand, type, sec, isOpen, isRecommend, filename, filebrief, fileseq, format;

    // 默认不限选项
    allItem = {
        // 不限 选项的数据（后台未提供）
        allItemId: ALL_ID,
        // allItemValue: ALL_VALUE,
        allItemDes: ALL_DES
    };

    // 其他选项
    otherItem = {
        // 其他 选项的数据（后台有提供）
        otherItemId: OTHER_ID,
        otherItemDes: OTHER_DES
    }

    // 文件ID
    fileId = backData.file_id;

    // 车型
    const {
        file_brand_id,
        file_brand_name,
        file_series_id,
        file_series_name,
        file_model_id,
        file_model_name
    } = backData;
    brand = {
        // 默认值设置
        initData: {
            brandValue: mapCarIdToValue(file_brand_id),
            lineValue: mapCarIdToValue(file_series_id),
            modelValue: mapCarIdToValue(file_model_id)
        },
        // 默认状态设置
        initStatu: {
            brandSelected: !!(+file_brand_id),
            lineSelected: !!(+file_series_id)
        },
        // select选项设置
        data: {
            brand: +file_brand_id ? [{
                firstChar: 'A',
                list:[{ id: file_brand_id, brand_name: file_brand_name }]
            }] : [],
            line: +file_series_id ? [{ line_id: file_series_id, line: file_series_name }] : [],
            model: +file_model_id ? [{ id: file_model_id, name: file_model_name }] : []
        }
    };

    // 分类
    const {
        file_type_a_id,
        file_type_a_name,
        file_type_b_id,
        file_type_b_name,
        file_type_c_id,
        file_type_c_name
    } = backData;
    type = {
        initData: {
            typeAValue: mapTypeAIdToValue(file_type_a_id),
            typeBValue: mapTypeIdToValue(file_type_b_id),
            typeCValue: mapTypeIdToValue(file_type_c_id)
        },
        initStatu: {
            typeASelected: !!(+file_type_a_id),
            typeBSelected: !!(+file_type_b_id)
        },
        data: {
            typeA: mapTypeAData(file_type_a_id, file_type_a_name || OTHER_DES), // 后台返回的其他 des是 ''
            typeB: mapTypeData(file_type_b_id, file_type_b_name),
            typeC: mapTypeData(file_type_c_id, file_type_c_name)
        }
    };

    // 版块
    const {
        file_section_id,
        file_section_name
    } = backData;
    sec = {
        initData: {
            section_id: file_section_id === undefined ? ALL_ID : file_section_id,
            section_name: file_section_name || ALL_DES                          // 后台返回的其他 des是'其他'
        }
    };

    // 公开
    const { file_is_open_bool } = backData; // 是否公开的布尔值（经过转换的）
    isOpen = {
        initData: file_is_open_bool === undefined ? ALL_ID : (file_is_open_bool === true ? '1' : '0'),
        data: (file_is_open_bool === undefined ? [{ id: ALL_ID, des: ALL_DES }]
            : []).concat([{ id: '0', des: '否' }, { id: '1', des: '是' }])
    };

    // 推荐
    const { file_is_recommend_bool } = backData;    // 是否推荐的布尔值（经过转换的）
    isRecommend = {
        initData: file_is_recommend_bool === undefined ? ALL_ID : (file_is_recommend_bool === true ? '1' : '0'),
        data: (file_is_recommend_bool === undefined ? [{ id: ALL_ID, des: ALL_DES }]
            : []).concat([{ id: '0', des: '否' }, { id: '1', des: '是' }])
    };

    // 文件名称
    filename = backData.file_name || '';

    // 文件简介
    filebrief = backData.file_brief || '';

    // 文件排序序号
    fileseq = backData.file_sequence || '';

    // 文件格式
    format = {
        init: ALL_ID,
        data: [{ value: ALL_ID, des: ALL_DES }].concat(exts.map(item => ({
            value: item,
            des: item
        })))
    };

    return { fileId, allItem, otherItem, brand, type, sec, isOpen, isRecommend, filename, filebrief, fileseq, format }
}
