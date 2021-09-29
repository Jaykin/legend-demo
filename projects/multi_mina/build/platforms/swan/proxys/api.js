const commonProxys = require('../../../core/proxys/api');
const tips = '不支持的 api';

module.exports = (ctx, client) => {
    return {
        // 'env.USER_DATA_PATH': true,
        getShareInfo: tips,

        // 界面 - 交互
        showToast: true,
        hideToast: true,
        showLoading: true,
        hideLoading: true,
        showModal: true,

        getSystemInfo: true,
        getSystemInfoSync: true,
        getNetworkType: true,
        setClipboardData: true,
        getClipboardData: true,
        setStorage: true,
        setStorageSync: true,
        getStorageSync: true,
        removeStorageSync: true,

        setNavigationBarTitle: true,
        setTabBarBadge: true,
        removeTabBarBadge: true,
        requestPayment: true,
        stopPullDownRefresh: true,
        request: true,
        showShareMenu: tips,
        hideShareMenu: true,
        pageScrollTo: true,
        getMenuButtonBoundingClientRect: true,

        createSelectorQuery: true,
        createAnimation: true,
        createCanvasContext: true,
        canvasToTempFilePath: true,

        chooseImage: true,
        previewImage: true,
        makePhoneCall: true,
        uploadFile: true,
        saveImageToPhotosAlbum: true,
        openBusinessView: true,
        downloadFile: true,
        getFileSystemManager: true,
        chooseAddress: true,
        openDocument: true,
        getImageInfo: true,
        getFileInfo: true,
        createVideoContext: true,

        getUserInfo: true,
        addCard: true,
        login: true,
        checkSession: true,
        getSetting: true,
        authorize: true,
        openSetting: true,

        navigateTo: true,
        navigateBackMiniProgram: true,
        navigateBack: true,
        redirectTo: true,
        reLaunch: true,
        switchTab: true,
    };
};