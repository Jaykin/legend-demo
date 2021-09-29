const _ = require('lodash');
const CODE = require('./code');


const errcode = {
    [CODE.UNDEFINED_ERROR]: '参数错误 or 未定义的错误',

    [CODE.AUTH_UNVALID]: '用户未登录/认证失败',
    [CODE.AUTH_USER_NOT_FOUND]: '用户不存在',

    [CODE.FILE_ALL_SAME]: '该在同分类，板块，品牌下，该文件名已经存在',
    [CODE.FILE_SAME_NAME]: '存在同名文件',
    [CODE.FILE_NOT_EXIST]: '文件不存在',
    [CODE.FILE_EXIST]:'该文件已经上传',
    [CODE.FILE_IN_PROGRESS]:'该文件正在上传中',
    [CODE.FILE_DELETED]:'文件已经被删除',
    [CODE.FILE_NEW_RECORD]:'文件 md5 重复，已经创建新记录',
    [CODE.FILE_SAME_FILE_IN_PROGRESS]:'相同指纹的文件正在上传中，请稍后重试',

    [CODE.SECTION_NAME_EXIST]: '该板块名称已经存在',
    [CODE.SECTION_TARGET_NOT_EXIST]: '板块 id 不存在',

    [CODE.CATEGORY_NOT_FOUND]: '分类 id 不存在', // update 的时候，增加子分类，会先查询 parent 是否存在
    [CODE.CATEGORY_EXIST]: '分类已经存在', // 同样的分类名称，同样的 parent_id
    [CODE.CATEGORY_UPDATE_NAME_DUPLICATE]: '更新分类中，有名称重复',
    [CODE.CATEGORY_CREATE_NAME_DUPLICATE]: '批量创建分类中，有名称重复',

    [CODE.CHUNK_EXIST]:'该分片已经存在',
    [CODE.CHUNK_UNMATCH]:'分片 md5 无法对应',
    [CODE.CHUNK_MD5_INVALID]:'分片 md5 校验失败，请重传该分片'
};

const resResolve = (code, data = {}, msg) => {
    return ({
        errcode: code,
        errmsg: errcode[code] || msg,
        data
    });
};

const responseError = (code, extraMsg = '') => {
    const emsg = _.isString(extraMsg) ? extraMsg : JSON.stringify(extraMsg);

    return ({
        errcode: code,
        errmsg: extraMsg ? `${errcode[code]}:${emsg}` : errcode[code]
    });
};

const responseSuccess = (code, data) => {
    return ({
        errcode: code,
        data
    });
};

exports.resResolve = resResolve;
exports.responseError = responseError;
exports.responseSuccess = responseSuccess;
exports.errcode = errcode;
