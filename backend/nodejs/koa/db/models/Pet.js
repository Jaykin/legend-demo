/**
 * Pet数据模型
*/
const db = require('../index');

module.exports = db.defineModel('pet', {
    id: {
        type: db.STRING(50),
        primaryKey: true
    },
    name: db.STRING(100),
    gender: db.BOOLEAN,
    birth: db.STRING(10),
    createAt: db.BIGINT,
    updateAt: db.BIGINT,
    version: db.BIGINT
});