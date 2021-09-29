
$(function () {
    // 01 Backbone.Events（事件）
    console.log('----------------------01 Backbone.Events（事件）---------------------------');
    var _this = 'context:_this';
    var proxy = { proxy: 'is me' };

    _.extend(proxy, Backbone.Events);
    // 单个事件
    proxy.on('say', function (data) {
        console.log(data);
        console.dir(this);
    }, _this);
    proxy.trigger('say', [1, 2, 3]);

    // 多个事件
    proxy.on('e1 e2 e3', function () {});

    // 多个事件映射
    proxy.on({
        'e001': function () { console.log('trigger e001') },
        'e002': function () { console.log('trigger e002') },
        'e003': function () { console.log('trigger e003') }
    });
    proxy.trigger('e001 e002 e003');

    // 监听另外对象上的事件
    var proxyOther = {};
    _.extend(proxyOther, Backbone.Events);

    proxy.listenTo(proxyOther, 'others', function (data) {
        console.log('触发了proxy的回调，传来的信息是：' + data);
    })

    proxyOther.trigger('others', 'hello im proxyOthers');

    // Backbone的内置事件


    // 02 Backbone.Model（模型）
    console.log('----------------------02 Backbone.Model（模型）---------------------------');
    // 创建Model实例
    var SubModel = Backbone.Model.extend({
        constructor: function (data) {
            this.info = data;
            console.log('constructor: ');
            Backbone.Model.apply(this, arguments);
        },
        initialize: function () {
            console.log('initialize：' + arguments);
        },
        defaults: function () {
            return {
                defauValue: 'this is default value'
            }
        },
        idAttribute: '_id'
    });

    var model = new SubModel({
        attr: 'attr test',
        _id: 'im _id o',
        func: function () {
            console.log('im attributes of function!');
        }
    });
    console.dir(SubModel);
    console.dir(model);
    console.log(model.get('attr'));
    console.log('this is model id: ' + model.id);
    model.get('func')();
    console.log(model.toJSON());

    proxy.listenTo(model, {
        'change': function () { console.log('handle model change') },
        'change:attr': function () { console.log('handle model change:attr') }
    })

    model.set({
        'attr': 'attr changed'
    }, {
        silent: true
    });


    // 03 Backbone.Collection（集合）
    console.log('----------------------03 Backbone.Collection（集合）---------------------------');

    var SubCollection = Backbone.Collection.extend({
        model: SubModel,
    });

    var collection = new SubCollection([
        { name: 'jay' },
        { name: 'vivian' }
    ]);
    var model003 = { name: 'our son' }
    collection.add(model003);
    console.dir(SubCollection);
    console.dir(collection);

    // 04 Backbone.View（视图）


})