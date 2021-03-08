const { asClass, asFunction } = require('awilix');

const ArriendoRoutes = require('../../../api/routes/apis/arriendos.routes');
const ContactoRoutes = require('../../../api/routes/apis/contactos.routes');
const ContratoRoutes = require('../../../api/routes/apis/contratos.routes');
const ExtencionRoutes = require('../../../api/routes/apis/extenciones.routes');
const GarantiaRoutes = require('../../../api/routes/apis/garantias.routes');
const RequisitoRoutes = require('../../../api/routes/apis/requisitos.routes');

const ArriendoController = require('../../../api/controllers/arriendo.controller');
const ArriendoService = require('../../../contexts/arriendos/service/arriendo.service');
const ArriendoBusiness = require('../../../contexts/arriendos/domain/arriendo.business');

const ContactoRepository = require('../../../contexts/arriendos/dataAccess/contacto.repository')
const ArriendoRepository = require('../../../contexts/arriendos/dataAccess/arriendo.repository');
const ContratoRepository = require('../../../contexts/arriendos/dataAccess/contrato.repository');
const ExtencionRepository = require('../../../contexts/arriendos/dataAccess/extencion.repository');
const GarantiaRepository = require('../../../contexts/arriendos/dataAccess/garantia.repository')
const RequisitoRepository = require('../../../contexts/arriendos/dataAccess/requisito.repository');

module.exports = (container) => {
    container.register({
        ArriendoRoutes: asFunction(ArriendoRoutes).singleton(),
        ContactoRoutes: asFunction(ContactoRoutes).singleton(),
        ContratoRoutes: asFunction(ContratoRoutes).singleton(),
        ExtencionRoutes: asFunction(ExtencionRoutes).singleton(),
        GarantiaRoutes: asFunction(GarantiaRoutes).singleton(),
        RequisitoRoutes: asFunction(RequisitoRoutes).singleton(),


        ArriendoController: asClass(ArriendoController).singleton(),
        ArriendoService: asClass(ArriendoService).singleton(),
        ArriendoBusiness: asClass(ArriendoBusiness).singleton(),

        ArriendoRepository: asClass(ArriendoRepository).singleton(),
        ContactoRepository: asClass(ContactoRepository).singleton(),
        ContratoRepository: asClass(ContratoRepository).singleton(),
        ExtencionRepository: asClass(ExtencionRepository).singleton(),
        GarantiaRepository: asClass(GarantiaRepository).singleton(),
        RequisitoRepository: asClass(RequisitoRepository).singleton()
    })
    return container;
}



