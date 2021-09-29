

/**
 * 缓存控制
 *
 * */

const sessionStorage = window.sessionStorage;
const BRAND_KEY = 'brandData';
const LINE_KEY = 'lineData';
const MODEL_KEY = 'modelData';

// 公共方法
const getStorage = (key) => {
    const jsonStr =  sessionStorage.getItem(key);
    if (jsonStr) return JSON.parse(jsonStr);

    return null;
};

const setStorage = (key, jsonObj) => sessionStorage.setItem(key, JSON.stringify(jsonObj));

const getStorageById = (key, id) => {
    var data = getStorage(key);

    if (data === null) return null;

    return data[id] || null;
}

const setStorageById = (key, id, jsonObj) => {
    var data = getStorage(key);
    var jo = {};

    if (!data) {
        jo[id] = jsonObj;
        setStorage(key, jo);
    } else {
        data[id] = jsonObj;
        setStorage(key, data);
    }
}

// ----------------------------------EXPORTS------------------------------------------------

// 品牌
export const getBrandStorage = () => { return getStorage(BRAND_KEY) }
export const setBrandStorage = (jsonObj) => { setStorage(BRAND_KEY, jsonObj) }

// 车系
export const getLineStorage = (brandId) => getStorageById(LINE_KEY, brandId)
export const setLineStorage = (brandId, jsonObj) => setStorageById(LINE_KEY, brandId, jsonObj)

// 车型
export const getModelStorage = (brandId, lineId) => {
    const id = brandId + '_' + lineId;
    return getStorageById(MODEL_KEY, id);
}
export const setModelStorage = (brandId, lineId, jsonObj) => {
    const id = brandId + '_' + lineId;
    setStorageById(MODEL_KEY, id, jsonObj);
}
