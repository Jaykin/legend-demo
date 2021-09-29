/**
 * 传统面向对象语言的装饰者模式
 * 
 * 需求：编写一个飞机大战的游戏，随着经验值的增加，我们操作的飞机对象可以升级成
        更厉害的飞机，一开始这些飞机只能发射普通的子弹，升到第二级时可以发射导弹，升到第三级
        时可以发射原子弹
*/

const LEVEL_MAP = {
    'defaultVal': 'low',
    'low': {
        color: 'black',
        weapon: '子弹'
    },
    'heigh': {
        color: 'red',
        weapon: '导弹'
    },
    'heigher': {
        color: 'gold',
        weapon: '原子弹'
    }
}

// 飞机类
class Plane {
    constructor(options = {}) {
        this.level = options.level;
    }

    // 获取武器
    getWeapon() {
        return LEVEL_MAP[this.level].weapon;
    }

    // 发射
    fire() {
        const weapon = this.getWeapon();

        console.log(`发射${weapon}`);
    }
} 

// user类
class User {
    constructor(options = {}) {
        const defaultPlane = new Plane({
            level: LEVEL_MAP.defaultVal
        });

        this.plane = options.plane || defaultPlane;
        this.exp = 0;
    }

    // 增加经验值
    addExp(num) {
        this.exp += Number(num);

        if (this.exp >= 200) {
            this.plane = new PlaneMissileDecorator(this.plane);
        }
    }

    // 攻击
    attack() {
        this.plane.fire();
    }
}

// 装饰类
class PlaneMissileDecorator {
    constructor(plane) {
        plane.level = 'heigher';

        return Object.create(plane);
    }
}

const user01 = new User();

user01.attack();
user01.addExp(220);
user01.attack();

console.log(user01.plane);