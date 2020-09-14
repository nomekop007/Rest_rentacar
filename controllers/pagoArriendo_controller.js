const { PagoArriendo, Cliente, Empresa, Vehiculo, Accesorio, Arriendo } = require("../db");

class PagoArriendoController {

    async postPagoArriendo(req, res) {
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

        const arriendo = await Arriendo.findAll({
            where: { id_arriendo: response.id_arriendo },
            include: [
                { model: Cliente, },
                { model: Empresa },
                { model: Vehiculo },
                { model: Accesorio },
                { model: PagoArriendo }
            ],
        });
        res.json({
            success: true,
            msg: "registro exitoso",
            data: arriendo,
        });
    }

}

module.exports = PagoArriendoController;