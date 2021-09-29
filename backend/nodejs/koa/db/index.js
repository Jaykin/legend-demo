/**
 * 定义db，并对外提供必要的接口，外部不需要使用sequelize的api
*/

// modules
const Sequelize = require('sequelize');
const uuid = require('node-uuid');
// files
const config = require('./config');
// vars
const env = process.env.NODE_ENV;
const ID_TYPE = Sequelize.STRING(50);

// 创建sequelize实例
const sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    {
        host: config.host,
        dialect: 'mysql',
        pool: {
            max: 5,
            min: 0,
            idle: 30000
        }
    }
);

// 生成唯一ID
function generateId() {
    return uuid.v4();
}

/**
 * 约束model的定义规范，定义model必须使用该方法
 * model即数据模型，其映射一张数据表
*/
function defineModel(name, attributes) {
    let attrs = {};

    for (let key in attributes) {
        let value = attributes[key];

        // 默认 NOT NULL
        if (typeof value === 'object' && value['type']) {
            value.allowNull = value.allowNull || false;     
            attrs[key] = value;
        } else {
            attrs[key] = {
                type: value,
                allowNull: false
            }
        }
    }

    // 添加公共字段
    attrs.id = {
        type: ID_TYPE,
        primaryKey: true
    };

    attrs.createdAt = {
        type: Sequelize.BIGINT,
        allowNull: false
    };

    attrs.updatedAt = {
        type: Sequelize.BIGINT,
        allowNull: false
    };

    attrs.version = {
        type: Sequelize.BIGINT,
        allowNull: false
    };

    return sequelize.define(name, attrs, {
        tableName: name,
        timestamps: false,
        hooks: {
            beforeValidate: (obj) => {
                let now = Date.now();

                if (obj.isNewRecord) {
                    if (!obj.id) {
                        obj.id = generateId();
                    }
                    obj.createdAt = now;
                    obj.updatedAt = now;
                    obj.version = 0;
                } else {
                    obj.updatedAt = Date.now();
                    obj.version++;
                }
            }
        }
    });
}

require('./mysql');

// 定义模块输出
module.exports = {
    ID: ID_TYPE,                        // 数据项id的类型
    generateId,                         // 生成唯一ID
    defineModel,                        // 用来定义数据模型
    // 数据类型 start
    STRING: Sequelize.STRING,           // 
    INTEGER: Sequelize.INTEGER,         //
    BIGINT: Sequelize.BIGINT,           // 
    TEXT: Sequelize.TEXT,               // 
    DOUBLE: Sequelize.DOUBLE,           // 
    DATEONLY: Sequelize.DATEONLY,       // 
    BOOLEAN: Sequelize.BOOLEAN,         // 
    // 数据类型 end
    sync: () => {                       // 用来创建数据库
        if (env !== 'prod' ) {
            sequelize.sync({ force: true });
        } else {
            throw new Error('Cannot sync() when NODE_ENV is set to \'prod\'.');
        }
    }
};