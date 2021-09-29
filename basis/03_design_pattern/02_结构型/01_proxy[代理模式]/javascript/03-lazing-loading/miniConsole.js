

    /*
    *
    *   miniConsole模块
    *
    * */

    (function (root, factory) {
        if (typeof define === 'function' && define.amd) {
            define(function () {
                return factory();
            });
        } else if (typeof exports === 'object') {
            module.exports = factory();
        } else {
            root.miniConsole = factory();
        }

    })(this, function () {
        var logDom = document.getElementById('log');

        var createLogItem = function (text) {
            var pDom = document.createElement('p');
            pDom.appendChild(document.createTextNode(text));

            return pDom;
        }

        return {
            log: function () {
                logDom.appendChild(createLogItem(arguments[0]));
            }
        }
    });








