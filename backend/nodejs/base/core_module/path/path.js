// path
const path = require('path');

const path1 = 'a/b/d.html';

/**
 * path.basename(path[, ext]) 返回 path 的最后一部分，不包含尾部的目录分隔符
 */
console.log('[1] path.basename(): ', path.basename(path1)); // d.html
console.log('[2] path.basename:() ', path.basename(path1, 'html')); // d.

/**
 * path.delimiter 返回当前系统的路径定界符(一般用于分割环境变量)
 * 
 * windows: ;
 * posix: :
 */
console.log('[3] path.delimiter: ', path.delimiter); // :
// console.log('[4] path.delimiter: ', process.env.PATH.split(path.delimiter));

/**
 * path.dirname(path) 返回 path 的目录名
 */
console.log('[4] path.dirname(): ', path.dirname(path1)); // a/b

/**
 * path.extname(path<String>) 返回 path 的扩展名
 */
console.log('[5] path.extname(): ', path.extname(path1)); // .html

/**
 * path.format(pathObject) 从对象返回路径字符串
 * {
 *  dir <string>,
 *  root <string>,
 *  base <string>,
 *  name <string>,
 *  ext <string>
 * }
 */
console.log('[6] path.format(): ', path.format({
    root: '/root',
    name: 'test',
    ext: '.html',
    dir: '/home/user/dir',  // 会忽略 root
    base: 'file.txt',       // 会忽略 name、ext
}));  // /home/user/dir/file.txt

/**
 * path.parse(path<String>) 将路径字符串解析为对象，其属性表示 path 的有效元素
 */
console.log('[7] path.parse(): ', path.parse(path1));

/**
 * path.isAbsolute(path<String>) 检测 path 是否为绝对路径
 */
console.log('[8] path.isAbsolute(): ', path.isAbsolute('/foo/bar')); // true

/**
 * path.join(...paths) 将所有给定的 path 片段连接到一起（使用平台特定的分隔符作为定界符）
 */
console.log('[9] path.join(): ', path.join('/foo/bar', './', '', '../ff')); // /foo/ff

/**
 * path.normalize(path) 规范化给定的 path，解析 '..' 和 '.' 片段
 */
console.log('[10] path.normalize(): ', path.normalize('/foo/bar//baz/asdf/quux/..')); // /foo/bar/baz/asdf

/**
 * path.posix 提供对 path 方法的 POSIX 特定实现的访问(Object)
 * path.win32 提供对特定于 Windows 的 path 方法的实现的访问(Object)
 */
// console.log('[11] path.posix ', path.posix);
// console.log('[11] path.win32 ', path.win32);

/**
 * path.relative(from, to) 根据当前工作目录返回 from 到 to 的相对路径
*/
console.log('[12] path.relative(from, to): ', path.relative('/a/b/c1/d1', '/a/b/c2/d2')); // ../../c2/d2

/**
 * path.resolve([...paths]) 将路径或路径片段的序列解析为绝对路径
 * - 给定的路径序列会从右到左进行处理，后面的每个 path 会被追加到前面，直到构造出绝对路径
 * - 如果在处理完所有给定的 path 片段之后还未生成绝对路径，则会使用当前工作目录
*/
console.log('[13] path.resolve([...paths]): ', path.resolve('a', 'b/c1', '../c2/d1/e.html')); // /Users/ming/Desktop/workspace/legend-demo/backend/nodejs/base/core_module/path/a/b/c2/d1/e.html

/**
 * path.sep 返回平台特定的路径片段分隔符
 * Windows 上是 \
 * POSIX 上是 /
*/
console.log('[14] path.sep: ', 'a/b/c'.split(path.sep)); // [ 'a', 'b', 'c' ]
