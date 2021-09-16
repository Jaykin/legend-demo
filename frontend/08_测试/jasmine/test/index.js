/**
 * Created by Administrator on 2016/12/15.
 */
    // 1.0 基础：(Suits、Specs、Matchers)
describe('常用Api：', function () {
    it('toBe：基本类型判断', function () {
        expect(1).toBe(1);
        expect('a').not.toBe('c');
    });

    it('toEqual: toEqual有两种用法01', function () {
        expect(1).toEqual(1);
        expect('a').not.toEqual('b');
    });
    it('toEqual: toEqual有两种用法02', function () {
        var o1 = {
            name: "Jack",
            age: 12
        };
        var o2 = {
            name: "Jack",
            age: 12
        };
        var o3 = {
            name: "Tom",
            age: 13
        };
        expect(o1).toEqual(o2);
        expect(o1).not.toEqual(o3);
    });

    it("toMatch: 使用正则表达式判断", function(){
        var str = "Michael Jackson";
        expect(str).toMatch(/michael/i);
        expect(str).not.toMatch(/tom/i);
    })

    it("toBeDefine: 判断是否非undefined", function(){
        var student = {
            name: "Jack",
            age: 12
        };
        expect(student.name).toBeDefined();
        expect(student.gender).not.toBeDefined();
    })

    it("toBeUndefined: 判断是否是undefined，与toBeDefine相反", function(){
        var student = {
            name: "Jack",
            age: 12
        };
        expect(student.gender).toBeUndefined();
        expect(student.name).not.toBeUndefined();
    })

    it("toBeNull：判断是否是null", function(){
        var student = {
            name: "Jack",
            age: 12,
            deskmate: null
        };
        expect(student.deskmate).toBeNull();
        expect(student.name).not.toBeNull();
    });
});


    // 2.0 Setup、Teardown、嵌套的describe
        // Setup和Teardown可以帮助Suite执行一些重复的代码
describe('Setup和Teardown示例', function () {
    var foo;
    beforeEach(function () {
        foo = 0;
        foo += 1;
    });
    afterEach(function () {
        foo = 0;
    });

    it('test01', function () {
        expect(foo).toEqual(1);
    });
    it('test02', function () {
        expect(foo).toEqual(1);
    });
})
        /*嵌套的describe
        * 1、父子级的describe
        * 2、同级的describe
        * */
xdescribe("测试嵌套describe：level1", function() {
    beforeEach(function() {
        alert('level1：Setup');
    });

    afterEach(function() {
        alert('level1：Teardown');
    });

    it("level1：测试", function() {
        alert('level1：测试');
    });

    describe("测试嵌套describe:level2-1", function() {
        beforeEach(function() {
            alert('level2-1：Setup');
        });

        afterEach(function() {
            alert('level2-1：Teardown');
        });

        it("level2：测试", function() {
            alert('level2-1：测试');
        });
    });
    describe("测试嵌套describe:level2-2", function() {
        beforeEach(function() {
            alert('level2-2：Setup');
        });

        afterEach(function() {
            alert('level2-2：Teardown');
        });

        it("level2：测试", function() {
            alert('level2-2：测试');
        });
    });
});
        /*禁用Suites和挂起Specs
        * 1、禁用Suites：xdescribe()
        * 2、挂起Specs：xit() 或 pending()
        * */
xdescribe("A spec", function() {
    var foo;

    beforeEach(function() {
        foo = 0;
        foo += 1;
    });

    it("is just a function, so it can contain any code", function() {
        expect(foo).toEqual(1);
    });
});
describe("Pending specs", function() {
    xit("can be declared 'xit'", function() {
        expect(true).toBe(false);
    });

    it("can be declared with 'it' but without a function");

    it("can be declared by calling 'pending' in the spec body", function() {
        expect(true).toBe(false);
        pending();
    });
});
        /*jasmine.any
        * 接受构造函数或者“Class”名作为期望值，如果这个构造函数（Class）和实际值的构造函数（Class）匹配，则返回true
        * */
describe('jasmine.any', function () {
    var MyClass = function () {
        this.name = 'jay';
    }
    var me = new MyClass();
    it('..', function () {
        expect({}).toEqual(jasmine.any(Object));
        expect('string').toEqual(jasmine.any(String));
        expect(me).toEqual(jasmine.any(MyClass));       // true
        expect(me).toEqual(jasmine.any(Object));        // true
    });
});
        /*jasmine.objectContaining
        * 当一个你只关心实际值是否包含某个键值对的时候，可以使用
        * */
