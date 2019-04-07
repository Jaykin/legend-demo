const parser = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const generator = require('@babel/generator').default;
const t = require('@babel/types');
const template = require('@babel/template').default;

module.exports = {
    parser,
    traverse,
    generator,
    t,
    template
}