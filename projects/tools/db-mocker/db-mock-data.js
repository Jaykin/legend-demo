/**
 * 编程式造表数据
 * 1、指定库及连接信息
 * 2、指定表
 * 3、指定操作
*/

const Sequelize = require('sequelize');

// 连接数据库
const sequelize = new Sequelize('mysql://vipshop:123456@10.199.199.137:3306/vipshop_weixin');

// 测试连接
sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

  
// 关闭连接
// sequelize.close()