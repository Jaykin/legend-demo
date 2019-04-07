/** 
 * 用来创建模型的对象（ES5版本）
*/

// 生成全局唯一ID（GUID）
function getGuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (char) {
        const random = Math.random() * 16 | 0;
        const val = char === 'x' ? random : (random & 0x3 | 0x8);
        return val.toString(16);
    }).toUpperCase();
}

const Model = {
    // 供模型实例继承使用
    prototype: {
        // 创建实例 还是 更新实例
        save: function () {
            this.isNewRecord ? this.create() : this.update();
        },
        create: function () {
            if (!this.id) {
                this.id = getGuid();
            }
            this.isNewRecord = false;
            this.parent.records[this.id] = this;
        },
        destory: function () {
            delete this.parent.records[this.id];
        },
        update: function () {
            this.parent.records[this.id] = this;
        },
        // 初始化实例关联的数据
        init: function (data) {
            this.data = data;
        },

        // 获取设置为序列化的数据
        attributes: function () {
            let result = {};
            const attrs = this.parent.attrs;

            for (let k in attrs) {
                const attr = attrs[k];

                result[attr] = this.data[attr];
            }
            
            result.id = this.id;
            return result;
        },
        toJSON: function () {
            return this.attributes();
        },

        // 更新远程服务器的记录
        createRemote: function (url, cb) {

        },
        updateRemote: function (url, cb) {

        }
    },

    // 创建新模型
    create: function (opts) {
        const obj = Object.create(this);

        obj.parent = this;
        // 持久化模型实例
        obj.records = {};
        // 配置需要序列化的属性
        obj.attrs = opts.attrs || [];
        // 原型继承
        obj.prototype = Object.create(this.prototype);
        // 创建模型完成的回调
        obj.created();

        return obj;
    },
    // 创建模型完成的回调
    created: function () {
        console.log('新模型创建完成：', this);
    },
    // 创建模型实例(继承模型)
    init: function () {
        const instance = Object.create(this.prototype);

        instance.parent = this;
        // 初始化实例关联的数据
        instance.init.apply(instance, arguments);
        // 持久化存储实例
        instance.save();

        return instance;
    },
    // 添加模型属性
    extend: function (obj) {
        Object.assign(this, obj);
    },
    // 添加模型实例属性
    include: function (obj) {
        Object.assign(this.prototype, obj);
    },

    // 通过ID查找模型实例
    find: function (id) {
        return this.records[id] || null;
    },

    // 批量创建模型实例
    populate: function (values) {
        const length = values.length;
        this.records = {};

        for (let i = 0; i < length; i++) {
            this.init(values[i]);
        }
    },

    // 将模型的记录本地存储
    saveLocal: function (name) {
        let result = [];
        const records = this.records;

        for (let k in records) {
            result.push(records[k]);
        }

        localStorage.setItem(name, JSON.stringify(result));
    },

    // 从本地存储加载模型数据
    loadLocal: function (name) {
        const result = JSON.parse(localStorage.getItem(name));
        // 批量创建模型实例
        this.populate(result);
    },
}



// 生成新模型
const User = Model.create({
    attrs: ['name', 'age']
});

// 生成模型实例
const user = User.init();
// 批量生成模型记录
User.populate([{
    name: 'jay',
    age: 18
}, {
    name: 'vivian',
    age: 16
}]);

console.log('User', User);
console.log('user', user);