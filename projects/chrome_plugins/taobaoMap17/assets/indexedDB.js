
/**
  * indexedDB数据库
 */
function DB(options) {
    this.dbName = options.dbName || 'indexedDB',                       // 数据库名  
    this.version = options.version || 1;                               // 数据库版本  
    this.objectStoreName = options.objectStoreName || 'store';         // object store 名称
    this.instance = {};                                                // 数据库实例
}

    // 连接/创建
DB.prototype.open = function (cb) {
    var _this = this;
    var request = window.indexedDB.open(_this.dbName, _this.version);

    request.onsuccess  = function (e) {
        _this.instance = request.result;
        _this.instance.onerror = _this.errorHandler;
        cb && cb();
    };
    request.onupgradeneeded  = function (e) {
        _this.upgrade(e.target.result, _this.objectStoreName);
    };
    request.onerror = _this.errorHandler;
}

    // 创建object store
DB.prototype.upgrade = function (db, name) {
    var names = db.objectStoreNames;
     
    if (!names.contains(name)) {
        db.createObjectStore(name, {
            keyPath: 'id',
            autoIncrement: true
        });
    }    
}

    // 错误处理
DB.prototype.errorHandler = function (error) {
    window.alert('error: ' + error.target.code);
}    

    // 获取object store
DB.prototype.getObjectStore = function (mode) {
        // 三种模式 readonly readwrite 版本变更
    var transaction, objectStoreName = this.objectStoreName;

    mode = mode || 'readonly';
    transaction = this.instance.transaction([objectStoreName], mode);

    return transaction.objectStore(objectStoreName);
}    

    // 获取数据
DB.prototype.get = function (id, cb) {
    var _this = this;

    _this.open(function () {
        var store = _this.getObjectStore(),
            request;

        if (typeof id === 'function') {
            // 获取所有数据
            cb = id;
            request = store.getAll();
        } else {
            request = store.get(parseInt(id));
        }    

        request.onsuccess = function (e) {
            cb && cb(e.target.result);
        }    
    });
}    

    // 存储数据
DB.prototype.save = function (data, cb) {
    var _this = this;

    // TODO:未添加查重功能
    _this.open(function () {
        var store, request;

        store = _this.getObjectStore('readwrite');
        request = data.id ? store.put(data) : store.add(data);
        request.onsuccess = cb;
    });
}    

    // 删除数据
DB.prototype.remove = function (id, cb) {
    var _this = this;

    _this.open(function () {
        var store, request;
        
        store = _this.getObjectStore('readwrite');
        request = store.delete(id);
        request.onsuccess = cb;
    });
}    