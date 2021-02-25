const { asFunction, asClass } = require('awilix');

const ApiFinanzasRoutes = require("../../api/routes/apis/other/finanzasApi.routes");
const DefaultValuesRoutes = require("../../api/routes/apis/other/defaultValues.routes");
const ApiUtilsRoutes = require("../../api/routes/apis/other/utilsApi.routes");

const ApiFinanzasController = require("../../api/controllers/other/finanzas.controller");
const DefaultValuesController = require("../../api/controllers/other/defaults.controller");
const ApiUtilsController = require("../../api/controllers/other/utils.controller");

module.exports = (container) => {
    container.register({
        ApiUtilsRoutes: asFunction(ApiUtilsRoutes).singleton(),
        ApiUtilsController: asClass(ApiUtilsController).singleton(),
        ApiFinanzasRoutes: asFunction(ApiFinanzasRoutes).singleton(),
        ApiFinanzasController: asClass(ApiFinanzasController).singleton(),
        DefaultValuesRoutes: asFunction(DefaultValuesRoutes).singleton(),
        DefaultValuesController: asClass(DefaultValuesController).singleton(),
    })
    return container;
}