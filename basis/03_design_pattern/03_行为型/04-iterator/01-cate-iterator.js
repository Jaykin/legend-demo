


    /*
    *
    * 迭代器种类
    *
    * */

    // 01 自定义迭代器

    var myForEach = function (array, callback) {
        if (typeof array !== 'object' && !array.length) return array;

        for (var i = 0, len = array.length; i < len; i++) {
            callback && callback.call(array[i], i, array[i]);
        }
    }


    // 02 内部迭代器
        // 需求：判断两个数组的元素值是否完全相等

    var isEqualForArray = function (array1, array2) {
        var hasDiff = false;

        if (array1.length === array2.length) return false;

        myForEach(array1, function (idx, item) {
            if (item !== array2[i]) {
                hasDiff = true;
            }
        });

        return !hasDiff;
    }


    // 03 外部迭代器
    var iterator = function (array) {
        var current = 0;

        return {
            next: function () {
                current += 1;
            },
            getCurrItem: function () {
                return array[current];
            },
            getLength: function () {
                return array.length;
            },
            isDone: function () {
                return current >= array.length;
            }
        }
    }

    var isEqual = function (itr1, itr2) {
        var hasDiff = false;

        if (itr1.getLength() !== itr2.getLength()) return false;

        while(!itr1.isDone() && !itr2.isDone()) {
            if (itr1.getCurrItem() !== itr2.getCurrItem()) {
                hasDiff = true;
            }

            itr1.next();
            itr2.next();
        }

        return !hasDiff;
    }

    var iterator01 = iterator([1, 2, 3]);
    var iterator02 = iterator([1, 2, 3, 4]);

    console.log(isEqual(iterator01, iterator02));


    // 04、迭代类数组 和 普通对象
    var each = function (obj, callback) {
        var value,
            i = 0,
            len = obj.length,
            isArray = function (obj) {
                return obj.length >= 0 &&
                    Object.keys(obj).every(function (item) {
                        return Number(item) >= 0
                    });
            };

        if (isArray) {
            for (; i < len; i++) {
                value = callback.call(obj[i], i, obj[i]);

                if (value === false) break;
            }
        } else {
            for (i in obj) {
                value = callback.call(obj[i], i, obj[i]);

                if (value === false) break;
            }
        }

        return obj;
    }

    // 05 倒序迭代器
    var reverseEach = function (array, callback) {
        for (var i = array.length - 1; i >= 0; i--) {
            callback && callback(i, array[i]);
        }
    }

    // 06 中止迭代器
    var each = function( ary, callback ){
        for ( var i = 0, l = ary.length; i < l; i++ ){
            if ( callback( i, ary[ i ] ) === false ){ // callback 的执行结果返回 false，提前终止迭代
                break;
            }
        }
    };