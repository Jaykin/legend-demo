// api 代理
const path = require('path');
const through = require('through2');

const { namespace } = require('../constant');

function getCodeTmpl(compiler) {
    let codeTmpl = `
        const __${namespace}__ = getEnv();
        const __${namespace}_ctx__ = __${namespace}__.ctx;
        const __${namespace}_apis__ = (require('./__${namespace}_proxy__').apiProxy)(__${namespace}_ctx__, __${namespace}__.client);
        Object.keys(__${namespace}_apis__).forEach((apiName) => {
            const apiOpt = __${namespace}_apis__[apiName];

            if (typeof apiOpt === 'function') {
                __${namespace}_ctx__[apiName] = apiOpt;
                return;
            }

            if (typeof apiOpt === 'string') {
                __${namespace}_ctx__[apiName] = () => console.error(\`\${apiName} \${apiOpt}\`);
            }

        });
        function getEnv() {
    `;
    const client = JSON.stringify(compiler.config.client);
    switch(compiler.platform) {
        case 'wx':
            codeTmpl += `
                if (typeof wx !== 'undefined' && typeof wx.getSystemInfo === 'function') {
                    return {
                        ctx: wx,
                        client: 'wx',
                    };
                }
            `;
            break;
        case 'swan':
            codeTmpl += `
                if (typeof swan !== 'undefined' && typeof swan.getSystemInfo === 'function') {
                    const __${namespace}_client__ = ${client};
                    const defScheme = Object.keys(__${namespace}_client__)[0];
                    return {
                        ctx: swan,
                        client: __${namespace}_client__[swan.getEnvInfoSync()['scheme'] || defScheme],
                    };
                }
            `;
            break;
        case 'qq':
            codeTmpl += `
                if (typeof qq !== 'undefined' && typeof qq.getSystemInfo === 'function') {
                    return {
                        ctx: qq,
                        client: 'qq',
                    };;
                }
            `;
            break;
        case 'tt':
            codeTmpl += `
                if (typeof tt !== 'undefined' && typeof tt.getSystemInfo === 'function') {
                    const __${namespace}_client__ = ${client};
                    return {
                        ctx: tt,
                        client: __${namespace}_client__[tt.getSystemInfoSync()['appName']],
                    };;
                }
            `;
            break;
    }
    codeTmpl += `
        }
    `;
    return codeTmpl;
}

module.exports = function apiProxyPlugin(compiler) {
    // const platform = compiler.platform;
    const cwdDir = process.cwd();
    const appPath = path.resolve(cwdDir, compiler.sourcePath, 'app.js');

    return through.obj(function(file, encode, cb) {
        if (appPath === file.path) {
            const contents = file.contents.toString();
            file.contents = Buffer.from(getCodeTmpl(compiler) + contents);
        }
        this.push(file);
        cb();
    });
};
