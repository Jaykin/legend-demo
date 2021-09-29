const Sequelize = require('sequelize');
const sequelize = require('../db2');
const CODE = require('../errcode/code');
const _ = require('lodash');
const fileService = require('./fileService');
const {
    escapeHtml
} = require('../lib/xssEscape');

const columnSettings = {
    id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: '分类名称不能为空'
            },
            len: {
                args: [0, 100],
                msg: '分类名称长度不能超出 100 个字'
            }
        }
    },
    description: {
        type: Sequelize.STRING,
        validate: {
            len: {
                args: [0, 500],
                msg: '分类简介不能超出 500 个字'
            },
        }
    },
    parent_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: 0
    },
    sequence: {
        // 默认为1，排序
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: 1
    }
};

const cateOptions = {
    timestamps: false,
    freezeTableName: true,
    tableName: 'category'
};

const Category = sequelize.define('category', columnSettings, cateOptions);


Category.addHook('beforeValidate', (cate) => {
    const cateJSON = cate.toJSON();

    _.forEach(cateJSON, (value, key) => {
        if (_.isString(value)) {
            cate[key] = escapeHtml(value);
        }
    });
});

function findAll(options = {}) {
    return Category
        .findAll(options)
        .then((cates) => {
            const catesJSON = _.map(cates, (cate) => {
                return cate.toJSON();
            });
            let parentIdMap = _.groupBy(catesJSON, (cate) => {
                return cate.parent_id || 0;
            });
            const topCates = parentIdMap[0] || [];
            parentIdMap = _.omit(parentIdMap, 0);
            _.forEach(topCates, function findChild(cate) {
                cate.children = parentIdMap[cate.id] || [];
                if (!_.isEmpty(cate.children)) {
                    _.forEach(cate.children, findChild);
                }
            });
            return Promise.resolve(topCates);
        });
}


function create({
    name = '',
    description = '',
    parent_id = 0,
    sequence = 1
}, options = {}) {
    return Category.findOrCreate({
        defaults: {
            name,
            description,
            parent_id,
            sequence
        },
        where: {
            name,
            parent_id
        },
        // https://github.com/sequelize/sequelize/issues/1831
        // i dont know why..
        // 貌似我知道为什了，数据的事务有隔离级别的。
        transaction: options.transaction
    }).spread((instance, created) => {
        if (!created) {
            return Promise.reject(CODE.CATEGORY_EXIST);
        }
        return Promise.resolve(instance);
    });
}

function findById(id, options = {}) {
    return Category.findById(id, options);
}

function del(id, options = {}) {
    return Category.destroy({
        where: {
            id
        },
        transaction: options.transaction
    }).then((data) => {
        if (data === 0) {
            return Promise.reject(CODE.CATEGORY_NOT_FOUND);
        }
        return Promise.resolve();
    });
}

function findByParentId(id = 0) {
    return Category.findAll({
        where: {
            parent_id: id
        }
    });
}


function createMulti(cates) {
    function checkUnique(categories) {
        const names = {};
        let unique = true;
        _.forEach(categories, (cate) => {
            if (_.has(names, cate.name)) {
                unique = false;
                return unique;
            }
            names[cate.name] = true;
            if (cate.children && cate.children.length) {
                unique = checkUnique(cate.children);
            }
            return unique;
        });
        return unique;
    }


    function checkParent(categories) {
        const promises = [];
        _.forEach(categories, (cate) => {
            if (cate.parent_id) {
                promises.push(findById(cate.parent_id));
            }
        });
        if (promises.length) {
            return Promise
                .all(promises)
                .then((parents) => {
                    const noParent = _.some(parents, (parent) => {
                        return parent === null;
                    });
                    if (noParent) {
                        return Promise.reject(CODE.CATEGORY_NOT_FOUND);
                    } else {
                        return Promise.resolve();
                    }
                });
        }
        return Promise.resolve();
    }

    if (!checkUnique(cates)) {
        return Promise.reject(CODE.CATEGORY_CREATE_NAME_DUPLICATE);
    }


    return checkParent(cates).then(() => {
        return sequelize.transaction((t) => {
            function nestedCreate(categories, transaction) {
                const promises = _.map(categories, (cate) => {
                    return create(cate, {
                        transaction
                    })
                        .then((data) => {
                            if (cate.children && cate.children.length) {
                                _.forEach(cate.children, (child) => {
                                    child.parent_id = data.id;
                                });
                                return nestedCreate(cate.children, transaction);
                            }
                            return Promise.resolve(data);
                        });
                });

                return Promise.all(promises);
            }

            return nestedCreate(cates, t);
        });
    });

    // return
}

