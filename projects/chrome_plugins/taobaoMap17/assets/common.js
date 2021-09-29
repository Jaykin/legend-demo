/**
 * 获取当前扩展的ID (异步)
 * 
*/
function getExtensionId() {
    return new Promise(function (resolve) {
        chrome.management.getSelf(function (extensionInfo) {
            resolve(extensionInfo.id);
        })
    });
}

/**
 * 序列化query
*/
function serialize(query) {
    if (!query) {
        return '';
    }

    var search = '';

    for (var key in query) {
        if (query.hasOwnProperty(key)) {
            var value = query[key];
            // 如果`value`是数组，其`toString`会自动转为逗号分隔的字符串
            search += '&' + encodeURIComponent(key) + '=' + encodeURIComponent(value);
        }
    }

    return search.slice(1);
}

/**
 * 解析url的query
*/
function parse(query){
    if (!query) {
       return '';
   }
   var index = query.indexOf('?')
   var querylength = query.length;

   query = index >= 0 ? query.slice(index + 1, querylength) :query;

   var queryObject = {};
   var search = query.split('&');

   for(var i = 0,len = search.length; i < len; i++){
       var searchSplit = search[i].split('=');
       var key = searchSplit[0],
           value = searchSplit[1];

       queryObject[key] = decodeURIComponent(value); 
   }

   return queryObject;
}


/**
 * @param { Date } date - 日期对象
 * @return { String } - 日期字符串，如：2017-08-24 11:15:34
 * */
function formatDate(date) {
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    var hour = date.getHours();
    var min = date.getMinutes();
    var second = date.getSeconds();

    return year + '-' + (month>=10?month:'0'+month) + '-' + (day>=10?day:'0'+day) + ' ' + (hour>=10?hour:'0'+hour) + ':' + (min>=10?min:'0'+min) + ':' + (second>=10?second:'0'+second);
}

/**
 * 全局提示
*/
var message = (function () {
    var timeer = null;
    var showMessage = function (data) {
        var $msg = $('.message.global-message');

        if ($msg.length) {
            $msg.removeClass()
                .addClass(`ui message global-message ${data.type}`)
                .find('span').text(data.content);
        } else {
            $('body').append(`
                <div class="ui ${data.type} message global-message">
                    <i class="close icon"></i>
                    <span>${data.content}</span>
                </div>`
            );

            // 手动关闭提示
            $(document).on('click', '.message .close', function () {
                var $this = $(this);

                $this.closest('.global-message').transition('fade');
                $this.siblings('span').text('');
                clearTimeout(timeer);
            });
        }

        // 自动关闭提示
        clearTimeout(timeer);
        timeer = setTimeout(function () {
            $('.global-message').transition('fade');
        }, 2000);
    };

    return {
        info: function (content) {
            showMessage({ type: 'info', content: content });
        },
        warning: function (content) {
            showMessage({ type: 'warning', content: content });
        },
        error: function (content) {
            showMessage({ type: 'negative', content: content });
        },
        success: function (content) {
            showMessage({ type: 'positive', content: content });
        }
    }
})();