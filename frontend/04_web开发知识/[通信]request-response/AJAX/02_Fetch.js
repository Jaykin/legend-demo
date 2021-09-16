/**
 * Fetch
 */

// 1、创建 Header 对象
const reqHeaders = new Headers()
reqHeaders.append('Content-Type', 'application/json')

// 2、创建 Request 对象，不支持 file 协议
const url1 = 'file:///Users/ming/Desktop/%E5%AD%A6%E4%B9%A0%E6%96%87%E6%A1%A3/%E4%B9%A6%E7%B1%8D/mac/SQL%20Cookbook.pdf'
const url2 = 'http://www.baidu.com'
const request = new Request(url2, {
    method: 'GET',
    headers: reqHeaders,
    mode: 'no-cors'
})

// 3、http 请求
fetch(request)
    .then((response) => {
        console.log(response)
    }).catch((err) => {
        console.log(err)
    })