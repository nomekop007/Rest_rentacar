const { Requisito } = require("../db");

class RequisitoController {
  async createRequisitoArriendo(req, res) {
    const files = req.files;

    const data = {
      id_arriendo: req.params.id,
      carnetFrontal_requisito: files.fotoCarnetFrontal
        ? files.fotoCarnetFrontal[0].filename
        : null,
      carnetTrasera_requisito: files.fotoCarnetTrasera
        ? files.fotoCarnetTrasera[0].filename
        : null,
      tarjetaCreditoFrontal_requisito: files.fotoTarjetaFrontal
        ? files.fotoTarjetaFrontal[0].filename
        : null,
      tarjetaCreditoTrasera_requisito: files.fotoTarjetaTrasera
        ? files.fotoTarjetaTrasera[0].filename
        : null,
      licenciaConducir_requisito: files.fotoLicencia
        ? files.fotoLicencia[0].filename
        : null,
      chequeGarantia_requisito: files.fotoCheque
        ? files.fotoCheque[0].filename
        : null,
      comprobanteDomicilio_requisito: files.fotoComprobante
        ? files.fotoComprobante[0].filename
        : null,
    };

    const requisito = await Requisito.create(data);

    res.json({
      success: true,
      data: requisito,
    });
  }
}

module.exports = RequisitoController;
