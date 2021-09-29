/**
 * 获取商品数据
 * 
*/
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    var type = message.type;
    var res = {}, queryObj = parse(location.search);

    if (type === 'GET_17GOODS_INFO') {
        res = {
            goodsId: queryObj.GID || queryObj.gid,
            goodsSrc: '17网',
            goodsImgUrl: $('.goods-page-image-container .goods-page-image-content img').attr('src'),
            tradePrice: $('.goods-price-container .goods-price .dollar').text(),
            taobaoPrice: $('.goods-browse-container .goods-taobao-price del').text().replace(/\￥/g, ''),
            keyWords: $('.goods-page-show-container .goods-page-show-title').text(),
            onSaleTime: $('.goods-all-parameter-container .parameter-item-show').text(),
            stock: $('.stock-num-container .stock-num').text(),
            goodsUrl: location.href,
            action: 'connect'
        };
    } else if (type === 'GET_TAOBAO_GOODS_INFO') {
        res = {
            goodsId: queryObj.id,
            goodsSrc: '淘宝网',
            goodsImgUrl: $('.tb-gallery .tb-main-pic img').attr('src'),
            tradePrice: '无',
            taobaoPrice: $('.tb-detail-price .tb-rmb-num').text(),
            keyWords: $('.tb-title .tb-main-title').text(),
            onSaleTime: formatDate(new Date()),
            stock: $('.tb-amount .tb-count').text(),
            goodsUrl: location.href,
            action: 'done'
        }
    }

    // 校验商品数据
    $.each(res, function (key, value) {
        if (!value) {
            res = '获取商品数据出错，请稍后重试！';
            return false;
        }
    });

    sendResponse(res);
});
