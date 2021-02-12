const { asClass, asFunction } = require('awilix');

const ContactoRoutes = require('../../../routes/api/contactos.routes');
const ContactoController = require('../../../controllers/contacto.controller');
const ContactoService = require('../../../services/contacto.service')

module.exports = (container) => {
    container.register({
        ContactoRoutes: asFunction(ContactoRoutes).singleton(),
        ContactoController: asClass(ContactoController).singleton(),
        ContactoService: asClass(ContactoService).singleton()
    })
    return container;
}


