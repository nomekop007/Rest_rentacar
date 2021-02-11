const { asClass, asFunction } = require('awilix');

const RemplazoRoutes = require('../../../routes/api/remplazos.routes');
const RemplazoController = require('../../../controllers/remplazo.controller');
const RemplazoService = require('../../../services/remplazo.service');

module.exports = (container) => {
    container.register({
        RemplazoRoutes: asFunction(RemplazoRoutes).singleton(),
        RemplazoController: asClass(RemplazoController).singleton(),
        RemplazoService: asClass(RemplazoService).singleton()
    })
    return container;
}
