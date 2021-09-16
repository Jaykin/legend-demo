


    /*
    *
    * 策略模式实现缓动动画
    *
    * */

    // 需求：多种缓动动画效果（即算法），可以让小球按不同的算法运动

    // 参数说明：
        /*
        * t：动画已消耗的时间（time）
        * b：原始位置（）
        * c：目标位置 - 原始位置（）
        * d：动画持续的总时间（duration）
        *
        * 返回动画元素当前应该处在的位置
        * */

    var tween = {
        linear: function( t, b, c, d ){
            return c*t/d + b;
        },

        easeIn: function( t, b, c, d ){
            return c * ( t /= d ) * t + b;
        },

        strongEaseIn: function(t, b, c, d){
            return c * ( t /= d ) * t * t * t * t + b;
        },

        strongEaseOut: function(t, b, c, d){
            return c * ( ( t = t / d - 1) * t * t * t * t + 1 ) + b;
        },

        sineaseIn: function( t, b, c, d ){
            return c * ( t /= d) * t * t + b;
        },

        sineaseOut: function(t, b, c, d){
            return c * ( ( t = t / d - 1) * t * t + 1 ) + b;
        }
    }


    var Animate = function (dom) {
        // 初始化定义一些参数
        this.dom = dom;
        this.startTime = 0;
        this.startPos = 0;
        this.endPos = 0;
        this.propertyName = '';
        this.easing = '';
        this.duration = '';
    }

    Animate.prototype.start = function ( propertyName, endPos, duration, easing ) {
        var self = this;
        var timer;

        // 负责给初始化参数赋值，并开始/结束动画(启动/清除定时器)
        this.startTime = +new Date; // 动画启动时间
        this.startPos = this.dom.getBoundingClientRect()[ propertyName ]; // dom 节点初始位置
        this.propertyName = propertyName; // dom 节点需要被改变的 CSS 属性名
        this.endPos = endPos; // dom 节点目标位置
        this.duration = duration; // 动画持续事件
        this.easing = tween[ easing ]; // 缓动算法

        timer = setInterval(function () {
            if (self.step() === false) {
                clearInterval(timer);
            }
        }, 16);
    }

    Animate.prototype.step = function () {
        // 负责计算当前位置，并更新CSS属性值
        var curT = +new Date;

        if (curT >= this.startTime + this.duration) {
            this.update(this.endPos);
            return false;
        }

        var curPos = this.easing(curT - this.startTime, this.startPos, this.endPos - this.startPos, this.duration);

        this.update(curPos);
    }

    Animate.prototype.update = function (pos) {
        // 负责更新CSS属性值
        this.dom.style[this.propertyName] = pos + 'px';
    }


    //var divDom = document.getElementById('animate');
    //var animateDiv = new Animate(divDom);
    //
    //// 绑定事件
    //document.addEventListener('click', function (e) {
    //    var tar = e.target;
    //
    //    divDom.style.left = 0;
    //    animateDiv.start('left', 500, 3000, tar.id);
    //})