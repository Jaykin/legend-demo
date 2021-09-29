/**
 * 断言库 chai.js 的 BDD 断言风格
*/

const expect = require('chai').expect;

describe.only('Assert of Chai', () => {
    /**
     * .equal(value)
     * 断言目标严格等于value
     * */ 
    it('#.equal', () => {
        expect('string').equal('string')
    })

    /**
     * .not
     * 对之后的断言取反
     * */ 
    it('#.not', () => {
        expect('string').not.equal('strig')
    })

    /**
     * .deep
     * 设置deep标记，递归比较对象的键值对
     * */ 
    it('#.deep', () => {
        const obj = { a: 2, b: 3 };
        const a = obj;

        expect(a).equal(obj);
        expect({ a: 2, b: 3 }).deep.equal(obj)
    })

    /**
     * .property(name [,value])
     * 断言目标是否拥有名为name的属性
    */
    it('#.property', () => {
        // 01 简单引用
        const o = { key: 'value' }

        expect(o).property('key');
        expect(o).property('key', 'value');

        // 02 .deep .own .nested 深层比较
        const deepObj = {
            green: { tea: 'matcha' },
            teas: ['Chai', 'matcha', { tea: 'konacha' }]
        }
        expect(deepObj).deep.own.property('green', { tea: 'matcha' });
        expect(deepObj).nested.property('teas[2].tea', 'konacha');
    })
})
