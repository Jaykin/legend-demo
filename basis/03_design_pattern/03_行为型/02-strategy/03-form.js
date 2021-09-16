


    /*
    *
    * 表单验证
    *
    * */

    // 表单验证有许多规则，这些规则也可看为算法，利用策略模式来封装实现

    var registerForm = document.getElementById('registerForm');

    //registerForm.onsubmit = function () {
    //    if ( registerForm.userName.value === '' ){
    //        alert ( '用户名不能为空' );
    //        return false;
    //    }
    //    if ( registerForm.password.value.length < 6 ){
    //        alert ( '密码长度不能少于 6 位' );
    //        return false;
    //    }
    //    if ( !/(^1[3|5|8][0-9]{9}$)/.test( registerForm.phoneNumber.value ) ){
    //        alert ( '手机号码格式不正确' );
    //        return false;
    //    }
    //
    //    alert('验证成功！');
    //}


    // 1、抽离规则
    // 2、抽离验证逻辑：仅返回验证是否通过
    // 3、应用逻辑根据是否通过来执行

    var rules = {
        isNoEmpty: function a(val) {
            if (val !== '') {
                return true;
            }
        },

        minlength: function b(val, minLen) {
            if (val.length >= minLen) {
                return true;
            }
        },

        isTelNum: function c(tel) {
            if (/(^1[3|5|8][0-9]{9}$)/.test(tel)) {
                return true;
            }
        }
    }

    var Validator = function () {
        this.rulesValidate = [];
    }
    Validator.prototype.add = function (value, rule, errMsg) {
        var self = this;

        if (typeof rule === 'string') {
            rule = [{ rule: rule, errMsg: errMsg }];
        }

        for (var i = 0, item; item = rule[i++]; ) {
            (function (item) {
                self.rulesValidate.push(function () {
                    var arr = item.rule.split(':');
                    var r = arr.shift();

                    arr.unshift(value);
                    if (!rules[r].apply(null, arr)) return item.errMsg;
                });
            })(item);
        }
    }
    Validator.prototype.start = function () {
        var errMsg;

        for (var i = 0, item; item = this.rulesValidate[i++] ;) {
            errMsg = item();
            if (errMsg) return errMsg;
        }
    }


    var rsValidate = function (registerForm) {
        var validator = new Validator();

            validator.add(registerForm.userName.value, [{
                rule: 'isNoEmpty',
                errMsg: '用户名不能为空'
            }, {
                rule: 'minlength:2',
                errMsg: '用户名长度不能少于2位'
            }]);
            validator.add(registerForm.password.value, 'minlength:4', '密码长度不能少于 4 位');
            validator.add(registerForm.phoneNumber.value, 'isTelNum', '手机号码格式不正确');

            return validator.start();
    };

    registerForm.onsubmit = function () {
        var errMsg = rsValidate(registerForm);

        if (errMsg) {
            alert(errMsg);
            return false;
        } else {
            alert('验证成功!');
        }
    }


    //
