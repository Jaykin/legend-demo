const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const compression = require('compression');
const log4js = require('log4js');
const serveIndex = require('serve-index');
const log = require('./log');

// const jwtMiddleware = require('./middleware/jwt');

const authApi = require('./api/auth');
const categoryApi = require('./api/category');
const sectionApi = require('./api/section');
const fileApi = require('./api/file');
const brandApi = require('./api/brand');
const chunkApi = require('./api/chunk');
const utilsApi = require('./api/utils');

const env = require('./env');
const config = require('./config');

const app = express();


if (env.isDev()) {
    app.use(cors());
} else {
    app.use(cors({}));
}

// var options = {
//     redirect: false
// }

// app.use(express.static('/', options));
// app.use('/static', express.static('/', options));

// gzip
app.use(compression());

// static files
if (env.isDev()) {
    app.use(express.static(path.join(__dirname, 'public')));
    app.use('/log', serveIndex('log', { icons: true }));
}


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.use(log4js.connectLogger(log.logger('http'), {
    level: 'auto'
}));

// app.use(jwtMiddleware);

authApi(app);
brandApi(app);
categoryApi(app);
sectionApi(app);
fileApi(app);
chunkApi(app);

if (env.isDev()) {
    utilsApi(app);
}


app.listen(config.port, () => {
    console.log('服务器已经启动');
});
