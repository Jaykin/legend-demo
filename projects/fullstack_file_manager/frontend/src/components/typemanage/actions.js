import { makeActionCreater } from '../_utils/reduxUtil';
import callAPI from '../_utils/api';
import message from '../_utils/message';

/**
 * 切换弹窗
*/
export const TOGGLE_MODAL = 'TOGGLE_MODAL';
export const toggleModal = makeActionCreater(TOGGLE_MODAL, 'visible');

/**
 * 创建分类
*/
export const CREATE_TYPE = 'CREATE_TYPE';
export const createType = makeActionCreater(CREATE_TYPE);

/**
 * 开始编辑分类
*/
export const START_EDIT_TYPE = 'START_EDIT_TYPE';
export const startEditType = makeActionCreater(START_EDIT_TYPE, 'curType');

// 取消编辑
export const CANCEL_EDIT = 'CANCEL_EDIT';
export const cancelEdit = makeActionCreater(CANCEL_EDIT);

// 一级分类
// 1.0 修改一级分类
export const CHANGE_TYPEA = 'CHANGE_TYPEA';
export const changeTypeA = makeActionCreater(CHANGE_TYPEA, 'id', 'field', 'value');
// 2.0 删除一级分类
export const DELETE_TYPEA = 'DELETE_TYPEA';
export const deleteTypeA = makeActionCreater(DELETE_TYPEA, 'id');

// 二级分类
// 1.0 修改二级分类
export const CHANGE_TYPEB = 'CHANGE_TYPEB';
export const changeTypeB = makeActionCreater(CHANGE_TYPEB, 'id', '_id', 'value');
// 2.0 删除二级分类
export const DELETE_TYPEB = 'DELETE_TYPEB';
export const deleteTypeB = makeActionCreater(DELETE_TYPEB, 'id', '_id');
// 3.0 新增二级分类
export const CREATE_TYPEB = 'CREATE_TYPEB';
export const createTypeB = makeActionCreater(CREATE_TYPEB);

// 三级分类
// 1.0 修改三级分类
export const CHANGE_TYPEC = 'CHANGE_TYPEC';
export const changeTypeC = makeActionCreater(CHANGE_TYPEC, 'params');
// 2.0 删除三级分类
export const DELETE_TYPEC = 'DELETE_TYPEC';
export const deleteTypeC = makeActionCreater(DELETE_TYPEC, 'params');
// 3.0 新增三级分类
export const CREATE_TYPEC = 'CREATE_TYPEC';
export const createTypeC = makeActionCreater(CREATE_TYPEC, 'parentId', '_parentId');

// 修改state.refresh（用于更新当前页数据）
export const SET_REFRESH = 'SET_REFRESH';
export const setRefresh = makeActionCreater(SET_REFRESH, 'refresh');

/**
 * 更新类型信息
*/

export const UPDATE_TYPE_RESQUEST = 'UPDATE_TYPE_RESQUEST';
export const UPDATE_TYPE_SUCCESS = 'UPDATE_TYPE_SUCCESS';
export const UPDATE_TYPE_FAIL = 'UPDATE_TYPE_FAIL';

export const updateTypeRes = makeActionCreater(UPDATE_TYPE_RESQUEST);
export const updateTypeSuc = makeActionCreater(UPDATE_TYPE_SUCCESS, 'res');
export const updateTypeFail = makeActionCreater(UPDATE_TYPE_FAIL);

export function deleteType(id) {
    return dispatch => {
        dispatch(deleteTypeA(id));
        dispatch(updateTypeData());
    }
}

let request = null;

export function cancelEditMain(isUpdating) {
    return dispatch => {
        if (isUpdating) {
            // abort
            request.abort();
            message.info('已取消提交类型编辑信息！');
        }

        dispatch(cancelEdit());
    }
}


/**
 * 校验最终传给后台的数据
 * @param { Object } source - 当前一级分类的渲染数据，即state.curType
 * @return { Object } - 验证结果对象
*/
function validate(source) {
    const reg = /^\d{1,7}$/g;
    const recursive = data => {
        var nameRuleDesc = { flag: false, msg: '请填写完整所有分类名称' };

        // 递归验证分类名称
        if (data.name) {
            for (var i = 0;i < data.children.length; i++) {
                let validateObj = recursive(data.children[i]);

                if(!validateObj.flag) return nameRuleDesc;
            }
        } else {
            return nameRuleDesc;
        }

        return { flag: true }
    }

    // 验证排序序号格式
    if (!reg.test(source.sequence)) {
        return { flag: false, msg: '分类排序序号格式错误，应为1 ~ 7位数字！' }
    }

    // 验证分类名称
    return recursive(source);
}

export function updateTypeData() {
    return (dispatch, getState) => {
        const validateObj = validate(getState().curType);

        if (validateObj.flag) {
            dispatch(updateTypeRes());

            const data = getState().updateTypeData;

            request = callAPI.type_edit({ data: JSON.stringify(data), type: 'post', contentType:'application/json' });

            return request.done(res => { dispatch(updateTypeSuc(res)) })
                .fail(() => { dispatch(updateTypeFail()) });
        } else {
            message.warning(validateObj.msg);
            return null;
        }
    }
}
