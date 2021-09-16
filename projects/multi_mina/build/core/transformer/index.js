const ifdef = require('./ifdef');

class Transformer {
    constructor() {
        this.middleware = [];
    }

    use(fn) {
        if (typeof fn !== 'function') throw new TypeError('transform must be a function!');

        this.middleware.push(fn);
        return this;
    }

    run(context) {
        const middleware = this.middleware;
        let next = null;
        let index = -1;
        return dispatch(0);

        function dispatch(i) {
            if (i <= index) return Promise.reject(new Error('next() 被调用了多次'));
            let fn = middleware[i];

            index = i;
            if (i === middleware.length) fn = next;
            if (!fn) return Promise.resolve();

            try {
                return Promise.resolve(fn(context, function next() {
                    return dispatch(i + 1);
                }));
            } catch (err) {
                return Promise.reject(err);
            }
        }
    }
}

const tmplTransformer = new Transformer();
tmplTransformer.use(ifdef);

const styleTransformer = new Transformer();
styleTransformer.use(ifdef);

const jsonTransformer = new Transformer();
jsonTransformer.use(ifdef);

const scriptTransformer = new Transformer();
scriptTransformer.use(ifdef);

const transformerMapper = {
    '.wxml': tmplTransformer,
    '.wxss': styleTransformer,
    '.json': jsonTransformer,
    '.js': scriptTransformer,
    // '.wxs': [],
};

function transform(compiler) {
    const extname = compiler.file.extname;
    return transformerMapper[extname].run(compiler);
}

module.exports = {
    transform
};