const Sequelize = require('sequelize');
const sequelize = require('../db2');
const CODE = require('../errcode/code');
const fileService = require('./fileService');
const { escapeHtml } = require('../lib/xssEscape');
const _ = require('lodash');

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
                msg: '请填写板块名称'
            },
            len: {
                args: [0, 100],
                msg: '板块名称长度超出限制了（100）'
            }
        }
    },
    description: {
        type: Sequelize.STRING,
        validate: {
            len: {
                args: [0, 500],
                msg: '板块简介不能超过 500 个字'
            }
        }
    }
};

const options = {
    timestamps: false,
    freezeTableName: true,
    tableName: 'section'
};


const Section = sequelize.define('section', columnSettings, options);


Section.addHook('beforeValidate', (section, options) =>  {
    const sectionJSON = section.toJSON();
    _.forEach(sectionJSON, (value, key) => {
        if (_.isString(value)) {
            section[key] = escapeHtml(value);
        }
    });
});

function findByName(name) {
    return Section.findAll({
        where: {
            name
        }
    });
}

function create({
    name = '',
    description = ''
}) {
    return findByName(name).then((data) => {
        if (data.length) {
            return Promise.reject(CODE.SECTION_NAME_EXIST);
        } else {
            return Section.create({
                name,
                description
            });
        }
    }).then((data) => {
        return Promise.resolve(data.id);
    });
}

function update({
    id,
    name = '',
    description = ''
}) {
    return Section.findAll({
        where: {
            name,
            id: {
                $ne: id
            }
        }
    }).then((data) => {
        if (data.length) {
            return Promise.reject(CODE.SECTION_NAME_EXIST);
        } else {
            return Section.update({
                name,
                description
            }, {
                where: {
                    id
                }
            });
        }
    }).then((data) => {
        if (!data[0]) {
            return Promise.reject(CODE.SECTION_TARGET_NOT_EXIST);
        } else {
            return Promise.resolve(0);
        }
    });
}

function findById(id) {
    return Section.findById(id);
}

function findAll() {
    return Section.findAll();
}

function del(id) {
    return sequelize.transaction((t) => {
        return Section
                .destroy({
                    where: {
                        id
                    },
                    transaction: t
                })
                .then((data) => {
                    if (data > 0) {
                        return Promise.resolve(0);
                    } else {
                        return Promise.reject(CODE.SECTION_TARGET_NOT_EXIST);
                    }
                })
                .then(() => {
                    return fileService.updateFilesForSectionDel(id, {
                        transaction: t
                    });
                })
                .then(() => { return Promise.resolve(0); });
    });
}


function findAndCountAll(offset, limit) {
    const numOffset = Number(offset);
    const numLimit = Number(limit);

    if (limit) {
        return Section.findAndCountAll({
            offset: numOffset,
            limit: numLimit,
            order:[['id', 'DESC']]
        });
    } else {
        return Section.findAndCountAll({
            offset: numOffset,
            order:[['id', 'DESC']]
        });
    }
}

exports.create = create;
exports.findById = findById;
exports.update = update;
exports.findAll = findAll;
exports.delete = del;
exports.findAndCountAll = findAndCountAll;
