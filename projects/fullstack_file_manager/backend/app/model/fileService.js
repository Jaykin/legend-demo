const Sequelize = require('sequelize');
const sequelize = require('../db2');
const _ = require('lodash');
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
                msg: 'section name can not be empty'
            }
        }
    },
    size: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    ext: {
        type: Sequelize.STRING,
        allowNull: false
    },
    path: {
        type: Sequelize.STRING,
        allowNull: false
    },
    is_open: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
        defaultValue: 1
    },
    md5: {
        type: Sequelize.STRING,
        allowNull: false
    },
    brand_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: 0
    },
    brand_name: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: ''
    },
    series_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: 0
    },
    series_name: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: ''
    },
    model_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: 0
    },
    model_name: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: ''
    },
    type_a_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: 0
    },
    type_a_name: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: ''
    },
    type_b_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: 0
    },
    type_b_name: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: ''
    },
    type_c_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: 0
    },
    type_c_name: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: ''
    },
    section_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: 0
    },
    section_name: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: ''
    },
    description: {
        type: Sequelize.STRING,
        validate: {
            len: {
                args: [0, 500],
                msg: 'description length can not greater than 500'
            },
        }
    },
    status: {
        // 0,  表示上传完成， 1， 表示被删除， 2 表示上传中
        type: Sequelize.INTEGER,
        defaultValue: 0
    },
    is_recommend: {
        // 0,  表示不推荐， 1， 表示被推荐
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: 1
    },
    sequence: {
        // 默认为1，排序
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: 1
    }
};

const options = {
    timestamps: true,
    updatedAt: false,
    deletedAt: false,
    createdAt: 'upload_date',
    freezeTableName: true,
    tableName: 'file'
};


const fileTable = sequelize.define('file', columnSettings, options);

fileTable.addHook('beforeValidate', (file, options) => {
    const fileJSON = file.toJSON();
    _.forEach(fileJSON, (value, key) => {
        if (_.isString(value)) {
            file[key] = escapeHtml(value);
        }
    });
});


function findSameByIdsAndName({
    name = '',
    ext = '',
    brand_id = 0,
    series_id = 0,
    model_id = 0,
    type_ids = '',
    section_id = 0,
}) {
    const [type_a_id = 0, type_b_id = 0, type_c_id = 0] = type_ids.split(',');

    return fileTable.findOne({
        where: {
            name,
            ext,
            brand_id,
            series_id,
            model_id,
            type_a_id,
            type_b_id,
            type_c_id,
            section_id,
            status: 0
        }
    });
}


function findSameByName({
    name = '',
    ext = ''
}) {
    return fileTable.findOne({
        where: {
            name,
            ext,
            status: 0
        }

    });
}

function findDupicate({
    name = '',
    ext = '',
    brand_id = 0,
    series_id = 0,
    model_id = 0,
    type_ids = ''
}) {
    return Promise.all([findSameByIdsAndName({
        name,
        ext,
        brand_id,
        series_id,
        model_id,
        type_ids
    }), findSameByName({
        name,
        ext
    })]);
}


function updateDel(id, isDel) {
    return fileTable.update({
        status: isDel
    }, {
        where: {
            id
        }
    });
}

function findById(id) {
    return fileTable.findOne({
        where: {
            id,
            status: 0
        }
    });
}

function create(info) {
    return fileTable.create(info);
}

function updateFilesForSectionDel(sectionId, options) {
    return fileTable.update({
        section_id: 0,
        section_name: '其他'
    }, {
        where: {
            section_id: sectionId
        },
        transaction: options.transaction
    });
}

function updateFilesForCategoryDel(cateId, siblings, depth, options) {
    const cateColumns = ['type_a_id', 'type_b_id', 'type_c_id'];

    const whereQuery = {};
    whereQuery[cateColumns[depth]] = cateId;

    const updateValuesArr = [];
    updateValuesArr.push({
        type_a_id: 0,
        type_a_name: '其他',
        type_b_id: 0,
        type_b_name: '',
        type_c_id: 0,
        type_c_name: ''
    });
    updateValuesArr.push({
        type_b_id: siblings.length ? siblings[0].id : 0,
        type_b_name: siblings.length ? siblings[0].name : '',
        type_c_id: 0,
        type_c_name: ''
    });
    updateValuesArr.push({
        type_c_id: siblings.length ? siblings[0].id : 0,
        type_c_name: siblings.length ? siblings[0].name : ''
    });
    return fileTable.update(updateValuesArr[depth], {
        where: whereQuery
    });
}

function findAllByDesc(query, from = 0, page_size = 20) {
    query.status = 0;

    if (query.name) {
        query.name = {
            $like: `%${query.name}%`
        };
    }

    return fileTable.findAndCountAll({
        // where条件搜索
        where: query,
        // DESC降序，根据id
        order: [
            ['sequence', 'DESC'],
            ['id', 'DESC'],
        ],
        offset: from,
        limit: page_size
    });
}

function findByHash(md5) {
    return fileTable.find({
        where: {
            md5
        }
    });
}

function updatePath(path, id) {
    return fileTable.update({
        path,
        status: 0
    }, {
        where: {
            id,
            status: 2
        }
    });
}

function update(fileId, info) {
    return fileTable.update(info, {
        where: {
            id: fileId
        }
    });
}

function findByIdWithAllStatus(id) {
    return fileTable.findById(id);
}

module.exports = {
    findSameByIdsAndName,
    updateDel,
    findById,
    findByIdWithAllStatus,
    findSameByName,
    create,
    updateFilesForSectionDel,
    updateFilesForCategoryDel,
    update,
    findAllByDesc,
    findByHash,
    updatePath
};

// exports.findSameByIdsAndName = findSameByIdsAndName;
// exports.updateDel = updateDel;
// exports.findById = findById;
// exports.findByIdWithAllStatus = findByIdWithAllStatus;
// exports.findSameByIdsAndName = findSameByIdsAndName;
// exports.findSameByName = findSameByName;
// exports.create = create;
// exports.updateFilesForSectionDel = updateFilesForSectionDel;
// exports.updateFilesForCategoryDel = updateFilesForCategoryDel;
// exports.update = update;
// exports.findAllByDesc = findAllByDesc;
// exports.findByHashAndName = findByHashAndName;
// exports.updatePath = updatePath;
