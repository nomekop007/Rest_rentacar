const { asFunction, asClass } = require('awilix');

const ApiFinanzasRoutes = require("../../routes/other/finanzasApi.routes");
const DefaultValuesRoutes = require("../../routes/other/defaultValues.routes");
const ApiUtilsRoutes = require("../../routes/other/utilsApi.routes");

const ApiFinanzasComponent = require("../../components/finanzas.component");
const DefaultValuesComponent = require("../../components/defaults.component");
const ApiUtilsComponent = require("../../components/utils.component");

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