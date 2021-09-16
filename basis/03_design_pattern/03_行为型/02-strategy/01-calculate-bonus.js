


    /*
    *
    * 策略模式计算奖金
    *
    * */

// 1.0 -------------------------------------------------------
    /*
    * 怎样思考代码的问题：
        1、是否符合代码设计各大基本原则
        2、设计模式的核心就是将分离不变和变化
      分析：
        1、这个功能依赖两点：输入数据 及 奖金计算方法
      代码的问题：
        1、函数缺乏弹性，如果新增C或者修改算法，则需要进入函数内部修改，违反了开放-封闭原则
        2、算法的复用性差，即计算奖金的算法包含在函数内部，不可复用
    *
    * */
    function calculateBonus01(level, salary) {
        if (level == 'S') {
            return salary * 4
        }

        if (level == 'A') {
            return salary * 3
        }

        if (level == 'B') {
            return salary * 2
        }
    }


// 2.0 使用组合函数重构----------------------------------------------------------
    // 即分离算法
    // 不变：映射
    // 变化：算法

    function levelS(salary) {
        return salary * 4
    }
    function levelA(salary) {
        return salary * 3
    }
    function levelB(salary) {
        return salary * 2
    }

    function calculateBonus02(level, salary) {
        if (level == 'S') {
            return levelS(salary)
        }

        if (level == 'A') {
            return levelA(salary)
        }

        if (level == 'B') {
            return levelB(salary)
        }
    }

// 3.0 策略模式---------------------------------------------------------------------------
    /*
    * 1、将算法 与 使用分离
    * 2、避免污染全局空间
    *
    * */
    // 策略类
    var calculate = function () {
        return {
            levelS: function (salary) {
                return salary * 4
            },

            levelA: function (salary) {
                return salary * 3
            },

            levelB: function (salary) {
                return salary * 2
            }
        }
    } ();

    // 环境类
    var bonus = {
        S: calculate.levelS,
        A: calculate.levelA,
        B: calculate.levelB,
        getBonus: function (level, salary) {
            return this[level](salary)
        }
    }
















