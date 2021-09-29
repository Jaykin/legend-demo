// import { combineReducers } from 'redux';
import * as type from '../actions';

import { SUCCESS } from '../../_utils/errcode';
import { updateObject, cloneArray, eachObject } from '../../_utils/reduxUtil';

/**
     * 对list中某个版块的可编辑单元进行操作
     * @param { Array } sections -- state.list
     * @param { Number } index -- 某个版块的索引
     * @param { Function } cb -- 对目标的操作函数
    */
function handleSecItem(sections, index, cb) {
    let list = cloneArray(sections);
    let sec = list[index];

    eachObject(sec, key => {
        let item = sec[key];

        if (item && typeof item.editable === 'boolean') {
            cb(item);
        }
    });

    return list;
}

/**
 * reducers
*/
function listReducer(state = {}, action = {}) {
    switch(action.type) {
        // 获取版块列表
        case type.FETCH_SECTION_RESQUEST: {
            return updateObject(state, { isFetching: true });
        }
        case type.FETCH_SECTION_SUCCESS: {
            const { res } = action;
            const oldPager = state.pager;
            const newPager = action.pager;

            if (res.errcode === SUCCESS) {
                const resData = res.data;
                let state = {};
                const list = resData.list.map((item, index) => ({
                    key: item.section_id,
                    id: { value: item.section_id },
                    index: {
                        value: resData.total - (newPager.current - 1) * oldPager.pageSize - index,     // 倒序
                    },
                    name:{
                        editable: false,
                        value: item.section_name,
                    },
                    brief: {
                        editable: false,
                        value: item.section_brief,
                    }
                }));

                // 更新分页数据
                newPager.total = resData.total;
                newPager.showTotal = total => `共 ${total} 项`;

                return updateObject(state, { list, pager: updateObject(oldPager, newPager) });
            } else {
                return state;
            }
        }
        case type.FETCH_SECTION_COMPLETE: {
            return updateObject(state, { isFetching: false });
        }

        // 开始编辑版块
        case type.EDIT_SECTION: {
            const { index } = action;
            const list = handleSecItem(state.list, index, item => {
                item.editable = true;
            });

            return updateObject(state, { list });
        }
        case type.CANCEL_EDIT_SECTION: {
            const { index } = action;
            const list = handleSecItem(state.list, index, item => {
                item.status = 'cancel';
                item.editable = false;
            });

            return updateObject(state, { list });
        }

        // 保存修改后的版块信息
        case type.SAVE_SECTION_REQUEST: {
            return updateObject(state, { isFetching: true });
        }
        case type.SAVE_SECTION_SUCCESS: {
            const { res, index } = action;

            if (res.errcode === SUCCESS) {
                const list = handleSecItem(state.list, index, item => {
                    item.status = 'save';
                    item.editable = false;
                });

                return updateObject(state, { list });
            } else {
                return state;
            }
        }
        case type.SAVE_SECTION_COMPLETE: {
            return updateObject(state, { isFetching: false });
        }

        // 修改版块信息
        case type.SECTION_CHANGED: {
            const { key, index, value } = action.data;
            let list = cloneArray(state.list);

            list[index][key].value = value;
            return updateObject(state, { list });
        }

        // 删除版块
        case type.DEL_SECTION_REQUEST: {
            return updateObject(state, { isFetching: true });
        }
        case type.DEL_SECTION_SUCESS: {
            const { res, index } = action;

            if (res.errcode === SUCCESS) {
                let list = cloneArray(state.list);
                const { total } = state.pager;
                let pager = updateObject(state.pager, { total: total - 1 });

                list.splice(index, 1);

                return updateObject(state, { list, pager, refresh: true });
            } else {
                return state;
            }
        }
        case type.DEL_SECTION_COMPLETE: {
            return updateObject(state, { isFetching: false, refresh: false });
        }

        // 创建版块
        case type.CREATE_SECTION: {
            return updateObject(state, { visible: true });
        }
        case type.CANCEL_CREATE_SECTION: {
            return updateObject(state, { visible: false });
        }
        case type.CREATE_SECTION_REQUEST: {
            return updateObject(state, { isCreating: true });
        }
        case type.CREATE_SECTION_SUCESS: {
            const { res } = action;

            if (res.errcode === SUCCESS) {
                return updateObject(state, { visible: false, refresh: true });
            }

            return state;
        }
        case type.CREATE_SECTION_COMPLETE: {
            return updateObject(state, { isCreating: false, refresh: false });
        }

        default: return state;
    }
}


export default listReducer;
