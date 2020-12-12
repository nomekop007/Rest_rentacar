const GarantiaService = require("../services/garantia.service");
const { sendError } = require("../helpers/components");
class GarantiaController {
    constructor() {
        this.serviceGarantia = new GarantiaService();
    }


    async createGarantia(req, res) {
        try {
            const response = req.body;
            switch (response.id_modoPago) {
                case "EFECTIVO":
                    response.id_modoPago = 1;
                    response.numeroTarjeta_garantia = null;
                    response.fechaTarjeta_garantia = null;
                    response.codigoTarjeta_garantia = null;
                    response.numeroCheque_garantia = null;
                    response.codigoCheque_garantia = null;
                    response.folioTarjeta_garantia = null;
                    response.bancoCheque_garantia = null;
                    break;
                case "CHEQUE":
                    response.id_modoPago = 2;
                    response.monto_garantia = null;
                    response.numeroTarjeta_garantia = null;
                    response.fechaTarjeta_garantia = null;
                    response.codigoTarjeta_garantia = null;
                    response.folioTarjeta_garantia = null;
                    break;
                case "TARJETA":
                    response.id_modoPago = 3;
                    response.numeroCheque_garantia = null;
                    response.codigoCheque_garantia = null;
                    response.bancoCheque_garantia = null;
                    break;
            }
            const garantia = await this.serviceGarantia.postCreate(response);
            res.json({
                success: true,
                data: garantia,
                msg: "registro exitoso",
            });
        } catch (error) {
            sendError(error, res);
        }
    }


}

module.exports = GarantiaController;