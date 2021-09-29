const event = {
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

export default event;
