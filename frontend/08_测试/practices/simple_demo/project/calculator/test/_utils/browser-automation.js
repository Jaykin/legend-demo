const webdriver = require('selenium-webdriver');
const chromeDriver = require('chromedriver');
const path = require('path');

const chromeDriverPathAddition = `;${path.dirname(chromeDriver.path)}`;

/**
 * 生成浏览器驱动
*/
exports.prepareDriver = async () => {
    process.on('beforeExit', () => this.browser && this.browser.quit());
    process.env.PATH += chromeDriverPathAddition;
  
    return await new webdriver.Builder()
      .disableEnvironmentOverrides()
      .forBrowser('chrome')
      // .setLoggingPrefs({browser: 'ALL', driver: 'ALL'})
      .build();
  }

/**
 * 清除驱动
*/
exports.cleanupDriver = async (driver) => {
    if (!driver) throw new Error('driver undefined');

    await driver.sleep(5000);
    driver.close();
    process.env.PATH = process.env.PATH.replace(chromeDriverPathAddition, '');
  }
