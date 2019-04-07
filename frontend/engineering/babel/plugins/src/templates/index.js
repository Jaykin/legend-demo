const template = require('@babel/template').default;
const generator = require('@babel/generator').default;
const t = require('@babel/types');
const tmpl = require('./temp01').tmpl;

const ast = template(tmpl)({
    IMPORT_NAME: t.identifier('jay'),
    IMPORT_SOURCE: t.stringLiteral('Long Hui')
});

console.log(generator(ast).code); // var jay = require("Long Hui");