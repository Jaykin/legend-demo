$(function () {
    // 获取query数据
    var queryObj = parse(location.search);

    // 定义17 和 淘宝数据结构
    var dataFor17 = queryObj;
    var dataForTaoBao = null;

    // 生成商品tr
    var genarateGoodsTr = function (data) {
        var actEl = '';

        if (data.action === 'connect') {
            actEl = '<button id="connectTabBaoGoods" class="ui primary button">关联淘宝商品</button>';
        } else if (data.action === 'done') {
            actEl = '<button id="doneTabBaoGoods" class="ui primary button">确定添加商品</button>'
        }

        return `<tr class="${data.className}">
                    <td>${data.goodsId}</td>
                    <td>${data.goodsSrc}</td>
                    <td>
                        <img src="http:${data.goodsImgUrl}" alt="商品主图" class="goods-image">
                    </td>
                    <td>${data.keyWords}</td>
                    <td>${data.tradePrice}</td>
                    <td>${data.taobaoPrice}</td>
                    <td>${data.stock}</td>
                    <td>${data.onSaleTime}</td>
                    <td>
                        <a href="${data.goodsUrl}" target="_blank">客官,用力点我</a>
                    </td>
                    <td>${actEl}</td>
                </tr>`;
    };

    // 生成17商品信息表格行
    $('#addDataTable tbody').append(genarateGoodsTr(queryObj));

    // 关联淘宝商品信息表格行
    var getTaobaoGoodsInfo = function (url) {
        // 依据url获取已打开的淘宝链接的tabId
        var promise = new Promise(function (resolve, reject) {
            chrome.tabs.query({
                url: url
            }, function (tabs) {
                tabs && tabs[0] ? resolve(tabs[0].id) : reject('获取淘宝商品页面的tabId出错, 请重试!');
            });
        });

        return promise.then(function (tabId) {
            return new Promise(function (resolve, reject) {
                chrome.tabs.sendMessage(tabId, { type: 'GET_TAOBAO_GOODS_INFO' }, function (res) {
                    typeof res === 'string' ? reject(res) : resolve(res);
                });
            });
        }, function (info) {
            return Promise.reject(info);
        });
    }

    function btnLoading(action) {
        var $btn = $('.modals .ok');

        if (action === 'show') {
            $btn.addClass('disabled loading');
        } else {
            $btn.removeClass('disabled loading');
        }
    }

    $(document).on('click', '#connectTabBaoGoods', function () {
        var modal = $('.ui.modal').modal({
            onDeny: function () {
                message.info('已取消添加商品！');
            },

            onApprove: function() {
                var goodsUrl = $('#linkInput').val();

                if (!goodsUrl) {
                    message.warning('请输入完整淘宝商品链接地址！');

                    return false;
                }

                btnLoading('show');
                getTaobaoGoodsInfo(goodsUrl).then(function (data) {
                    // 生成淘宝商品信息表格行
                    $('#addDataTable tbody').append(genarateGoodsTr(data));
                    dataForTaoBao = data;

                    btnLoading('hide');
                    modal.modal('hide');
                    $('#connectTabBaoGoods').remove();
                }, function (info) {
                    btnLoading('hide');
                    message.error(info);
                });

                return false;
            }
        });

        // 显示modal
        modal.modal('show');
    });

    // 确定添加商品
    $(document).on('click', '#doneTabBaoGoods', function () {
        var db = new DB({ dbName: 'mapperDB', objectStoreName: 'goods' });

        db.save({
            data17: dataFor17,
            dataTb: dataForTaoBao
        }, function () {
            message.success('添加商品成功！');
        });
    });
});
