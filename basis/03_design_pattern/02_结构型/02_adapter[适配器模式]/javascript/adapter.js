/**
 * 适配器模式
 * 
 * 概述：又称包装器（wrapper），虽然理解简单，但是要完美的实现好还是有难度的（可参考一些游戏适配库来深入学习）
 * 适用场景：解决两个软件实体间的接口不兼容的问题
 *         即在不修改原实体的前提下，对原实体进行兼容，使其能符合预期
 * 分类：
 *  - 接口适配
 *  - 数据结构适配
*/

/**
 * 接口适配
 * 目的：兼容不同接口调用方式 或 名称，生成统一的输出
*/

// 01 - 函数
// 适配者
function sum(v1, v2) {
    return v1 + v2;
}

// 适配器
function add(v1, v2) {
    return sum(v1, v2);
}

// 客户端 - 使用者
var result = add(1, 2);

// 02 - 简单对象，考虑对象内的内容即可
var googleMap = {
    name: 'google地图',
    show: function () {
        console.log(`渲染${this.name}`);
    }
};

var baiduMap = {
    name: '百度地图',
    display: function () {
        console.log(`渲染${this.name}`);
    }
}

function renderMap(map) {
    map.show();
}

function baiduMapAdapter(baiduMap) {
    return {
        ...baiduMap,
        show: function () {
            return baiduMap.display.apply(this, arguments);
        }
    }
}

var baiduMapFB = baiduMapAdapter(baiduMap);
renderMap(baiduMapFB);

// 03 - 类 - 需要考虑实例属性 和 原型属性
function GoogleMap() {
    this.name = 'google地图';
}
GoogleMap.prototype.show = function () {
    console.log(`渲染${this.name}`);
}
var googleMap = new GoogleMap();

function BaiduMap() {
    this.name = '百度地图';
}
GoogleMap.prototype.display = function () {
    console.log(`渲染${this.name}`);
}
var baiduMap = new BaiduMap();

function baiduMapAdapter() {

}

var baiduMap = baiduMapAdapter();
renderMap(baiduMap);

/**
 * 数据结构适配
 * 目的：兼容不同的数据结构，形成统一的结构
*/
function getGdCity() {
    var gdCity = [{
        name: 'shenzhen',
        id: 11,
    }, {
        name: 'guangzhou',
        id: 12,
    }];

    return gdCity;
}

var newGdCity = {
    shenzhen: 11,
    guangzhou: 12,
    zhuhai: 13 
}

function addressAdapter(newGdCity) {
    var address = [];

    for (var key in newGdCity) {
        address.push({
            name: key,
            id: newGdCity[key]
        });
    }

    return function () {
        return address;
    }
}

var newGetGdCity = addressAdapter(newGdCity);

