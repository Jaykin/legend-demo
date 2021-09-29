import { makeActionCreater } from '../_utils/reduxUtil';

// 添加文件
export const ADD_FILES = 'ADD_FILES';
export const addFiles = makeActionCreater(ADD_FILES, 'list');

// 文件信息更改
export const FILE_INFO_CHANGE = 'FILE_INFO_CHANGE';
export const fielInfoChange = makeActionCreater(FILE_INFO_CHANGE, 'value');

/**
 * 修改文件上传状态
*/
export const CHANGE_UPLOAD_STATE = 'CHANGE_UPLOAD_STATE';
export const changeUploadState = makeActionCreater(CHANGE_UPLOAD_STATE, 'data');

// 选中文件
export const SELECTED_ROW = 'SELECTED_ROW';
export const selectedRow = makeActionCreater(SELECTED_ROW, 'keys');

// 文件上传 -- 批量设置文件属性
export const UPLOAD_BATCH_SETTING = 'UPLOAD_BATCH_SETTING';
export const uploadBatchSetting = makeActionCreater(UPLOAD_BATCH_SETTING, 'data');
