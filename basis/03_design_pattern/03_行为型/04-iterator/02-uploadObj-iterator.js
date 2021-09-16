




    /*
    *
    * 文件上传 方法的迭代选择
    *
    * */

    var getActiveUploadObj = function () {
        try {
            return new ActiveXObject('TXFTNActiveX.FTNUpload');
        } catch (e) {
            return false;
        }
    }

    var isSupportFlash = function () {
        return false;
    }
    var getFlashUploadObj = function () {
        if (isSupportFlash()) {
            var objectDiv = document.createElement('div');

            objectDiv.innerHTML = '<object type="application/x-shockwave-flash"></object>';
            document.body.appendChild(objectDiv);

            return objectDiv;
        }

        return false;
    }

    var getFormUploadObj = function () {
        var inputDiv = document.createElement('div');

        inputDiv.innerHTML = '<input name="file" type="file" class="ui-file"/>';
        document.body.appendChild(inputDiv);

        return inputDiv;
    }


    var iteratorUploadObj = function (array) {
        var uploadObj;

        for (var i = 0, fn; fn = array[i++]; ) {
            uploadObj = fn();

            if (uploadObj !== false) {
                return uploadObj;
            }
        }
    }

    var uploadObj = iteratorUploadObj([getActiveUploadObj, getFlashUploadObj, getFormUploadObj]);