const expect = require('chai').expect;
const _ = require('lodash');
const { escapeHtml } = require('../../app/lib/xssEscape');

describe('xss', () => {
    it('should escape <', () => {
        const escapedString = escapeHtml('<abc');
        expect(escapedString).equal('&lt;abc');
    });
    it('should escape >', () => {
        const escapedString = escapeHtml('abc>');
        expect(escapedString).equal('abc&gt;');
    });
    it('should escape &', () => {
        const escapedString = escapeHtml('&abc');
        expect(escapedString).equal('&amp;abc');
    });
    it('should escape "', () => {
        const escapedString = escapeHtml('"abc');
        expect(escapedString).equal('&quot;abc');
    });
    it('should escape \'', () => {
        const escapedString = escapeHtml('\'abc');
        expect(escapedString).equal('&#39;abc');
    });
    it('should escape complicated html string', () => {
        const escapedString = escapeHtml('<div class="ab\'c">&');
        expect(escapedString).equal('&lt;div class=&quot;ab&#39;c&quot;&gt;&amp;');
    });
});

