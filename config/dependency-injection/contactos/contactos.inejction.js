const { asClass, asFunction } = require('awilix');

const ContactoRoutes = require('../../../api/routes/apis/contactos.routes');
const ContactoController = require('../../../api/controllers/contacto.controller');
const ContactoService = require('../../../contexts/arriendos/dataAccess/contacto.repository')

module.exports = (container) => {
    container.register({
        ContactoRoutes: asFunction(ContactoRoutes).singleton(),
        ContactoController: asClass(ContactoController).singleton(),
        ContactoService: asClass(ContactoService).singleton()
    })
    return container;
}


