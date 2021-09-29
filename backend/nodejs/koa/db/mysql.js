/**
 * 加载mysql驱动，连接数据库
*/

const mysql = require('mysql');

// 创建连接
const connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'password',
    database: 'samp_db'
});

connection.connect(err => {
    if (err) {
        console.error('error connecting: ', err.stack);
    } else {
        console.log('connected as id ' + connection.threadId);
    }
});

// 发送sql请求给数据库
connection.query('select * from card_bank_district', (error, results, fields) => {
    if (error) throw error;

    console.log('查询成功');
    // console.log(results);
    let res = {};
    results.forEach((item) => {
        let cityCode = item.city_code;

        if (!res[cityCode]) {
            res[cityCode] = [];
        }

        res[cityCode].push({
            label: item.district_name,
            value: item.district_code
        });
    });

    console.log(JSON.stringify(res));
});

// 结束连接
// connection.end(err => {

// });
// connection.destroy();

module.exports = connection;