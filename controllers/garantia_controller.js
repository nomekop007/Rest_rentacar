const { Garantia } = require("../db");

class GarantiaController {
    async createGarantia(req, res) {
        const response = req.body;

        const dataGarantia = {
            userAt: response.userAt,
            id_arriendo: response.id_arriendo,
            monto_garantia: response.monto_garantia,
        };

        switch (response.id_modoPago) {
            case "EFECTIVO":
                dataGarantia.id_modoPago = 1;
                break;
            case "CHEQUE":
                dataGarantia.numeroCheque_garantia = response.numeroCheque_garantia;
                dataGarantia.codigoCheque_garantia = response.codigoCheque_garantia;
                dataGarantia.id_modoPago = 2;
                break;
            case "TARJETA":
                dataGarantia.numeroTarjeta_garantia = response.numeroTarjeta_garantia;
                dataGarantia.fechaTarjeta_garantia = response.fechaTarjeta_garantia;
                dataGarantia.codigoTarjeta_garantia = response.codigoTarjeta_garantia;
                dataGarantia.id_modoPago = 3;
                break;
            default:
                res.json({
                    success: false,
                    msg: "ah ocurrido un error al guardar la garantia",
                });
                return;
        }

        const garantia = await Garantia.create(dataGarantia);

        res.json({
            success: true,
            data: garantia,
            msg: "registro exitoso",
        });
    }
}

module.exports = GarantiaController;