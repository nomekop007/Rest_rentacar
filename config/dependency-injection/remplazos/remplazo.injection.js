const { asClass, asFunction } = require('awilix');

const RemplazoRoutes = require('../../../api/routes/apis/remplazos.routes');
const RemplazoController = require('../../../api/controllers/remplazo.controller');
const RemplazoRepository = require('../../../contexts/empresaRemplazos/dataAccess/remplazo.repository');

module.exports = (container) => {
    container.register({
        RemplazoRoutes: asFunction(RemplazoRoutes).singleton(),
        RemplazoController: asClass(RemplazoController).singleton(),
        RemplazoRepository: asClass(RemplazoRepository).singleton()
    })
    return container;
}
