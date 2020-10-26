const { Conductor } = require("../db");

class ConductorController {
    async getConductores(req, res) {
        try {
            const conductores = await Conductor.findAll({
                attributes: [
                    "rut_conductor",
                    "nombre_conductor",
                    "clase_conductor",
                    "telefono_conductor",
                ],
            });
            res.json({
                success: true,
                data: conductores,
            });
        } catch (error) {
            res.json({
                success: false,
                msg: "error: " + error,
            });
        }
    }

    async findConductor(req, res) {
        try {
            const conductor = await Conductor.findByPk(req.params.id);
            res.json({
                success: true,
                data: conductor,
            });
        } catch (error) {
            res.json({
                success: false,
                msg: "error: " + error,
            });
        }
    }

    async createConductor(req, res, next) {
        try {
            const response = req.body;

            if (response.vcto_conductor == "") {
                response.vcto_conductor = null;
            }

            const [conductor, created] = await Conductor.findOrCreate({
                where: { rut_conductor: response.rut_conductor },
                defaults: response,
            });
            //si existe conductor lo actualiza
            if (!created) {
                await Conductor.update(response, {
                    where: { rut_conductor: conductor.rut_conductor },
                });
            }

            res.json({
                success: true,
                data: conductor,
            });
            if (created) {
                next(conductor.logging);
            }
        } catch (error) {
            res.json({
                success: false,
                msg: "error: " + error,
            });
        }
    }
}

module.exports = ConductorController;