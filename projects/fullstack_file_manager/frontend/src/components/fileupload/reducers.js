import * as type from './actions';
import { updateObject } from '../_utils/reduxUtil';

function isNum(data) {
    return /^[0-9]+$/g.test(data);
}

export default function reducers(state = {}, action = {}) {
    switch(action.type) {
        // 添加文件
        case type.ADD_FILES: {
            return updateObject(state, { filelist: [].concat(state.filelist).concat(action.list) });
        }

        // 文件信息更改
        case type.FILE_INFO_CHANGE: {
            const { value } = action;
            const { fileId, key } = value;
            const val = value[key];
            let newItem = {}, list = [];

            if (key === 'filename') {
                newItem.file_name = val;
            } else if (key === 'brand' || key === 'line' || key === 'model') {
                if (isNum(val) && key === 'brand') {
                    newItem.file_brand_id = val;
                    newItem.file_brand_name = value.brandName;
                }

                if (isNum(val) && key === 'line') {
                    newItem.file_series_id = val;
                    newItem.file_series_name = value.lineName;
                }

                if (isNum(val) && key === 'model') {
                    newItem.file_model_id = val;
                    newItem.file_model_name = value.modelName;
                }
            } else if (key === 'typeA' || key === 'typeB' || key === 'typeC') {
                if (isNum(val) && key === 'typeA') {
                    newItem.file_type_a_id = val;
                    newItem.file_type_a_name = value.typeAName;
                }

                if (isNum(val) && key === 'typeB') {
                    newItem.file_type_b_id = val;
                    newItem.file_type_b_name = value.typeBName;
                }

                if (isNum(val) && key === 'typeC') {
                    newItem.file_type_c_id = val;
                    newItem.file_type_c_name = value.typeCName;
                }

            } else if (key === 'section') {
                newItem.file_section_id = isNum(val) ? val : '';
                newItem.file_section_name = value.sectionName;
            } else if (key === 'filebrief') {
                newItem.file_brief = val;
            } else if (key === 'fileseq') {
                newItem.file_sequence = val;
            } else if (key === 'is_open') {
                newItem.file_is_open_bool = !!+val;
            } else if (key === 'is_recommend') {
                newItem.file_is_recommend_bool = !!+val;
            }

            list = state.filelist.map(item => {
                if (item.file_id === fileId) {
                    return updateObject(item, newItem);
                }

                return item;
            });

            return updateObject(state, { filelist: list });
        }

        // 修改文件上传状态
        case type.CHANGE_UPLOAD_STATE: {
            const { status, fileId, percent, duplicateId } = action.data;
            let list = state.filelist.map(item => {
                if (item.file_id == fileId) {
                    item.uploadState = status;
                    item.uploadPercent = percent ? (percent* 100) << 0 : 0;

                    duplicateId && (item.duplicate_id = duplicateId);
                }

                return item;
            });

            return updateObject(state, { filelist: list });
        }

        // 选中文件
        case type.SELECTED_ROW: {
            return updateObject(state, { selectedRowKeys: action.keys });
        }

        // 文件上传 -- 批量设置属性
        case type.UPLOAD_BATCH_SETTING: {
            const { selectedRowKeys } = state;
            const fileinfo = action.data;
            let list = state.filelist.map(item => {
                if (selectedRowKeys.indexOf(item.file_id) > -1) {
                    item.file_brand_id = fileinfo.brand;
                    item.file_brand_name = fileinfo.brandName;
                    item.file_series_id = fileinfo.line;
                    item.file_series_name = fileinfo.lineName;
                    item.file_model_id = fileinfo.model;
                    item.file_model_name = fileinfo.modelName;
                    item.file_brief = fileinfo.file_brief;
                    item.file_sequence = fileinfo.file_sequence;
                    item.file_type_a_id = fileinfo.typeA;
                    item.file_type_a_name = fileinfo.typeAName;
                    item.file_type_b_id = fileinfo.typeB;
                    item.file_type_b_name = fileinfo.typeBName;
                    item.file_type_c_id = fileinfo.typeC;
                    item.file_type_c_name = fileinfo.typeCName;
                    item.file_section_id = fileinfo.section;
                    item.file_section_name = fileinfo.sectionName;
                    item.file_is_open_bool = !!+fileinfo.is_open;
                    item.file_is_recommend_bool = !!+fileinfo.is_recommend;
                }

                return item;
            });

            return updateObject(state, { filelist: list });
        }

        default: return state;
    }
}
