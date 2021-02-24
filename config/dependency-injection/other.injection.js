const { asFunction, asClass } = require('awilix');

const ApiFinanzasRoutes = require("../../api/routes/other/finanzasApi.routes");
const DefaultValuesRoutes = require("../../api/routes/other/defaultValues.routes");
const ApiUtilsRoutes = require("../../api/routes/other/utilsApi.routes");

const ApiFinanzasComponent = require("../../api/components/finanzas.component");
const DefaultValuesComponent = require("../../api/components/defaults.component");
const ApiUtilsComponent = require("../../api/components/utils.component");

module.exports = (container) => {
    container.register({
        ApiUtilsRoutes: asFunction(ApiUtilsRoutes).singleton(),
        ApiUtilsComponent: asClass(ApiUtilsComponent).singleton(),
        ApiFinanzasRoutes: asFunction(ApiFinanzasRoutes).singleton(),
        ApiFinanzasComponent: asClass(ApiFinanzasComponent).singleton(),
        DefaultValuesRoutes: asFunction(DefaultValuesRoutes).singleton(),
        DefaultValuesComponent: asClass(DefaultValuesComponent).singleton(),
    })
    return container;
}