// 灯光程序
// 按下开关，控制不同的灯光状态

// ===================================================== 无模式 ========================================================================================
// 问题一：buttonWasPressed 违反开放-封闭原则，每次修改状态时都需要改源码
// 问题二：buttonWasPressed 随着状态的增多，其代码量会更加庞大难以维护
// 问题三：状态类型、状态切换没有很好的管理，缺乏可读性
class LightNormal {
    button = null;

    constructor() {
        this.state = 'off';
    }

    init() {
        const _this = this;
        this.button = {
            onClick() {
                _this.buttonWasPressed();
            }
        }
    }

    buttonWasPressed() {
        if (this.state === 'off') {
            console.log('开弱光');       // 响应逻辑
            this.state = 'weakLight';   // 切换状态
        } else if (this.state === 'weakLight') {
            console.log('开强光');
            this.state = 'strongLight';
        } else if (this.state === 'strongLight') {
            console.log('关灯');
            this.state = 'off';
        }
    }
}

// ===================================================== 状态模式 ========================================================================================
// 封装状态对象，将其相关的东西整合，外部传入请求，由该对象负责自己的行为
// 怎么封装状态对象呢？即怎么描述对象：普通对象 or 原型模式(Object.create) or 类
// 怎么更好的管理状态切换？

class LightState {
    constructor(context) {
        this.context = context;
    }
    buttonWasPressed() {
        throw new Error('父类的 buttonWasPressed 方法必须被重写');
    }
}

class OffLightState {
    constructor(context) {
        super(context);
    }

    buttonWasPressed() {
        console.log('开弱光');
        this.context.setState(this.context.weakLightState);
    }
}

class WeakLightState {
    constructor(context) {
        super(context);
    }

    buttonWasPressed() {
        console.log('开强光');
        this.context.setState(this.context.strongLightState);
    }
}

class StrongLightState {
    constructor(context) {
        super(context);
    }

    buttonWasPressed() {
        console.log('关灯');
        this.context.setState(this.context.offLightState);
    }
}

class Light {
    button = null;
    currState = null;

    constructor() {
        this.offLightState = new OffLightState( this );
        this.weakLightState = new WeakLightState( this );
        this.strongLightState = new StrongLightState( this );
    }

    init() {
        const _this = this;

        this.currState = this.offLightState;
        this.button = {
            onClick() {
                _this.currState.buttonWasPressed();
            }
        }
    }

    setState(nextState) {
        this.currState = nextState;
    }
}

const light = new Light();
light.init();


// ===================================================== JS 状态机 ========================================================================================
const lightStates = {
    'off': {
        buttonWasPressed() {
            console.log('关灯，下一次按是开灯');
            this.currState = this.onState;
        }
    },
    'on': {
        buttonWasPressed() {
            console.log('开灯，下一次按是关灯');
            this.currState = this.offState;
        }
    }
}

function createState(context, states, stateName) {
    return {
        buttonWasPressed() {
            states[stateName].buttonWasPressed.apply(context, arguments);
        }
    }
}

class LightStateMachine {
    button = null;

    constructor() {
        this.offState = createState(this, lightStates, 'off');
        this.onState = createState(this, lightStates, 'on');
        this.currState = this.onState;
    }

    init() {
        const _this = this;
        this.button = {
            onClick() {
                _this.currState.buttonWasPressed();
            }
        }
    }
}