const { asClass, asFunction } = require('awilix');

const AbonoRoutes = require('../../../api/routes/apis/abonos.routes');
const AbonoController = require('../../../api/controllers/abono.controller');
const AbonoService = require('../../../services/abono.service');

module.exports = (container) => {
    container.register({
        AbonoRoutes: asFunction(AbonoRoutes).singleton(),
        AbonoController: asClass(AbonoController).singleton(),
        AbonoService: asClass(AbonoService).singleton(),
    })
    return container;
}



