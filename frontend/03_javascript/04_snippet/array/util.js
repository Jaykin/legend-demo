// ------------------------ all --------------------------------------
// 1、检查数组所有想是否符合某个条件，默认条件为每项是否为真值
const all = (arr, fn = Boolean) => arr.every(fn);
// all([1, 2]);
// all([0, 1]);


// ------------------------ allEqual --------------------------------------
// 2、检查数组每项是否严格相等
const allEqual = arr => arr.every(val => val === arr[0]);
// allEqual([1, 12])
// allEqual([1, 1, 1, 1])
// allEqual([NaN, NaN, NaN])


// ------------------------ allEqual --------------------------------------
// 3、检查数组中是否存在一项符合某个条件，默认条件为是否是真值
const any = (arr, fn = Boolean) => arr.some(fn);

// ------------------------ arrayToCSV --------------------------------------
// 4、将 2 维数组转换为 逗号隔离的字符值（CSV comma-separated values）(以纯文本形式存储表格数据)
const arrayToCSV = (arr, delimiter = ',') => 
    arr
        .map(v => v.map(x => (isNaN(x) ? `"${x.replace(/"/g, '""')}"` : x)).join(delimiter))
        .join('\n');
