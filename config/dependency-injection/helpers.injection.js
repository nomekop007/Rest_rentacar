const { asValue } = require('awilix');

const { sendError, fechahorafirma, borrarImagenDeStorage, crearToken
    , fecha, fontsPDF, formatFecha, formatFechahora, getRandomInt, hora,
    nodemailerTransporter, ordenarArrayporFecha } = require('../../api/helpers/components')

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