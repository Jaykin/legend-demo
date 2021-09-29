

/**
 * 接口返回的状态码：errCode
 * */


// 1~990 通用错误
// 1000~1990 类型模块错误码
// 2000~2999 板块模块错误码
// 3000~3999 文件模块错误码
// 4000~4999 chunk 模块错误码

export const SUCCESS = 0;                           // 接口访问成功
export const UNDEFINED_ERROR = 99;                  // '参数错误 or 未定义的错误'
export const AUTH_UNVALID = 106;                    // '用户未登录/认证失败'
export const AUTH_USER_NOT_FOUND = 107;             // '用户不存在'
export const FILE_SAME_NAME = 3000;                 // '存在同名文件'
export const FILE_ALL_SAME = 3001;                  // '该在同分类，板块，品牌下，该文件名已经存在'
export const FILE_NOT_EXIST = 3002;                 // '文件不存在'
export const FILE_EXIST = 3003;                     // '该文件已经上传'
export const FILE_DELETED = 3004;                   // '文件已经被删除'
export const FILE_IN_PROGRESS = 3005;               // '该文件正在上传中'
export const FILE_NEW_RECORD = 3006;                // '文件 md5 重复，已经创建新记录'
// 同 md5 的文件，正在上传中。两边不能同时上传。
export const FILE_SAME_FILE_IN_PROGRESS = 3007;     // '相同指纹的文件正在上传中，请稍后重试'
export const SECTION_NAME_EXIST = 2000;             // '该板块名称已经存在'
export const SECTION_TARGET_NOT_EXIST = 2001;       // '板块 id 不存在'
export const CATEGORY_NOT_FOUND = 1000;             // '分类 id 不存在'
export const CATEGORY_EXIST = 1001;                 // '分类已经存在'
export const CATEGORY_UPDATE_NAME_DUPLICATE = 1002; // '更新分类中，有名称重复'
export const CATEGORY_CREATE_NAME_DUPLICATE = 1003; // '批量创建分类中，有名称重复'
export const CHUNK_EXIST = 4000;                    // '该分片已经存在'
export const CHUNK_UNMATCH = 4001;                  // '分片 md5 无法对应'
export const CHUNK_MD5_INVALID = 4002;              // '分片 md5 校验失败，请重传该分片'


/**
 *  全局提示信息
 * */

export const CALLAPI_ERROR = '网络出错，请稍后重试！';
export const CALLAPI_FAIL = '后台数据状态有误，请稍后重试！';
