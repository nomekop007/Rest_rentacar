const { asFunction, asClass } = require('awilix');

const ApiFinanzasRoutes = require("../../api/routes/apis/other/finanzasApi.routes");
const DefaultValuesRoutes = require("../../api/routes/apis/other/defaultValues.routes");
const ApiUtilsRoutes = require("../../api/routes/apis/other/utilsApi.routes");

const ApiFinanzasController = require("../../api/controllers/other/finanzas.controller");
const DefaultValuesController = require("../../api/controllers/other/defaults.controller");
const ApiUtilsController = require("../../api/controllers/other/utils.controller");

const FinanzasService = require("../../contexts/other/services/finanzas.services");
const UtilsService = require("../../contexts/other/services/utils.services");
const FinanzasBusiness = require("../../contexts/other/domain/finanzas.business");
const UtilsBusiness = require("../../contexts/other/domain/utils.business");


module.exports = (container) => {
    container.register({
        ApiUtilsRoutes: asFunction(ApiUtilsRoutes).singleton(),
        ApiFinanzasRoutes: asFunction(ApiFinanzasRoutes).singleton(),
        DefaultValuesRoutes: asFunction(DefaultValuesRoutes).singleton(),

        ApiUtilsController: asClass(ApiUtilsController).singleton(),
        ApiFinanzasController: asClass(ApiFinanzasController).singleton(),
        DefaultValuesController: asClass(DefaultValuesController).singleton(),

        FinanzasService: asClass(FinanzasService).singleton(),
        UtilsService: asClass(UtilsService).singleton(),
        FinanzasBusiness: asClass(FinanzasBusiness).singleton(),
        UtilsBusiness: asClass(UtilsBusiness).singleton(),
    })
    return container;
}