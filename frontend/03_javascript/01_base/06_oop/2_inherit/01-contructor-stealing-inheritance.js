/*
* 借用构造函数（伪造对象 或 经典继承）
* */
    // 1.0
function Super() {
    this.colors = ['red', 'blue', 'white'];
}

function Sub() {
        // 将每个子类型实例的属性初始化为超类型实例的属性
    Super.call(this);
}

var instance01 = new Sub();
instance01.colors.push('yellow');
console.log(instance01.colors);     // ['red', 'blue', 'white', 'yellow']

var instance02 = new Sub();
console.log(instance02.colors);     // ['red', 'blue', 'white']


    // 2.0 传递参数
function Super(colors) {
    this.colors = colors;
}

function Sub(colors) {
    // 将每个子类型实例的属性初始化为超类型实例的属性
    Super.apply(this, colors);

    // 子类型实例属性
    this.categroy = 'clother';
}

var instance01 = new Sub();
instance01.colors.push('yellow');
console.log(instance01.colors);     // ['red', 'blue', 'white', 'yellow']

var instance02 = new Sub();
console.log(instance02.colors);     // ['red', 'blue', 'white']
