
import callAPI from '../_utils/api';
import message from '../_utils/message';
import { makeActionCreater } from '../_utils/reduxUtil';

/**
 * actions
*/
// 创建版块
export const CREATE_SECTION = 'CREATE_SECTION';
export const CANCEL_CREATE_SECTION = 'CANCEL_CREATE_SECTION';
export const CREATE_SECTION_REQUEST = 'CREATE_SECTION_REQUEST';
export const CREATE_SECTION_SUCESS = 'CREATE_SECTION_SUCESS';
export const CREATE_SECTION_COMPLETE = 'CREATE_SECTION_COMPLETE';

export const createSection = makeActionCreater(CREATE_SECTION);
export const cancelCreateSection = makeActionCreater(CANCEL_CREATE_SECTION);
export const createSectionReq = makeActionCreater(CREATE_SECTION_REQUEST);
export const createSectionSuc = makeActionCreater(CREATE_SECTION_SUCESS, 'res');
export const createSectionComplete = makeActionCreater(CREATE_SECTION_COMPLETE);

// 编辑版块 | 取消编辑版块
export const EDIT_SECTION = 'EDIT_SECTION';
export const CANCEL_EDIT_SECTION = 'CANCEL_EDIT_SECTION';

export const editSection = makeActionCreater(EDIT_SECTION, 'index');
export const cancelEditSection = makeActionCreater(CANCEL_EDIT_SECTION, 'index');

// 版块信息变化
export const SECTION_CHANGED = 'SECTION_CHANGED';
export const sectionChanged = makeActionCreater(SECTION_CHANGED, 'data');

// 删除版块 | 取消删除版块
export const DEL_SECTION_REQUEST = 'DEL_SECTION_REQUEST';
export const DEL_SECTION_SUCESS = 'DEL_SECTION_SUCESS';
export const DEL_SECTION_COMPLETE = 'DEL_SECTION_COMPLETE';

export const deleteSectionRes = makeActionCreater(DEL_SECTION_REQUEST);
export const deleteSectionSuc = makeActionCreater(DEL_SECTION_SUCESS, 'res', 'index');
export const deleteSectionComplete = makeActionCreater(DEL_SECTION_COMPLETE);

// 保存版块
export const SAVE_SECTION_REQUEST = 'SAVE_SECTION_REQUEST';
export const SAVE_SECTION_SUCCESS = 'SAVE_SECTION_SUCCESS';
export const SAVE_SECTION_COMPLETE = 'SAVE_SECTION_COMPLETE';

export const saveSectionRes = makeActionCreater(SAVE_SECTION_REQUEST);
export const saveSectionSuc = makeActionCreater(SAVE_SECTION_SUCCESS, 'res', 'index');
export const saveSectionComplete = makeActionCreater(SAVE_SECTION_COMPLETE);

// 页码变化
export const CHANGE_PAGER = 'CHANGE_PAGER';

export const changePager = makeActionCreater(CHANGE_PAGER);

// 获取版块列表数据
export const FETCH_SECTION_RESQUEST = 'FETCH_SECTION_REQ';
export const FETCH_SECTION_SUCCESS = 'FETCH_SECTION_SUCCESS';
export const FETCH_SECTION_COMPLETE = 'FETCH_SECTION_COMPLETE';

export const fetchSectionRes = makeActionCreater(FETCH_SECTION_RESQUEST);
export const fetchSectionSuc = makeActionCreater(FETCH_SECTION_SUCCESS, 'res', 'pager');
export const fetchSectionComplete = makeActionCreater(FETCH_SECTION_COMPLETE);


/**
 * 异步action
*/

/**
     * 1.0 获取版块列表
     * @param { Object } query -- 接口查询参数
     * @param { Object } pager -- 分页组件需要的配置对象（主要传递current参数）
    */
export function fetchSecData(query, pager) {
    return function (dispatch, getState) {
        dispatch(fetchSectionRes());

        return callAPI.get_section_all({ data: query })
            .done(res => { dispatch(fetchSectionSuc(res, pager)) })
            .complete(() => { dispatch(fetchSectionComplete()) });
    }
}

/**
     * 2.0 保存修改的版块信息
    */
export function saveSecDataAsync(index) {
    return function (dispatch, getState) {
        const sec = getState().list[index];
        const name = sec.name.value;

        if (!/\S/g.test(name)) {
            message.warn('版块名称不能为空！');
            return false;
        }

        dispatch(saveSectionRes());

        const query = {
            id: sec.id.value,
            name: sec.name.value,
            description: sec.brief.value
        };

        return callAPI.update_section({ data: query, type: 'post' })
            .done(res => { dispatch(saveSectionSuc(res, index)) })
            .complete(() => { dispatch(saveSectionComplete()) });
    }
}

/**
     * 3.0 删除版块
    */
export function deleteSecAsync(index, id) {
    return function (dispatch, getState) {
        dispatch(deleteSectionRes());

        return callAPI.del_section({ data: { id }, type: 'post' })
            .done(res => { dispatch(deleteSectionSuc(res)) })
            .complete(() => { dispatch(deleteSectionComplete()) });
    }
}

/**
     * 4.0 新增版块
    */
export function createSecAsync(data) {
    return function (dispatch, getState) {
        dispatch(createSectionReq());
        const query = {
            name: data.secName,
            description: data.secBrief
        }

        return callAPI.new_section({ data: query, type: 'post' })
            .done(res => { dispatch(createSectionSuc(res)) })
            .complete(() => { dispatch(createSectionComplete()) });
    }
}


