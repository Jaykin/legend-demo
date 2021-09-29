import * as type from './actions';
import { updateObject } from '../_utils/reduxUtil';
import { SUCCESS } from '../_utils/errcode';
import message from '../_utils/message';

/**
 * 用于处理分类操作（即生成或修改分类信息）
 * @param { Object } source - 源一级分类的数据，即state.curType
 * @param { Number } level - 表示需要在相应级数下进行操作
 * @param { Object } target - 需要操作的目标信息及回调函数，属性为id _id parentId cb
 * @returns { Object } - 生成新的对象
*/
const findAndExcute = (source, level, target) => {
    const { cb } = target;
    let newSrc = updateObject({}, source);

    const recursion = (src, lev, tar) => {
        src.children.every((item, index) => {
            const key = item.id ? 'id' : '_id';
            let tarId = '';

            if (lev === 3) {
                tarId = tar.parentId;
            } else if (lev === 2) {
                tarId = tar[key]
            }

            if (item[key] === tarId) {
                // 避免react不更新
                let newItem = updateObject(item);
                src.children[index] = newItem;

                // finded or next
                --lev < 2 ? cb(newItem, src, index) : recursion(newItem, lev, tar);
                return false;
            }

            return true;
        });
    }

    if (level === 1) {
        cb(newSrc);
    } else {
        recursion(newSrc, level, target);
    }

    return newSrc;
}

/**
 * 更新分类后传给后台的数据
 * @param { Object } source - 源数据，即state.updateTypeData
 * @param { Object } target - 目标信息
*/
const updateApiTypeData = (source, target) => {
    const { id } = target;
    const newTar = updateObject(target);

    delete newTar.children;

    if (id) {
        const hasNew = source.update.every((item, idx, arr) => {
            if (item.id === id) {
                arr.splice(idx, 1, newTar);
                return false;
            }

            return true;
        });

        hasNew && source.update.push(newTar);
    }
}

/**
 * 新建分类后传给后台的数据
 * @param { Object } source - 源数据，即state.curType
 * @param { Object } targetNew - 源数据，即state.updateTypeData.new
*/
const fillUpdateTypeData = (source, targetNew) => {
    const isNewA = !source.id;

    if (isNewA) {
        targetNew.push(source);
    } else {
        source.children.forEach(item => {
            const isNewB = !!item._id;

            if (isNewB) {
                targetNew.push(item);
            } else {
                item.children.forEach(it => {
                    const isNewC = !!it._id;

                    isNewC && targetNew.push(it);
                });
            }
        });
    }
}


export default function reducers(state = {}, action = {}) {
    switch(action.type) {
        // 切换编辑分类弹窗
        case type.TOGGLE_MODAL: {
            return updateObject(state, { visible: action.visible });
        }

        case type.SET_REFRESH: {
            return updateObject(state, { refresh: action.refresh });
        }

        // 创建分类
        case type.CREATE_TYPE: {
            return updateObject(state, { visible: true, curType: {
                _id: '',
                id: '',
                name: '',
                sequence: 1,
                description: '',
                parent_id: 0,
                children: []
            }});
        }

        // 开始编辑分类
        case type.START_EDIT_TYPE: {
            return updateObject(state, { visible: true, curType: action.curType });
        }

        // 取消编辑分类
        case type.CANCEL_EDIT: {
            return updateObject(state, { visible: false, updateTypeData: {
                del: [],
                new: [],
                update: []
            }});
        }

        // 修改一级分类
        case type.CHANGE_TYPEA: {
            const { field, value } = action;

            return updateObject(state, {
                curType: findAndExcute(state.curType, 1, { cb: item => {
                    item[field] = value;

                    updateApiTypeData(state.updateTypeData, item);
                }})
            });
        }

        // 删除一级分类
        case type.DELETE_TYPEA: {
            const { id } = action;
            const { updateTypeData } = state;

            updateTypeData.del.push(id);

            return state;
        }

        // 创建二级分类
        case type.CREATE_TYPEB: {
            return updateObject(state, {
                curType: findAndExcute(state.curType, 1, { cb: item => {
                    const parentId = item.id || item._id;

                    item.children.push({
                        _id: parentId + '_' + item.children.length,        // 私有id，之后能通过该值找到新创建的二级分类
                        id: '',
                        name: '',
                        parent_id: parentId,
                        children: []
                    });
                }})
            })
        }

        // 修改二级分类
        case type.CHANGE_TYPEB: {
            const { id, _id, value } = action;

            return updateObject(state, {
                curType: findAndExcute(state.curType, 2, {
                    cb: item => {
                        item.name = value;
                        updateApiTypeData(state.updateTypeData, item);
                    },
                    id: id,
                    _id: _id
                })
            })
        }

        // 删除二级分类
        case type.DELETE_TYPEB: {
            const { id, _id } = action;
            const { updateTypeData } = state;

            if (id) {
                // 删除已有的分类
                updateTypeData.del.push(id);
            }

            return updateObject(state, {
                curType: findAndExcute(state.curType, 2, {
                    cb: (item, parent, index) => {
                        parent.children.splice(index, 1);
                    },
                    id: id,
                    _id: _id
                })
            })
        }

        // 创建三级分类
        case type.CREATE_TYPEC: {
            const { parentId, _parentId } = action;
            const pId = parentId || _parentId || '';

            return updateObject(state, {
                curType: findAndExcute(state.curType, 2, {
                    cb: item => {
                        item.children.push({
                            _id: pId + '_' + item.children.length,         // 私有id，之后能通过该值找到新创建的三级分类
                            id: '',
                            name: '',
                            parent_id: pId,
                            children: []
                        });
                    },
                    id: parentId,
                    _id: _parentId,
                })
            })
        }

        // 修改三级分类
        case type.CHANGE_TYPEC: {
            const { parentId, id, _id, value } = action.params;

            return updateObject(state, {
                curType: findAndExcute(state.curType, 3, {
                    cb: item => {
                        item.name = value;
                        updateApiTypeData(state.updateTypeData, item);
                    },
                    id: id,
                    _id: _id,
                    parentId: parentId
                })
            })
        }

        // 删除三级分类
        case type.DELETE_TYPEC: {
            const { parentId, id, _id } = action.params;
            const { updateTypeData } = state;

            if (id) {
                // 删除已有的分类
                updateTypeData.del.push(id);
            }

            return updateObject(state, {
                curType: findAndExcute(state.curType, 3, {
                    cb: (item, parent, index) => {
                        parent.children.splice(index, 1);
                    },
                    id: id,
                    _id: _id,
                    parentId: parentId
                })
            })
        }

        // 请求后台更新类型信息
        case type.UPDATE_TYPE_RESQUEST: {
            const { updateTypeData, curType } = state;

            fillUpdateTypeData(curType, updateTypeData.new);

            return updateObject(state, { isUpdating: true });
        }

        case type.UPDATE_TYPE_SUCCESS: {
            const { res } = action;
            const init = { del: [], new: [], update: [] };

            if (res.errcode === SUCCESS) {
                message.success('编辑分类信息成功！');

                return updateObject(state, { isUpdating: false, visible: false, refresh: true, updateTypeData: init });
            } else {
                return updateObject(state, { isUpdating: false, updateTypeData: init });
            }
        }

        case type.UPDATE_TYPE_FAIL: {
            const init = { del: [], new: [], update: [] };

            return updateObject(state, { isUpdating: false, updateTypeData: init });
        }

        default: return state;
    }
}
