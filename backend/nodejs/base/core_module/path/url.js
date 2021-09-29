// url
 const URL = require('url').URL;

 const urlStr1 = 'https://user:pass@sub.host.com:8080/p/a/t/h?query1=1&query2=2#hash';

/** ================================================ URL类 ================================================ **/
const myUrl = new URL(urlStr1);
console.log('url.protocol: ', myUrl.protocol);
console.log('url.username: ', myUrl.username);
console.log('url.password: ', myUrl.password);
console.log('url.host: ', myUrl.host);          // 包含端口
console.log('url.hostname: ', myUrl.hostname);  // 不包含端口
console.log('url.port: ', myUrl.port);
console.log('url.pathname: ', myUrl.pathname);
console.log('url.search: ', myUrl.search);      // 查询字符串
console.log('url.searchParams: ', myUrl.searchParams); // URLSearchParams 对象
console.log('url.hash: ', myUrl.hash);

console.log('url.href: ', myUrl.href);          // 获取及设置序列化的 URL
console.log('url.origin: ', myUrl.origin);      // 获取只读的序列化的 URL 的 origin

console.log('url.toString(): ', myUrl.toString());
console.log('url.toJSON(): ', myUrl.toJSON());

/** ================================================ URLSearchParams类 ================================================ **/
