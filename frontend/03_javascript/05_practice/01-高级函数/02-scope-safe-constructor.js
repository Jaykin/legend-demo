

    /*
    *
    * 作用域安全的构造函数
    *
    * */

    // 1.0 普通构造
    function Person01(name, age, job) {
        this.name = name;
        this.age = age;
        this.job = job;
    }

    // 2.0 作用域安全的构造函数
    function Person02(name, age, job) {
        if (this instanceof Person02) {
            this.name = name;
            this.age = age;
            this.job = job;
        } else {
            return new Person02(name, age, job);
        }
    }


    // 3.0 借用构造函数模式 与 这个模式组合的问题
            // 作用域安全
    function Polygon(sides){
        if (this instanceof Polygon) {
            this.sides = sides;
            this.getArea = function(){
                return 0;
            };
        } else {
            return new Polygon(sides);
        }
    }
            // 继承
    function Rectangle(width, height){
        Polygon.call(this, 2);
        this.width = width;
        this.height = height;
        this.getArea = function(){
            return this.width * this.height;
        };
    }

    var rect = new Rectangle(5, 10);
    console.log(rect.sides);            //undefined

    // 解决方法：
    Rectangle.prototype = new Polygon();

    var rect = new Rectangle(5, 10);
    alert(rect.sides);                  //2

