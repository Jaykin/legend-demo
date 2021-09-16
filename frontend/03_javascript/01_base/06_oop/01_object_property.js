

    // 对象属性的特性

            // 定义单个属性
    var book = {
        _year: 2004
    }

    Object.defineProperty(book, 'name', {
        configurable: true,
        enumerable: true,
        writable: true,
        value: '书籍名称'
    });

    Object.defineProperty(book, 'year', {
        get: function () {
            return this._year;
        },
        set: function (value) {
            if (value > 2004) {
                this._year = value;
            }
        }
    });


            // 定义多个属性
    var person = {}

    Object.defineProperties(person, {
        _age: {
            value: 18
        },

        sex: {
            value: 'man'
        },

        age: {
            get: function () {
                return this._age
            },
            set: function (value) {
                this._age = value;
            }
        }
    })



        // 读取属性的特性
    console.dir(Object.getOwnPropertyDescriptor(book, 'name'));
    console.dir(Object.getOwnPropertyDescriptor(person, 'age'));