function findByParentIds(ids = []) {
    return Category.findAll({
        where: {
            id: {
                $in: ids
            }
        }
    });
}


/**
 * @param {arrya} ids
 * @returns
 */
function delMulti(ids) {
    // {
    //     id: parent_id // 方便后面查找 id 兄弟分类
    // }
    const originalIdsInfo = {};

    return Category.findAll().then((cates) => {
        const catesJSON = _.map(cates, (cate) => {
            return cate.toJSON();
        });
        const idMap = _.transform(catesJSON, (result, cate) => {
            result[cate.id] = cate;
        }, {});

        // 以 parentId 为 key ，对应的 children 分类为value 的 map
        const parentIdMap = _.transform(catesJSON, (result, cate, index) => {
            if (!_.has(result, cate.parent_id)) {
                result[cate.parent_id] = [];
            }
            result[cate.parent_id].push(cate);

            if (ids.indexOf(cate.id) >= 0) {
                originalIdsInfo[cate.id] = cate.parent_id;
            }
        }, {});

        _.forEach(ids, (theId) => {
            _.forEach(parentIdMap[theId], function findId(cate) {
                if (ids.indexOf(cate.id) < 0) {
                    ids.push(cate.id);
                }
                _.forEach(parentIdMap[cate.id], findId);
            });
        });

        function deep(parentId) {
            let depth = 0;
            let pid = parentId;
            while (pid) {
                depth += 1;
                pid = idMap[pid].parent_id;
            }
            return depth;
        }

        return sequelize.transaction((t) => {
            const promises = _.map(ids, (id) => {
                return del(id, {
                    transaction: t
                });
            });
            return Promise
                .all(promises)
                .then(() => {
                    // 如果删除的 同级分类（同个 parent 下）的第一个，则 file 的 cate 由下一个分类填入。
                    const updatePromises = _.map(originalIdsInfo, (parentId, id) => {
                        const siblings = parentIdMap[parentId];
                        if (siblings[0].id === Number(id)) {
                            siblings.shift();
                        }
                        const depth = deep(parentId);
                        return fileService.updateFilesForCategoryDel(id, siblings, depth, {
                            transaction: t
                        });
                    });
                    return Promise.all(updatePromises);
                });
        });
    });
}

function update({
    id,
    name = '',
    description = '',
    sequence
}, options = {}) {
    return Category
        .findById(id)
        .then((data) => {
            return Category.find({
                where: {
                    parent_id: data.parent_id,
                    name,
                    $not: {
                        id
                    }
                }
            });
        })
        .then((data) => {
            if (data) {
                return Promise.reject(CODE.CATEGORY_EXIST);
            }
            return Category.update({
                name,
                description,
                sequence
            }, {
                where: {
                    id
                },
                transaction: options.transaction
            });
        });
}


function updateMulti(cates) {
    return sequelize.transaction((t) => {
        const promises = _.map(cates, (cate) => {
            return update(cate, {
                transaction: t
            });
        });

        return Promise.all(promises);
    });
}

function findByIds(ids) {
    return Category.findAll({
        where: {
            id: {
                $in: ids
            }
        }
    });
}

function createSingle({
    name = '',
    description = '',
    parent_id = 0,
    sequence = 1
}, options = {}) {
    let promiseInstance = Promise.resolve(true);
    if (parent_id !== 0) {
        promiseInstance = promiseInstance.then(() => {
            return findById(parent_id, options);
        });
    }
    return promiseInstance.then((data) => {
        if (!data) {
            return Promise.reject(CODE.CATEGORY_NOT_FOUND);
        }
        return Category.findOrCreate({
            defaults: {
                name,
                description,
                parent_id,
                sequence
            },
            where: {
                name,
                parent_id
            },
            // https://github.com/sequelize/sequelize/issues/1831
            // i dont know why..
            // 貌似我知道为什了，数据的事务有隔离级别的。
            transaction: options.transaction
        }).spread((instance, created) => {
            if (!created) {
                return Promise.reject(CODE.CATEGORY_EXIST);
            }
            return Promise.resolve(instance);
        });
    });
}


exports.findAll = findAll;
exports.create = create;
exports.delete = del;
exports.findByParentId = findByParentId;
exports.createMulti = createMulti;
exports.createSingle = createSingle;
exports.delMulti = delMulti;
exports.updateMulti = updateMulti;
exports.findByIds = findByIds;
