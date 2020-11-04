const { Requisito } = require("../database/db");
const { sendError } = require("../helpers/components");

class RequisitoController {
    async createRequisitoArriendo(req, res) {
        try {
            const files = req.files;
            console.log(files);
            const data = {
                id_arriendo: req.params.id,
                carnetFrontal_requisito: files.fotoCarnetFrontal ?
                    files.fotoCarnetFrontal[0].filename :
                    null,
                carnetTrasera_requisito: files.fotoCarnetTrasera ?
                    files.fotoCarnetTrasera[0].filename :
                    null,
                licenciaConducirFrontal_requisito: files.fotoLicenciaFrontal ?
                    files.fotoLicenciaFrontal[0].filename :
                    null,
                licenciaConducirTrasera_requisito: files.fotoLicenciaTrasera ?
                    files.fotoLicenciaTrasera[0].filename :
                    null,
                tarjetaCredito_requisito: files.fotoTarjeta ?
                    files.fotoTarjeta[0].filename :
                    null,
                chequeGarantia_requisito: files.fotoCheque ?
                    files.fotoCheque[0].filename :
                    null,
                comprobanteDomicilio_requisito: files.fotoComprobante ?
                    files.fotoComprobante[0].filename :
                    null,
                cartaRemplazo_requisito: files.fotoCartaRemplazo ?
                    files.fotoCartaRemplazo[0].filename :
                    null,
                boletaEfectivo_requisito: files.fotoBoletaEfectivo ?
                    files.fotoBoletaEfectivo[0].filename :
                    null,
            };

            const requisito = await Requisito.create(data);

            res.json({
                success: true,
                data: requisito,
            });
        } catch (error) {
            sendError(error, res);
        }
    }
}

module.exports = RequisitoController;