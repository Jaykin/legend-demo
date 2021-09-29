const Sequelize = require('sequelize');
const sequelize = require('../db2');
const CODE = require('../errcode/code');
const _ = require('lodash');
const columnSettings = {
    id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        primaryKey: true,
        autoIncrement: true
    },
    md5: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    file_id:{
        type:Sequelize.INTEGER,
        allowNull:false
    },
    idx:{
        type:Sequelize.INTEGER,
        allowNull:false
    },
    size:{
        type:Sequelize.INTEGER,
        allowNull:false
    },
    path:{
        type:Sequelize.STRING,
        allowNull:false
    },
    sequence: {
        // 默认为1，排序
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: 1
    }
};

const options = {
    timestamps: false,
    tableName: 'chunk_file'
};


const chunkFile = sequelize.define('chunk_file', columnSettings, options);


function findAllByFileId(fid) {
    return chunkFile.findAll({
        where:{
            file_id:fid
        },
        order:[['idx']]
    })
    .then((chunks) => {
        return Promise.resolve({
            id:fid,
            chunks:_.map(chunks, (chunk) => { return chunk.toJSON(); })
        });
    });
}


function findOrCreate(info) {
    return chunkFile
        .findOrCreate({
            where:{
                md5:info.md5,
                file_id:info.file_id
            },
            defaults:info
        })
        .spread((instance, created) => {
            if (!created) {
                return Promise.reject(CODE.CHUNK_EXIST);
            } else {
                return Promise.resolve(instance);
            }
        });
}

exports.findAllByFileId = findAllByFileId;
exports.findOrCreate = findOrCreate
;
