const assert = require('assert');

/**
 * delayed root suite
*/
// setTimeout(() => {
//     console.log('delayed root suite');

//     // 启动测试
//     run();
// }, 5000)


/**
 * Mocha 初试
*/
describe('Array', () => {
    describe('#indexOf()', () => {
        it('01 - 当值不存在的时候应该返回-1', () => {
            assert.equal(-1, [1, 2, 3].indexOf(4))
        })
    })
})


/**
 * 异步代码
*/
const User = require('../helpers/user');
describe('User', () => {
    describe('#save()', () => {
        it('01 - 能正确保存用户信息', (/*done*/) => {
            const user = new User();

            // 1.0 使用done
            // user.save().then(done, done)

            // 2.0 使用promise
            return user.save();
        })
    })
})


/**
 * Hooks
*/
describe.skip('Hooks', () => {
    before(function () {
        // 在所有测试之前运行
        console.log('     在所有测试之前运行')
    });

    after(function () {
        // 在所有测试之后运行
        console.log('     在所有测试之后运行')
    });

    beforeEach(function () {
        // 在每个测试运行之前运行
        console.log('     在每个测试运行之前运行');
    });

    afterEach(function () {
        // 在每个测试运行之后运行
        console.log('     在每个测试运行之后运行');
    });

    it('001 Test Hooks', () => {
        assert.equal(1, 1)
    });

    it('002 Test Hooks', () => {
        assert.equal(2, 2)
    });
});


/**
 * Pending Tests
*/
describe('Pending Tests', () => {
    describe('#test', () => {
        it('this is a test-case without callback, called pending test')
    })
})


/**
 * 动态生成测试用例
*/
function add () {
    return Array.prototype.slice.call(arguments).reduce((prev, curr) => prev + curr, 0)
}

describe('Dynamically Generating Tests', () => {
    const tests = [{
        args: [1, 2], expected: 3
    }, {
        args: [1, 2, 3], expected: 6
    }, {
        args: [1, 2, 3, 4], expected: 10
    }];

    tests.forEach(test => {
        it(`参数个数为：${test.args.length}`, () => {
            assert.equal(add.apply(null, test.args), test.expected)
        })
    })
})


/**
 * Test Duration
*/
describe('Test Duration', function () {
    this.slow(300);

    it('1000ms slow', (done) => {
        setTimeout(() => { done() }, 200)
    })
})