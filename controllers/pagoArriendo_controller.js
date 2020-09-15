const { PagoArriendo } = require("../db");

class PagoArriendoController {

    async createPagoArriendo(req, res) {
        const response = req.body;
        const [pagoArriendo, created] = await PagoArriendo.findOrCreate({
            where: { id_arriendo: response.id_arriendo },
            defaults: response,
        });
        //si existe pagoArriendo lo actualiza
        if (!created) {
            await PagoArriendo.update(response, {
                where: { id_arriendo: response.id_arriendo },
            });
        }
        res.json({
            success: true,
            msg: "registro exitoso",
            data: pagoArriendo.id_arriendo,
        });
    }

}

module.exports = PagoArriendoController;