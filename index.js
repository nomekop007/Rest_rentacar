
const container = require('./src/config/dependency-injection/container');

const application = container.resolve('app');

application.start();

