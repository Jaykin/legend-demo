// api 代理（注意：需要保证在各端环境下运行正常）

module.exports = {
    'testFunc': (ctx, client, ...argv) => {
        console.log(client + ' testFunc proxy success!' + argv[0]);
    },
};