
/**
 * 创建桌面提示
*/
function showNotification(message) {
    chrome.notifications.create({
        type: 'basic',
        iconUrl: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADQAAAA0CAYAAADFeBvrAAAE4klEQVRoBe1aS0szSxAto/FBApqFiKAGBFFwEUFBXAmKK9GNoCsXrv0F/gm3Llz6A3w/MaifRIMYBd9EshAjiJqoqHloTF/O3Jswk5nMI9O5+RALZHqmanrqdFVXn+5YxBhj9IPE8oOwCFB+Af3tEf1xESrJ14jHYjHy+/20v79P8XicXC4XdXR0kM1my9cn/+0XVY63xGIx5vV62ejoKKutrWUOh4P19/ezhYUFFo/HeX9O0h/3CGEVeHp6ovn5eZqdnaX393dh5La3t6m8vJxaWlqoqakpb1HiPoeQaicnJ7SxsZEGA+8/Pj7o8PCQdnZ2CDb5Eq6Akskk3d/f0/r6Ol1cXMh8fnx8pMXFRWFuyZScHnAFFIlEhCgAUDQalbkIvc/nk0VPZmjiATdA39/fFAwGaXV1lQKBQFaXML/W1taEtMwH6+IGCJPf4/HQ5uYmfX19ZQWEEn56eioAf3l5yWqXq4ILIETn5uZGcPL29lbTl+fnZ3K73XR8fEyYdzyFC6DX11fa3d0VIqTHOUQQi+7y8jKFQiE9r+i2MQ0Izl1fX9PS0pJQ4fR+GYOAtQlMAhHmJaYAYVKHw2EhfQ4ODgz5lEgkhOIxNzdHd3d3ht5VMzbFFD4/P+n8/FyIDoBBwAZaW1upp6dHxttQto+OjoTCAdu3tzfa29ujP3/+0PDwMJWWlqr5qk8nIUIGbpLJJAsGg2xiYoLZ7XbseoU/8Lbx8XEWCoVkvYXDYTY5OZm2xTs2m40NDQ0xv98vs8/lQc4pl43iFBUVkdVqpZISefAtFougEw81b0qUEyAtiiN2OLOttJjypEQ5AVKjOKhYGHUlAopCkGLfYqA8KZFhQFoUB3o4DUaQKQAEsErCixIZBqSX4ig5rfaMFyUyBAijb4TiqAFQ0vGgRIYA6aE4AI2tgxJBVUs5AORBiXQD0ktxsNiiamWbQ1hM1cQsJdIFyAjFQYRQtXBVEqWyLbYzS4l0AVKiOGInMttYp/COWAAEIJVSUWyHtpgSZfaTaZt5L1/OMyzgCEoqNm7YmOkRnCtMTU1RXV1d2jwVZeyBtAQDgt0viGtnZ6exUyItvhSJRNjKygprb2+XcLAUd8vn1el0sunpaRaNRrXcTOtVU84MxdGKgh59LpRINeXUKI6aQzU1NTQwMKCYcltbW3R2dqb2elonpkSNjY1kt9vTuqyNdKwyGolEgl1eXrKxsTFmtVoNpZvL5WI+n0/SI7YbgUBAOB42kqZlZWWst7eXeTwehj60JGvKmaE42CZkbtawrSguLpZtH7KO9H8Ko5RIERDKaz4pjhaITL0RSqQISA/FyfxoPu+NUCIZIL0URw2A2YVVqW+9lEhS5VKLHw4BjZ7iiJ0wu7CK+0q1xZSora2NGhoaUirpVVw18EOV2+1mXV1dhqqakaplxtZisbDm5mY2MzOT9YczScohrDif1ktxpEOT/zukMs7wcNiPRVdJJIBwDoCzaaV9v9LLhXiGvRYqMAZfSSSAcEhYX1+vb0VW6u1/eFZRUUFOp5MqKysVvyYBBKO+vj4aHBwk0Je/SbBYOxwO6u7uppGREaqurlZ0rwhFQaxBSK+ursjr9dLDw4NYVdA2mEZVVZXmvwfIABXUaw4fl6Qch/4K3sUvoIKHQMOB3whpDFDB1T8uQv8APOHaT+NTawoAAAAASUVORK5CYII=',
        title: '提示',
        message: message
    }, function (id) {
        setTimeout(function () {
            chrome.notifications.clear(id);
        }, 4000);
    });
}

/**
 * 跳转添加商品/显示商品页面
*/
function handleClick(info, tab) {
    var itemId = info.menuItemId;

    Promise.all([getCurGoodsInfo(tab.id), getExtensionId()])
            .then(function (values) {
                var goodsInfo = values[0];
                var extId = values[1];

                window.open(`chrome-extension://${extId}/${itemId}/${itemId}.html?${goodsInfo}`);
            });
}

/**
 * 获取当前商品信息
*/
function getCurGoodsInfo(tabId) {
    return new Promise(function (resolve) {
        chrome.tabs.sendMessage(tabId, { type: 'GET_17GOODS_INFO' }, function (res) {
            if (typeof res !== 'object') {
                // 商品数据获取有误，提示即可
                showNotification(res || '获取商品数据出错，请稍后重试！');
            } else {
                resolve(serialize(res));
            }
        })
    });
}


/**
 * 创建右键菜单
*/
chrome.contextMenus.create({
    type: 'normal',
    title: '添加当前商品',
    id: 'add',              // 用于标示item 及 跳转路径
    contexts: ['link'],
    onclick: handleClick
});

chrome.contextMenus.create({
    type: 'separator',
    contexts: ['link'],
});

chrome.contextMenus.create({
    type: 'normal',
    title: '显示当前商品',
    id: 'show',             // 用于标示item 及 跳转路径
    contexts: ['link'],
    onclick: handleClick
});


/**
 * 轮询商品数据来更新本地数据库
*/