describe('jasmine.objectContaining', function () {
    var foo = {
        name:'jay',
        age:18,
        sex:'man'
    }
    it('..', function () {
        expect(foo).toEqual(jasmine.objectContaining({name:'jay'}));
        //expect(foo).toEqual(jasmine.objectContaining({name:'vivian'}));
    });
});


    // 3.0 自定义Matcher
        /*
        * 1、Matcher从本质上讲是一个对比函数，它的函数名就是暴露给expect调用的名称，
        * 2、参数：接受actual 值和expected 值。
        * 3、这个函数会传入Jasmine作用域中，可以在beforeEach 中调用到。每次spec执行完后，都会把自定义Matchers卸载
        * */
var customMatchers = {
    toBeGoofy: function(util, customEqualityTesters) {
        return {
            compare: function(actual, expected) {
                console.log('===========');
                console.dir(actual);
                console.dir(expected);
                console.dir(util);
                console.dir(customEqualityTesters);
                if (expected === undefined) {
                    expected = '';
                }
                var result = {};
                result.pass = util.equals(actual.hyuk, "gawrsh" + expected, customEqualityTesters);

                if (result.pass) {
                    result.message = "测试用例通过";
                } else {
                    result.message = "测试用例不通过";
                }
                return result;
            },
            negativeCompare: function (actual, expected) {
                    // 由.not调用时调用这个函数
                if (expected === undefined) {
                    expected = '';
                }
                var result = {};
                result.pass = actual !== expected;

                if (result.pass) {
                    result.message = "测试用例通过";
                } else {
                    result.message = "测试用例不通过";
                }
                return result;
            }
        };
    }
};
describe("测试自定义错误信息", function() {
    beforeEach(function() {
        jasmine.addMatchers(customMatchers);
        console.log('beforeEach================');
        console.dir(jasmine.matchers);
    });
    afterEach(function () {
        console.log('afterEach================');
        console.dir(jasmine.matchers);
    });

    it("这是个失败的测试", function() {
        expect({
            hyuk: 'gawrsh'
        }).toBeGoofy();
    });
    it("这是个 成功的测试", function() {
        expect({
            hyuk: 'gawrsh'
        }).not.toBeGoofy(123);
    });
});


    // 4.0 Spies
        /*
        * 1、可以用来模拟函数的执行，以达到隔离复杂依赖的效果
        * 2、spy可以保存任何函数的调用记录和输入的参数，spy只能存在于describe和it中，在spec执行完之后销毁
        * */
describe('A spy', function () {
    var foo, bar = null;
    beforeEach(function () {
        foo = {
            setBar: function (value) {
                bar = value;
            }
        };
        spyOn(foo, 'setBar');       // spyOn: function(obj, methodName)  生成一个spy！！
        foo.setBar(112);
        foo.setBar(12, 'hello');
    });

    it('tracks that the spy was called', function () {
        expect(foo.setBar).toHaveBeenCalled();
    });

    it('tracks all the arguments of its calls', function () {
        expect(foo.setBar).toHaveBeenCalledWith(112);
        expect(foo.setBar).toHaveBeenCalledWith(12, 'hello');
    });
})
        // 理解：spy对函数进行一些处理，从而进行控制，伪造等
            // and.callThrough  在获取spy的同时，调用实际的函数
describe("A spy, when configured to call through", function() {
    var foo, bar, fetchedBar;

    beforeEach(function() {
        foo = {
            setBar: function(value) {
                bar = value;
            },
            getBar: function() {
                //console.log(bar + '---------');
                return bar;
            }
        };

        spyOn(foo, 'getBar').and.callThrough();
        //spyOn(foo, 'getBar');   // 获得spy时并不会调用函数，需要加.and.callThrough来调用函数(源码怎么实现的？？)

        foo.setBar(123);
        fetchedBar = foo.getBar();
    });

    it("tracks that the spy was called", function() {
        expect(foo.getBar).toHaveBeenCalled();
    });

    it("should not effect other functions", function() {
        expect(bar).toEqual(123);
    });

    it("when called returns the requested value", function() {
        //console.log(fetchedBar);
        expect(fetchedBar).toEqual(123);
    });
});
            // and.returnValue 返回指定值
describe("A spy, when configured to fake a return value", function() {
    var foo, bar, fetchedBar;

    beforeEach(function() {
        foo = {
            setBar: function(value) {
                bar = value;
            },
            getBar: function() {
                return bar;
            }
        };

        spyOn(foo, "getBar").and.returnValue(33);

        foo.setBar(123);
        fetchedBar = foo.getBar();
    });

    it("tracks that the spy was called", function() {
        expect(foo.getBar).toHaveBeenCalled();
    });

    it("should not effect other functions", function() {
        expect(bar).toEqual(123);
    });

    it("when called returns the requested value", function() {
        expect(fetchedBar).toEqual(33);
    });
});
            // and.callFake 执行指定函数
