const { asClass, asFunction } = require('awilix');

const LicitacionRoutes = require('../../../api/routes/apis/licitaciones.routes');
const LicitacionController = require('../../../api/controllers/licitacion.controller');
const LicitacionService = require('../../../contexts/licitaciones/services/licitacion.service');
const LicitacionBusiness = require('../../../contexts/licitaciones/domain/licitacion.business');

const LicitacionRepository = require('../../../contexts/licitaciones/dataAccess/licitacion.repository');
const IngresoLicitacionRepository = require('../../../contexts/licitaciones/dataAccess/ingresoLicitacion.repository');
const ClienteLicitacionRepository = require('../../../contexts/licitaciones/dataAccess/clienteLicitacion.repository');
const RespaldoIngresoLicitacionRepository = require('../../../contexts/licitaciones/dataAccess/respaldoIngresoLicitacion.repository');


module.exports = (container) => {
    container.register({
        LicitacionRoutes: asFunction(LicitacionRoutes).singleton(),
        LicitacionController: asClass(LicitacionController).singleton(),
        LicitacionService: asClass(LicitacionService).singleton(),
        LicitacionBusiness: asClass(LicitacionBusiness).singleton(),

        LicitacionRepository: asClass(LicitacionRepository).singleton(),
        IngresoLicitacionRepository: asClass(IngresoLicitacionRepository).singleton(),
        ClienteLicitacionRepository: asClass(ClienteLicitacionRepository).singleton(),
        RespaldoIngresoLicitacionRepository: asClass(RespaldoIngresoLicitacionRepository).singleton(),
    })
    return container;
}


