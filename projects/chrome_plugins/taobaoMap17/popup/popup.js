/**
 * 点击跳转事件
*/
$('#actListWrap').on('click', '.action-item', function () {
    var _this = this;

    getExtensionId().then(function (extId) {
        var href = $(_this).data('href');
        var url = `chrome-extension://${extId}/${href}/${href}.html`;

        window.open(url);
    });
});