describe("A spy, when configured with an alternate implementation", function() {
    var foo, bar, fetchedBar;

    beforeEach(function() {
        foo = {
            setBar: function(value) {
                bar = value;
            },
            getBar: function() {
                return bar;
            }
        };

        spyOn(foo, "getBar").and.callFake(function() {
            //console.log('执行指定函数！！');
            return 1001;
        });

        foo.setBar(123);
        fetchedBar = foo.getBar();
    });

    it("tracks that the spy was called", function() {
        expect(foo.getBar).toHaveBeenCalled();
    });

    it("should not effect other functions", function() {
        expect(bar).toEqual(123);
    });

    it("when called returns the requested value", function() {
        expect(fetchedBar).toEqual(1001);
    });
});
            // and.throwError 抛出异常
describe("A spy, when configured to throw an error", function() {
    var foo, bar;

    beforeEach(function() {
        foo = {
            setBar: function(value) {
                bar = value;
            }
        };

        spyOn(foo, "setBar").and.throwError("quux");
    });

    it("throws the value", function() {
        expect(function() {
            foo.setBar(123)
        }).toThrowError("quux");
    });
});
            // and.stub spy恢复到原始状态，不执行任何操作
describe("A spy", function() {
    var foo, bar = null;

    beforeEach(function() {
        foo = {
            setBar: function(value) {
                bar = value;
            }
        };

        spyOn(foo, 'setBar').and.callThrough();
        //spyOn(foo, 'setBar').and.stub();
        //foo.setBar(123);
    });

    it("can call through and then stub in the same spec", function() {
        foo.setBar(123);
        expect(bar).toEqual(123);

        foo.setBar.and.stub();
        bar = null;

        foo.setBar(111);
        expect(bar).toBe(null);
    });
});
            // jasmine.createSpy 当没有函数可以spy的时候，可以创建一个“基础的”spy，它的背后没有任何实际的操作
describe("A spy, when created manually", function() {
    var whatAmI;

    beforeEach(function() {
        whatAmI = jasmine.createSpy('whatAmI');

        whatAmI("I", "am", "a", "spy");
    });

    it("is named, which helps in error reporting", function() {
        expect(whatAmI.and.identity()).toEqual('whatAmI');      // 返回函数名称
    });

    it("tracks that the spy was called", function() {
        expect(whatAmI).toHaveBeenCalled();
    });

    it("tracks its number of calls", function() {
        expect(whatAmI.calls.count()).toEqual(1);
    });

    it("tracks all the arguments of its calls", function() {
        expect(whatAmI).toHaveBeenCalledWith("I", "am", "a", "spy");
    });

    it("allows access to the most recent call", function() {
        expect(whatAmI.calls.mostRecent().args[0]).toEqual("I");
    });
});
            // jasmine.createSpyObj 传入一个字符串数组，返回一个对象，字符串数组的每一项都是它的spy类型的属性
describe("Multiple spies, when created manually", function() {
    var tape;

    beforeEach(function() {
        tape = jasmine.createSpyObj('tape', ['play', 'pause', 'stop', 'rewind']);

        tape.play();
        tape.pause();
        tape.rewind(0);
    });

    it("creates spies for each requested function", function() {
        expect(tape.play).toBeDefined();
        expect(tape.pause).toBeDefined();
        expect(tape.stop).toBeDefined();
        expect(tape.rewind).toBeDefined();
    });

    it("tracks that the spies were called", function() {
        expect(tape.play).toHaveBeenCalled();
        expect(tape.pause).toHaveBeenCalled();
        expect(tape.rewind).toHaveBeenCalled();
        expect(tape.stop).not.toHaveBeenCalled();
    });

    it("tracks all the arguments of its calls", function() {
        expect(tape.rewind).toHaveBeenCalledWith(0);
    });
});
            // calls
