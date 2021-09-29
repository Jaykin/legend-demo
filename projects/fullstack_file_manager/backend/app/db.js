const mysql = require('mysql');
const {
    db
} = require('./config');
// const Sequelize = require('sequelize');


// const sequelize = new Sequelize(db.database, db.user, db.password, {
//     host: db.host,
//     pool: {
//         max: 5,
//         min: 0,
//         idle: 10000
//     }
// });

const connection = mysql.createConnection(db);

exports.connection = connection;

// exports.pool = pool;
