/**
 * XHR(XMLHttpRequest)
 */

const xhr = new XMLHttpRequest()

xhr.onload = (res) => {
    console.log(res)
}

const url = 'file:///Users/ming/Desktop/%E5%AD%A6%E4%B9%A0%E6%96%87%E6%A1%A3/%E4%B9%A6%E7%B1%8D/mac/SQL%20Cookbook.pdf'
xhr.open('GET', url, true) // 异步请求
xhr.send()