describe('Jasmine Spy的跟踪属性', function () {
    var foo, bar = null;

    beforeEach(function() {
        foo = {
            setBar: function(value) {
                bar = value;
            }
        };

        spyOn(foo, 'setBar');
    });

    it('.calls.any()示例', function () {
        // 如果spy没有被调用过，则返回false，否则返回true
        expect(foo.setBar.calls.any()).toEqual(false);
        foo.setBar(111);
        expect(foo.setBar.calls.any()).toEqual(true);
    });

    it('.calls.count()示例', function () {
        // 返回spy被调用的次数
        expect(foo.setBar.calls.count()).toEqual(0);
        foo.setBar(11);
        foo.setBar(11);
        expect(foo.setBar.calls.count()).toEqual(2);
    });

    it('.calls.argsFor(index)', function () {
        // 返回spy被第index次调用时的参数
        foo.setBar(1);
        foo.setBar(1, 'hello');

        expect(foo.setBar.calls.argsFor(0)).toEqual([1]);
        expect(foo.setBar.calls.argsFor(1)).toEqual([1, 'hello']);
        //expect(foo.setBar.calls.argsFor(2)).toEqual(1, 'hello');
    });

    it('.calls.allArgs()', function () {
        // 返回spy所有被调用的参数
        foo.setBar(123);
        foo.setBar(456, "baz");

        expect(foo.setBar.calls.allArgs()).toEqual([
            [123],
            [456, "baz"]
        ]);
    });

    it(".calls.all()", function() {
        // 返回spy所有被调用的this 上下文和参数及返回值
        foo.setBar(123);

        expect(foo.setBar.calls.all()).toEqual([{
            object: foo,
            args: [123],
            returnValue: undefined
        }]);
    });

    it(".calls.mostRecent()示例", function() {
        // 返回spy最近一次被调用的this 上下文和参数及返回值
        foo.setBar(123);
        foo.setBar(456, "baz");

        expect(foo.setBar.calls.mostRecent()).toEqual({
            object: foo,
            args: [456, "baz"],
            returnValue: undefined
        });
    });

    it(".calls.first()示例", function() {
        // 返回spy第一次被调用的this 上下文和参数及返回值
        foo.setBar(123);
        foo.setBar(456, "baz");

        expect(foo.setBar.calls.first()).toEqual({
            object: foo,
            args: [123],
            returnValue: undefined
        });
    });

    it(".calls.reset()示例", function() {
        // 清空spy的所有跟踪
        foo.setBar(123);
        foo.setBar(456, "baz");

        expect(foo.setBar.calls.any()).toBe(true);

        foo.setBar.calls.reset();

        expect(foo.setBar.calls.any()).toBe(false);
    });
});


    // 5.0 异步代码测试
        /*Jasmine Clock 可以用来测试setTimeout 和setInterval 的回调操作。它使回调函数同步执行
        * 当Clock的时间超过timer的时间，回调函数会被触发一次
        * */
            // 模拟Timeout
describe('Jasmine Clock 测试', function () {
    var timerCallback;

    beforeEach(function () {
        timerCallback = jasmine.createSpy('timerCallback');
        jasmine.clock().install();
    });
    afterEach(function () {
        jasmine.clock().uninstall();
    });

    it('同步触发setTimeout', function () {
        setTimeout(function () {
            // 仅执行一次
            console.log(22222);
            timerCallback();
        }, 1000);
        console.log(11111);
        expect(timerCallback).not.toHaveBeenCalled();
        //jasmine.clock().tick(500);
        jasmine.clock().tick(1000);
        console.log(33333);
        jasmine.clock().tick(2000);
        expect(timerCallback).toHaveBeenCalled();

        // 结果
            //LOG: 11111
            //LOG: 22222
            //LOG: 33333
    });

    it('同步触发setInterval', function () {
        setInterval(function () {
            // 可执行蛮多次
            console.log('setInterval2222');
            timerCallback();
        }, 100);

        console.log('setInterval1111');
        expect(timerCallback).not.toHaveBeenCalled();

        jasmine.clock().tick(101);
        console.log('setInterval3333');
        expect(timerCallback).toHaveBeenCalled();
        expect(timerCallback.calls.count()).toEqual(1);

        jasmine.clock().tick(115);
        expect(timerCallback.calls.count()).toEqual(2);
    });

});
            // 异步测试
describe('Jasmine 异步测试演示', function () {
    var value;

    beforeEach(function (done) {
        setTimeout(function () {
            console.log(1);
            value = 0;
            console.log('value' + value);
            done();
            console.log(2);     //这里不会执行
        }, 1);
    });

    it('--', function (done) {
        console.log(3);
        value++;
        console.log('value' + value);
        expect(value).toBeGreaterThan(0);
        done();
        console.log(4);         // 这里不会执行
    });

    describe("5秒钟", function() {
        var originalTimeout;
        beforeEach(function() {
            console.log('5秒钟1111');
            originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
            jasmine.DEFAULT_TIMEOUT_INTERVAL = 6000;
        });

        it("takes a long time", function(done) {
            setTimeout(function() {
                console.log('5秒钟2222');
                done();
            }, 5000);
        });

        afterEach(function() {
            console.log('5秒钟3333');
            jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
        });
    });
});
            // 测试ajax回调

