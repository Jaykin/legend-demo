/**
 * Created by Administrator on 2017/1/20.
 */
/*
* 观察者模式（有时又被称为发布（publish ）-订阅（Subscribe）模式、模型-视图（View）模式、源-收听者(Listener)模式或从属者模式）是软件设计模式的一种。
* 在此种模式中，一个目标物件管理所有相依于它的观察者物件，并且在它本身的状态改变时主动发出通知。
* 这通常透过呼叫各观察者所提供的方法来实现。此种模式通常被用来实现事件处理系统。
*
* 实现观察者模式有很多形式，比较直观的一种是使用一种“注册——通知——撤销注册”的形式
*
* 它定义对象间的一种一对多的依赖关系，当一个对象的状态发生改变时，所有依赖于它的对象都将得到通知
* */

/*特殊场景：
* 场景1：某个事件下需要绑定同一函数多次，有些不能绑定多次
* 场景2：有些需要全局Event控制，有些需要局部Event控制
* 场景3：先发布再订阅，需要存放离线事件
* 场景4：全局事件太多，可能导致命名冲突(此时需要提供创建命名空间的功能)
* */

var Event = {
    clientList: [],                     // 订阅者的缓存列表
    listen: function( key, fn ){
        if ( !this.clientList[ key ] ){
            this.clientList[ key ] = [];
        }
        this.clientList[ key ].push( fn ); // 订阅的消息添加进缓存列表
    },
    trigger: function( key, data){
        var fns = this.clientList[ key ];
        if ( !fns || fns.length === 0 ){  // 如果没有绑定对应的消息
            return false;
        }
        for( var i = 0, fn; fn = fns[ i++ ]; ){
            fn.call( this, data );         // this为触发消息的对象 var w,r = (w = 2)    // r == 2 -> true
        }
    },
    remove: function ( key, fn) {
        var fns = this.clientList[ key ];
        if ( !fns ){ // 如果 key 对应的消息没有被人订阅，则直接返回
            return false;
        }
        if ( !fn ){ // 如果没有传入具体的回调函数，表示需要取消 key 对应消息的所有订阅
            fns && ( fns.length = 0 );
        }else{
            for (var i = 0, len = fns.length; i < len; i++) {
                var _fn = fns[i];
                if (_fn === fn) {
                    fns.splice(i, 1);
                }
            }
        }
    },
    installEvent: function ( obj ) {    // 为任何对象安装发布-订阅功能(管理者即是自己)
        for ( var i in this ){
            if (i !== 'installEvent') obj[ i ] = this[ i ];
        }
    }
};


// 测试
var salesOffices = {};
Event.installEvent( salesOffices );

var func88 = function (price) {
    console.log( '价格= ' + price );
}

salesOffices.listen( 'squareMeter88', func88);
salesOffices.listen( 'squareMeter88', func88);

salesOffices.listen( 'squareMeter100', function( price ){ // 小红订阅消息
    console.log( '价格= ' + price );
});

salesOffices.trigger('squareMeter88', 200000);
salesOffices.trigger('squareMeter100', 300000);