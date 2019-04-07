/**
 * jsdom
*/

const { JSDOM } = require('jsdom');
const jsdomVersion = 'v11.4.0';

const html = `<!DOCTYPE html><p>Hello world</p>`;
const options = {
    url: 'https://www.baidu.com/',
    referrer: 'https://baike.baidu.com/',
    contentType: 'text/html',
    userAgent: `Mozilla/5.0 (${process.platform}) AppleWebKit/537.36 (KHTML, like Gecko) jsdom/${jsdomVersion}`,
}

const { window } = new JSDOM(html, options);