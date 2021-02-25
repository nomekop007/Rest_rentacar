const { asClass, asFunction } = require('awilix');

const ClienteRoutes = require('../../../api/routes/apis/clientes.routes');
const EmpresaRoutes = require('../../../api/routes/apis/empresas.routes');
const ConductorRoutes = require('../../../api/routes/apis/conductores.routes');

const ClienteController = require('../../../api/controllers/cliente.controller');
const ClienteService = require('../../../contexts/clientes/service/cliente.service');
const ClienteBusiness = require('../../../contexts/clientes/domain/cliente.business');

const ConductorRepository = require('../../../contexts/clientes/dataAccess/conductor.repository');
const EmpresaRepository = require('../../../contexts/clientes/dataAccess/empresa.repository');
const ClienteRepository = require('../../../contexts/clientes/dataAccess/cliente.repository');
const DocumentoClienteRepository = require('../../../contexts/clientes/dataAccess/documentoCliente.repository');
const DocumentoConductorRepository = require('../../../contexts/clientes/dataAccess/documentoConductor.repository');
const DocumentoEmpresaRepository = require('../../../contexts/clientes/dataAccess/documentoEmpresa.repository');



module.exports = (container) => {
    container.register({
        ClienteRoutes: asFunction(ClienteRoutes).singleton(),
        ConductorRoutes: asFunction(ConductorRoutes).singleton(),
        EmpresaRoutes: asFunction(EmpresaRoutes).singleton(),

        ClienteController: asClass(ClienteController).singleton(),
        ClienteService: asClass(ClienteService).singleton(),
        ClienteBusiness: asClass(ClienteBusiness).singleton(),

        EmpresaRepository: asClass(EmpresaRepository).singleton(),
        ConductorRepository: asClass(ConductorRepository).singleton(),
        ClienteRepository: asClass(ClienteRepository).singleton(),
        DocumentoClienteRepository: asClass(DocumentoClienteRepository).singleton(),
        DocumentoConductorRepository: asClass(DocumentoConductorRepository).singleton(),
        DocumentoEmpresaRepository: asClass(DocumentoEmpresaRepository).singleton(),


    })
    return container;
}



