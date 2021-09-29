$(function () {
    // 生成商品tr
    var genarateGoodsTr = function (data) {
        return `<tr class="${data.className || ''}">
                    <td>${data.id}</td>
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
                    <td>暂无</td>
                </tr>`;
    };

    // 建立数据库连接
    var db = new DB({ dbName: 'mapperDB', objectStoreName: 'goods' });

    // 获取商品数据
    function fetchGoodsList() {
        db.get(function (res) {
            if (res.length) {
                renderGoodsList(res);
            } else {
                message.info('暂未添加任何商品数据!');
            }
        });
    }

    // 渲染商品列表
    function renderGoodsList(lists) {
        var $tbody = $('#showDataTable tbody');

        $.each(lists, function (idx, item) {
            item.data17.id = item.id;
            item.dataTb.id = '';
            item.dataTb.className = 'taobao-goods';
            $tbody.append(genarateGoodsTr(item.data17) + genarateGoodsTr(item.dataTb));
        });
    }

    fetchGoodsList();
});