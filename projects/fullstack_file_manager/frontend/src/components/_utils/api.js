
import $ from 'jquery';
import isPlainObject from 'lodash/isPlainObject';
import message from './message';

import { SUCCESS, CALLAPI_ERROR } from './errcode';

/**
 * 获取接口域名 或 ip
 * */
let hostName = window.location.hostname;
let protocol = window.location.protocol;

const hostMapApi = {
    '120.24.37.11': protocol + '//120.24.37.11:3333',             // product
    'lib.carisok.com': protocol + '//120.24.37.11:3333',          // product
    '120.236.176.180': protocol + '//120.236.176.180:3333',       // abtest
    '192.168.1.207': protocol + '//192.168.1.207:3333',           // test
    'local': protocol + '//192.168.1.207:3333',                    // local
    // 'local': protocol + '//192.168.3.103:3333',                    // local
};

let apiUrlRoot, serverHost;

if (!hostMapApi[hostName]) {
    serverHost = hostMapApi['local'];
} else {
    serverHost = hostMapApi[hostName];
}

apiUrlRoot = serverHost + '/api/';

/**
 * 定义接口地址
 * */
let apiUrl = {
    // 登录模块
    login: apiUrlRoot + 'auth/login',                   // 登录 并获取token
    logout: apiUrlRoot + 'auth/logout',                 // 取消登录
    // 品牌-车型-车系
    get_car_brand: apiUrlRoot + 'car_classification',
    // 文件模块
    get_file_list: apiUrlRoot+ 'file',                  // 获取文件列表
    del_file: apiUrlRoot + 'file/del',                  // 删除文件
    update_file: apiUrlRoot + 'file/update',            // 更新文件信息
    duplicate_file: apiUrlRoot + 'file/is_duplicate',
    // 文件上传之断点续传
    chunk_open: apiUrlRoot + 'chunk/open',              // 创建上传的文件记录
    chunk_upload: apiUrlRoot + 'chunk/upload',          // 分片上传
    chunk_close: apiUrlRoot + 'chunk/close',            // 文件上传完成，通知后台处理分片
    file_replace: apiUrlRoot + 'file/replace',
    // 文件分类
    get_type_all: apiUrlRoot + 'category?id=0',         // 获取全部一级分类(不带分页)
    get_type_a:apiUrlRoot + 'category/all',             // 获取一级分类(带分页)
    type_edit: apiUrlRoot + 'category/edit',            // 分类编辑
    get_type_children: apiUrlRoot + 'category',         // 查询子分类
    // 版块模块
    get_section_all: apiUrlRoot + 'section',            // 获取所有版块
    del_section: apiUrlRoot + 'section/del',            // 删除某个版块
    update_section: apiUrlRoot + 'section/update',      // 更新某个版块
    new_section: apiUrlRoot + 'section/new'             // 新建版块
};

/**
 * 封装接口异步调用函数
 * */
let callAPI = {
    // 获取接口服务器host
    getServerHost: () => serverHost,
    // 文件上传接口地址
    uploadServer: apiUrlRoot + 'chunk/upload',
    replaceServer: apiUrlRoot + 'file/replace'
};
const specialCode = [3000, 3001, 3003, 3004, 3005, 3006, 3007];

for (let key in apiUrl) {
    callAPI[key] = function (options) {
        if (!isPlainObject(options)) options = {};

        const callType = options.callType || 'default';          // (default done fail done&fail) 用来控制done 和 fail的执行

        options.url = apiUrl[key];
        options.timeout = options.timeout || 4000;      // 请求超时时间

        return $.ajax(options).done(res => {
            if ((callType === 'default' || callType === 'fail') && res.errcode !== SUCCESS ) {
                specialCode.indexOf(+res.errcode) < 0 && message.warn(res.errmsg);
            }
        }).fail(() => {
            // 避免手动abort有全局错误提示
            const isAbort = this.statusText === 'abort' ? true : false;
            if (callType === 'default' || callType === 'done') {
                isAbort && message.error(CALLAPI_ERROR);
            }
        });
    }
}


export default callAPI;

