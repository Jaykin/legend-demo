const CODE = require('../errcode/code');
const { resResolve, errcode } = require('../errcode/index');

module.exports = function (app) {
    app.get('/api/utils/errcode', (req, res) => {
        res.send(errcode, null, 3);
    });

    app.get('/log/:fileName', (req, res) =>  {
        const cwd = process.cwd();
        res.sendFile(`${cwd}/log/${req.params.fileName}`);
    });
};

