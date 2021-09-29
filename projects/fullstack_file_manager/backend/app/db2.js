const {
    db
} = require('./config');
const Sequelize = require('sequelize');

const sequelize = new Sequelize(db.database, db.user, db.password, {
    host: db.host,
    port:db.port,
    logging:db.logging,
    pool: {
        max: 5,
        min: 0,
        idle: 10000
    },
    dialect:'mysql'
});

module.exports = sequelize;
