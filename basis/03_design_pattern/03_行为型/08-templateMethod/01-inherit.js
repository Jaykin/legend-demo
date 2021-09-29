/** 
 * 使用继承实现
 * 顺便复习下继承方式
 * 思考继承的必要性：
 *  1、意义是啥：抽象共性
 *  2、有啥可以代替的：
 *  3、什么场景用什么操作呢：以合适、简单、高效为原则
*/

// 父类
function Beverage() {}

Beverage.prototype = {
    constructor: Beverage,
    // 把水煮沸
    boilWater: function () {
        console.log( '01、把水煮沸' ); 
    },

    // 泡 - (变化)由子类重写 - 进行安全检测
    brew: function () {
        throw new Error( '子类必须重写 brew 方法' ); 
    },

    // 把饮料倒进杯子 -（变化)由子类重写 - 进行安全检测
    pourInCup: function () {
        throw new Error( '子类必须重写 pourInCup 方法' ); 
    },

    // 加调料 -（变化)由子类重写 - 进行安全检测
    addCondiments: function () {
        throw new Error( '子类必须重写 addCondiments 方法' ); 
    },

    // 钩子 - 是否加调料
    customerWantsCondiments: function () {
        return true
    },

    // 模板方法，控制流程执行
    init: function () {
        this.boilWater();
        this.brew();
        this.pourInCup();
        // 这步是否执行，子类可进行配置
        if (this.customerWantsCondiments()) {
            this.addCondiments();
        } 
    }
}


// 生成coffee
function Coffee() {}

Coffee.prototype = new Beverage();
Coffee.prototype.brew = function () {
    console.log( '02、用沸水冲泡咖啡' ); 
};
Coffee.prototype.pourInCup = function(){
    console.log( '03、把咖啡倒进杯子' ); 
};
Coffee.prototype.addCondiments = function(){
    console.log( '04、加糖和牛奶' );
}; 

const coffee = new Coffee();
coffee.init();


// 生成tea
const Tea = function(){};

Tea.prototype = new Beverage();
Tea.prototype.brew = function(){
 console.log( '02、用沸水浸泡茶叶' );
};
Tea.prototype.pourInCup = function(){
 console.log( '03、把茶倒进杯子' );
};
Tea.prototype.addCondiments = function(){
 console.log( '04、加柠檬' );
};

const tea = new Tea();
tea.init(); 
