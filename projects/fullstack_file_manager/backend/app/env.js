
const DEV = 'development';
const PROD = 'production';
const UNITTEST = 'unittest';
const isProduction = () => process.env.NODE_ENV === PROD;
const isDev = () => process.env.NODE_ENV === DEV;

exports.DEV = DEV;
exports.PROD = PROD;
exports.UNITTEST = UNITTEST;
exports.isProduction = isProduction;
exports.isDev = isDev
;

