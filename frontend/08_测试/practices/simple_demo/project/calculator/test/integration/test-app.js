/**
 * 集成测试
*/

const { expect } = require('chai');
const { JSDOM } = require('jsdom');
const React = require('react');
const { render } = require('react-dom');
const App = require('../../lib/calculator-app').default;

describe('integration for calculate', function () {
    this.timeout(10000);

    // Mock DOM
    const html = `<!doctype html><html><body><div id="container"/></div></body></html>`;

    before(() => {
        global.window = new JSDOM(html).window;
        global.document = global.window.document;
    });

    after(() => {
        delete global.window
        delete global.document
    });

    it('01 - should work', () => {
        // 渲染React组件
        render(<App />, document.getElementById('container'));

        // 测试初始状态
        const displayEl = document.querySelector('.display');

        expect(displayEl.textContent).to.equal('0');

        // 测试表达式 42*2=
        const digit4Element = document.querySelector('.digit-4');
        const digit2Element = document.querySelector('.digit-2');
        const operatorMultiply = document.querySelector('.operator-multiply');
        const operatorEquals = document.querySelector('.operator-equals');
    
        digit4Element.click();
        digit2Element.click();
        operatorMultiply.click();
        digit2Element.click();
        operatorEquals.click();

        expect(displayEl.textContent).to.equal('84');
    });
})