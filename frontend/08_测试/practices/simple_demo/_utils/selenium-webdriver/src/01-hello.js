
/**
 * 简单使用
*/

const webdriver = require('selenium-webdriver');
const { By, until } = webdriver;

const driver = new webdriver.Builder().forBrowser('chrome').build();

driver.get('http://www.baidu.com');
driver.findElement(By.id('kw')).sendKeys('webdriver');
driver.findElement(By.id('su')).click();
// driver.wait(until.titleIs('webdriver - Google Search'), 1000);
// driver.quit();

