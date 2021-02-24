require('dotenv').config();

const PRODUCTION = require('./production');
const DEVELOPMENT = require('./development');
const TESTING = require('./testing');
const QA = require('./qa');

const { NODE_ENV } = process.env;

let currenEnv = DEVELOPMENT;

if (NODE_ENV === 'development') currenEnv = DEVELOPMENT;
if (NODE_ENV === 'production') currenEnv = PRODUCTION;
if (NODE_ENV === 'testing') currenEnv = TESTING;
if (NODE_ENV === 'qa') currenEnv = QA;

module.exports = currenEnv;