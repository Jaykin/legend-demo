/*
*
* 抽离配置数据
*
* */

    // 配置数据
var config = {
    MSG_INVALID_VALUE: 'Invalid value',
    URL_INVALID: '/errors/invalid.php',
    CSS_SELECTED: 'selected'
}


    // 应用逻辑
function validate(value) {
    if (!value) {
        alert(config.MSG_INVALID_VALUE);
        location.href = config.URL_INVALID;
    }
}

function toggleSelected(ele) {
    var classObj = ele.classList;
    var className = config.CSS_SELECTED;

    if (classObj.contains(className)) {
        classObj.remove(className);
    } else {
        classObj.add(className);
    }
}

