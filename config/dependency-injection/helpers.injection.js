const { asValue } = require('awilix');


//CONSERVAR LAS FUNCIONES EN LOS ASVALUE ??? 

const { fontsPDF, nodemailerTransporter, } = require('../../helpers/valueObject');
const sendError = require('../../helpers/sendError');
const crearToken = require('../../helpers/createToken');
const fecha = require('../../helpers/currentDate');
const hora = require('../../helpers/currentTime');
const fechahorafirma = require('../../helpers/dateTimeSignature');
const formatFecha = require('../../helpers/dateFormat');
const formatFechahora = require('../../helpers/dateTimeFormat');
const borrarImagenDeStorage = require('../../helpers/deleteImageStorage');
const ordenarArrayporFecha = require('../../helpers/orderArrayByDate');
const getRandomInt = require('../../helpers/getRandomInt');


module.exports = (container) => {
    container.register({
        sendError: asValue(sendError),
        fechahorafirma: asValue(fechahorafirma),
        borrarImagenDeStorage: asValue(borrarImagenDeStorage),
        crearToken: asValue(crearToken),
        fecha: asValue(fecha),
        fontsPDF: asValue(fontsPDF),
        formatFecha: asValue(formatFecha),
        formatFechahora: asValue(formatFechahora),
        getRandomInt: asValue(getRandomInt),
        hora: asValue(hora),
        nodemailerTransporter: asValue(nodemailerTransporter),
        ordenarArrayporFecha: asValue(ordenarArrayporFecha),
    })

    return container;
}