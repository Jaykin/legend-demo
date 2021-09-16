

    var assert = require('../assets/assert.js');
    var deepClone = require('../assets/deepClone.js');

    Math.guid = function () {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            //console.log(c, r, v, v.toString(16));
            return v.toString(16);
        }).toUpperCase();
    }
    /**
     * 模型和数据
     * */

        /*
        * 模型：是对象，但被当做构造函数使用（所以需要提供接口进行继承和实例化）
        *
        * */

    // 01 基础模型
    var Model = {
        inherited: function (newModel) {
            // 进行继承后的回调（模型继承模型 / 实例继承模型）
            console.log('inherited!');
        },

        created: function () {
            // 创建新模型后的回调，为新模型定义自己的属性
            this.records = {/*持久化记录*/};
            this.attributes = [/*需要序列化的属性*/];
        },

        find: function (id) {
            // 查找持久化记录
            var record = this.records[id];

            if (!record) throw('unknow record ID！');

            return record.deepClone();
        },

        prototype: {
            // 定义模型的基础原型
            init: function (opts) {
                // 初始化模型实例
                for (var k in opts) {
                    this[k] = opts[k];
                }

                return this;
            },

            // 持久化记录
            create: function () {
                if (!this.id) this.id = Math.guid();
                this.newRecord = false;
                this.parent.records[this.id] = this;
            },

            update: function () {
                //this.id = Math.guid();
                this.parent.records[this.id] = this;
            },

            save: function () {
                this.newRecord ? this.create() : this.update();
            },

            destroy: function () {
                delete this.parent.records[this.id];
            },

            deepClone: function () {
                return deepClone(this);
            },

            // 本地存储
            attributes: function () {
                // 构建存储的数据结构
                var ret = {};
                var attrs = this.parent.attributes;
                var attr;

                for (var i in attrs) {
                    attr = attrs[i];
                    ret[attr] = this[attr];
                }

                return ret;
            }
        },

        create: function () {
            // 创建继承Model的模型对象
                // 01 创建继承model的模型
            var model = Object.create(this);
                // 02 定义新模型的父模型对象
            model.parent = this;
                // 03 定义新模型的原型对象
            model.prototype = model.fn = Object.create(this.prototype);
                // 04 调用回调
            model.created();
            this.inherited(model);

            return model;
        },

        init: function () {
            // 创建模型的实例
            var instance = Object.create(this.prototype);
            instance.parent = this;
            instance.newRecord = true;
            this.inherited(instance);
            instance.init.apply(instance, arguments);

            return instance;
        },

        include: function (origin) {
            // 添加Model原型属性
            var included = origin.included;

            for (var k in origin) {
                this.prototype[k] = origin[k];
            }

            included && included(this);
        },

        exclude: function (origin) {
            // 添加Model对象属性
            var excluded = origin.excluded;

            for(var k in origin) {
                this[k] = origin[k];
            }

            excluded && excluded(this);
        },

        populate: function(values){
            // 重置 model 和 records
            this.records = {};
            for (var i=0, il = values.length; i < il; i++) {
                var record = this.init(values[i]);
                record.newRecord = false;
                this.records[record.id] = record;
            }
        },

        // 本地存储
        saveLocal: function (name) {
            var ret = [];
            for (var k in this.records) {
                ret.push(this.records[k]);
            }

            localStorage[name] = JSON.stringify(ret);
        },
        loadLocal: function (name) {
            var ret = JSON.parse(localStorage[name]);
            this.populate(ret);
        }
    }

    // 02 自己改造版
    var utils = {
        guid: function () {
            return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
                var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
                return v.toString(16);
            }).toUpperCase();
        }
    }

    var Model = {
        records: { /*持久化记录*/ },
        prototype: {
            // 定义模型实例共享的属性
            init: function (opts) {
                // 初始化模型实例
                for (var k in opts) {
                    this[k] = opts[k];
                }

                return this;
            },

            record: function () {
                var id = this.id;
                var records = this.parent.records;

                if (!id) this.id = utils.guid();

                //if (!records) records = this.parent.records = {};
                records[id] = this;
            },

            destroy: function () {
                delete this.parent.records[this.id];
            },


        },
        find: function (id) {
            var record = this.records[id];

            if (!record) { throw 'unknow record id!'; }

            return record;
        },
        create: function () {
            // 创建子模型
            var model = Object.create(this);
            model.parent = this;
            model.records = { /*持久化记录*/ };
            model.fn = model.prototype = Object.create(this.prototype);

            return model;
        },
        instance: function () {
            // 创建模型实例
            var instance = Object.create(this.prototype);
            instance.parent = this;
            instance.init.apply(instance, arguments);

            return instance;
        },
        include: function (opts, callback) {
            // 为模型对象的原型添加属性（支持回调）
            for (var k in opts) {
                this.prototype[k] = opts[k];
            }

            callback && callback(this);
        },
        exclude: function (opts, callback) {
            // 为模型对象添加静态属性（支持回调）
            for (var k in opts) {
                this[k] = opts[k];
            }

            callback && callback(this);
        }
    }

    // 03 构造函数版
    var Model = function (type) {
        var args = Array.prototype.slice.call(arguments, 1);

        if (type === 'instance') {
            return new Instance(args);
        } else {
            return new SubModel(args);
        }
    }

    var Instance = function () {}
    var SubModel = function () {}

    SubModel.prototype.find = function () {};
    SubModel.prototype.create = function () {};
    SubModel.prototype.instance = function () {};
    SubModel.prototype.include = function () {};
    SubModel.prototype.exclude = function () {};

    Instance.prototype.init = function () {};
    Instance.prototype.record = function () {};
    Instance.prototype.destroy = function () {};

    // 测试 ORM

    var Asset = Model.create();

    var asset = Asset.init();
    asset.name = "same, same";
    asset.save();

    var asset2 = Asset.init();
    asset2.name = "but different";
    asset2.save();
    assert.assertEqual( Asset.find(asset.id).name, "same, same" );
    asset2.destroy();

    console.log(Asset);