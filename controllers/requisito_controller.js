const { Requisito } = require("../database/db");
const { sendError } = require("../helpers/components");
const path = require('path');
class RequisitoController {
    async createRequisitoArriendo(req, res) {
        try {

            const files = req.files;
            console.log(files);
            const data = {
                id_arriendo: req.params.id,
                userAt: req.headers["userat"],
                carnetFrontal_requisito: files.inputCarnetFrontal ?
                    files.inputCarnetFrontal[0].filename : null,
                carnetTrasera_requisito: files.inputCarnetTrasera ?
                    files.inputCarnetTrasera[0].filename : null,
                licenciaConducirFrontal_requisito: files.inputlicenciaFrontal ?
                    files.inputlicenciaFrontal[0].filename : null,
                licenciaConducirTrasera_requisito: files.inputlicenciaTrasera ?
                    files.inputlicenciaTrasera[0].filename : null,
                tarjetaCredito_requisito: files.inputTarjeta ?
                    files.inputTarjeta[0].filename : null,
                chequeGarantia_requisito: files.inputCheque ?
                    files.inputCheque[0].filename : null,
                comprobanteDomicilio_requisito: files.inputComprobante ?
                    files.inputComprobante[0].filename : null,
                cartaRemplazo_requisito: files.inputCartaRemplazo ?
                    files.inputCartaRemplazo[0].filename : null,
                boletaEfectivo_requisito: files.inputBoletaEfectivo ?
                    files.inputBoletaEfectivo[0].filename : null,
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