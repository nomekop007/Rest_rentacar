const { Garantia } = require("../db");

class GarantiaController {
    async createGarantia(req, res, next) {
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
                    break;
                case "CHEQUE":
                    response.id_modoPago = 2;
                    response.monto_garantia = null;
                    response.numeroTarjeta_garantia = null;
                    response.fechaTarjeta_garantia = null;
                    response.codigoTarjeta_garantia = null;
                    break;
                case "TARJETA":
                    response.id_modoPago = 3;
                    response.numeroCheque_garantia = null;
                    response.codigoCheque_garantia = null;
                    break;
            }
            const garantia = await Garantia.create(response);

            res.json({
                success: true,
                data: garantia,
                msg: "registro exitoso",
            });
            next(garantia.logging);
        } catch (error) {
            res.json({
                success: false,
                msg: "error: " + error,
            });
        }
    }
}

module.exports = GarantiaController;