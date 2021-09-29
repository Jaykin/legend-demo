const { getOptions } = require('loader-utils');

function loader(content) {
    const options = getOptions(this);
    content = content.replace(/\[name\]/g, options.name);
    return `export default ${ JSON.stringify(content) }`;
}
module.exports = loader;
