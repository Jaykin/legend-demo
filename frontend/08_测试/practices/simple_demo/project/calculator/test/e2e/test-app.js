/**
 * E2E 端到端测试
 * 
*/
// const { describe, it, before, after } = require('mocha');
const { expect } = require('chai');
const express = require('express');
const { By } = require('selenium-webdriver');
const pretry = require('promise-retry');
const path = require('path');

const { prepareDriver, cleanupDriver } = require('../_utils/browser-automation');

describe('e2e test for calculate app', function () {
    // mocha相关设置
    this.timeout(Infinity);

    let server;         // 静态服务器
    let driver;         // 浏览器驱动

    // 进行所有测试之前开启web服务器
    before(done => {
        const app = express();

        app.use('/', express.static(path.resolve(__dirname, '../../dist')));
        server = app.listen(8888, done);
    })

    // 测试完成之后关闭web服务
    after(() => {
        server.close();
    })

    // 生成驱动
    before(async () => {
        driver = await prepareDriver()
    })

    // 清除驱动
    after(() => cleanupDriver(driver))


    /**
     * 测试用例
    */
    it('01 - initialized status', async () => {
        await driver.get('http://localhost:8888');

        // 测试当前页面title
        await pretry(async _ => {
            const title = await driver.getTitle();
    
            expect(title).to.equal('Calculator');   
        })

        // 测试Element
        await pretry(async _ => {
            const displayElement = await driver.findElement(By.css('.display'));
            const displayText = await displayElement.getText();

            expect(displayText).to.equal('0');
        })
    });

    // 测试计算流程
    it('02 - calculate for 42*4= ', async () => {
        const selectors = ['.digit-4', '.digit-2', '.operator-multiply', '.digit-4', '.operator-equals'];

        // 并发获取元素
        const promises = selectors.map(selector => driver.findElement(By.css(selector)));
        const eles = await Promise.all(promises);

        // 继发依次触发元素点击事件 42*4=
        for (let el of eles) {
            await driver.sleep(1000);
            await el.click();
        }

        // 测试
        await pretry(async _ => {
            const displayEl = await driver.findElement(By.css('.display'));
            const displayText = await displayEl.getText();
    
            expect(displayText).to.equal('168');
        })
    })
})