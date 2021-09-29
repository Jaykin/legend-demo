

        /*
        *
        * 能力检测（特性检测）
        *
        * */

        // 1.0 基本模式
        function getElement(id) {
            if (document.getElementById) {
                return document.getElementById(id);
            } else if (document.all) {
                return document.all[id];
            } else {
                throw new Error('No way to retrieve element!');
            }
        }

            // 错误的使用:
                // 注意：要用到什么特性就检查什么特性！
        function getWindowWidth() {
            if (document.all) {
                return document.documentElement.clientWidth;        // 错误的用法
            } else {
                return window.innerWidth;
            }
        }



        // 2.0 更可靠的能力检测
            //不要这样做！这不是能力检测——只检测了是否存在相应的方法
        function isSortable(object){
            return !!object.sort;
        }

            //这样更好：检查 sort 是不是函数
        function isSortable(object){
            return typeof object.sort == "function";
        }


            //错误！还不够具体
        var isFirefox = !!(navigator.vendor && navigator.vendorSub);
            //错误！假设过头了
        var isIE = !!(document.all && document.uniqueID);

