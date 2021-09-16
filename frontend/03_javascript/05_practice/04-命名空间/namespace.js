/**
 * 单全局变量模式下，定义全局对象的属性时，需要考虑命名空间是否已存在
 */

var GlobalObj = {
    /**
     * @param {String} nsStr - 命名空间字符串，如 a.b.c
     */
    namespace: function (nsStr) {
        var parts = nsStr.split('.');
        var object = this;
        var i = 0;
        var ns = '';

        while (i < parts.length) {
            ns = parts[i];

            if (!object[ns]) {
                object[ns] = {};
            }

            object = object[ns];
            i++;
        }

        return object;
    }
}


// 使用
var bookReader = GlobalObj.namespace('books.reader');   // GlobalObj.books.reader的引用
bookReader.name = 'Jay';

console.log(GlobalObj.books.reader.name);        // ‘Jay’

