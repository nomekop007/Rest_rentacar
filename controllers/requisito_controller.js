const { Requisito } = require("../db");

class RequisitoController {
    async createRequisitoArriendo(req, res) {
        const files = req.files;

        const data = {
            id_arriendo: req.params.id,
            carnetFrontal_requisito: files.fotoCarnetFrontal ?
                files.fotoCarnetFrontal[0].filename :
                null,
            carnetTrasera_requisito: files.fotoCarnetTrasera ?
                files.fotoCarnetTrasera[0].filename :
                null,
            licenciaFrontal_requisito: files.fotoLicenciaFrontal ?
                files.fotoLicenciaFrontal[0].filename :
                null,
            licenciaTrasera_requisito: files.fotoLicenciaTrasera ?
                files.fotoLicenciaTrasera[0].filename :
                null,
            targetaCredito_requisito: files.fotoTargeta ?
                files.fotoTargeta[0].filename :
                null,
            chequeGarantia_requisito: files.fotoCheque ?
                files.fotoCheque[0].filename :
                null,
            comprobanteDomicilio_requisito: files.fotoComprobante ?
                files.fotoComprobante[0].filename :
                null,
        };

        const requisito = await Requisito.create(data);

        res.json({
            success: true,
            data: requisito,
        });
    }
}

module.exports = RequisitoController;