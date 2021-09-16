/** 
 * 使用对象合并实现
*/

// 定义基本对象
const Beverage = {
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
};


// 生成coffee
const coffee = Object.assign(Beverage, {
    brew: function () {
        console.log( '02、用沸水冲泡咖啡' );
    },
    pourInCup: function () {
        console.log( '03、把咖啡倒进杯子' );
    },
    addCondiments: function () {
        console.log( '04、加糖和牛奶' );
    }
});

coffee.init();