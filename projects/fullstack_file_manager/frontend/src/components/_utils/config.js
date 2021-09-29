

/**
 * 抽离出来的应用配置数据
 *
 * */


/**
 * 路由相关：
 *
 * */
export const paths = {
    ROUTE_ROOT: {
        route: '/',
        des: '汽修资料库',
        defaul: 'ROUTE_DATALIST'
    },
    ROUTE_DATALIST: {
        route: 'datalist',
        des: '汽修资料列表'
    },
    ROUTE_TYPEMANAGE: {
        route: 'typemanage',
        des: '类型管理'
    },
    ROUTE_SECMANAGE: {
        route: 'secmanage',
        des: '板块管理'
    },
    ROUTE_FILEUPLOAD: {
        route: 'fileupload',
        des: '文件上传'
    },
}


/**
 * 侧边导航相关
 *
 * */
export const sides = {
    "menus": {
        'sub1': {
            "id": "sub1",
            "des": paths.ROUTE_ROOT.des,
            "subs": ["datalist", "typemanage", "secmanage"]
        }
    },
    "subs": {
        "datalist": { idx: 0, menuId: 'sub1', "route": "/" + paths.ROUTE_DATALIST.route, "des": paths.ROUTE_DATALIST.des },
        "typemanage": { idx: 1, menuId: 'sub1', "route": "/" + paths.ROUTE_TYPEMANAGE.route, "des": paths.ROUTE_TYPEMANAGE.des },
        "secmanage": { idx: 2, menuId: 'sub1', "route": "/" + paths.ROUTE_SECMANAGE.route, "des": paths.ROUTE_SECMANAGE.des }
    }
}


/**
 * 位置相关
 * */

/* positions结构
 * {
 *   '/datalist': {
 *       items: ['汽修资料库', '汽修资料列表']
 *       routes: ['/', '/datalist']
 *   },
 *   ...
 * }
 * */
export const positions = (function () {
    let ret = {};

    for (let k in paths) {
        let curPath = '/' + paths[k].route;

        if (paths[k].route !== '/') {
            ret[curPath] = {
                items: [paths.ROUTE_ROOT.des, paths[k].des],
                routes: ['/', '/' + paths[k].route]
            }
        } else {
            let defaul = paths[paths[k].defaul];

            ret[curPath.slice(-1)] = {
                items: [paths[k].des, defaul.des],
                routes: ['/', '/' + defaul.route]
            }
        }
    }

    return ret;
})();


/**
 * 支持的能上传的文件格式
 *
 * */

export const exts = ["txt", "jpg", "jpeg", "png", "gif", "doc",
    "docx", "xls", "xlsx", "ppt", "pptx", "wps", "pdf",
    "zip", "rar", "7z", "mp4", "DAT", "mpeg", "mpe", "mpg",
    "avi", "rmvb", "mkv", "mov"
];
export const mimes = [
    "text/plain",
    "image/jpeg",
    "image/png",
    "image/gif",
    ".docx",
    "application/msword",                           // doc
    ".pptx",
    "application/vnd.ms-powerpoint",                // ppt
    "application/pdf",                              // pdf
    "application/vnd.ms-works",                     // wps
    ".wps",                                         // wps
    ".xlsx",
    "application/vnd.ms-excel",                     // xls
    "application/zip",                              // zip
    ".zip",
    "application/x-rar-compressed",                 // rar
    ".rar",
    "application/x-7z-compressed",                  // 7z
    ".7z",
    "video/mp4",                                    // mp4
    ".DAT",                                         // DAT
    "video/mpeg",                                   // mpeg mpg mpe
    ".mpg",
    ".mpe",
    "video/x-msvideo",                              // avi
    // "audio/x-pn-realaudio",                         // rmvb
    ".rmvb",
    // "video/x-matroska",                             // mkv
    ".mkv",
    // "video/quicktime",                              // mov
    ".mov"
]
