const { Conductor } = require("../db");
const { sendError } = require("../helpers/components");

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
            sendError(error, res);
        }
    }

    async findConductor(req, res) {
        try {
            const conductor = await Conductor.findByPk(req.params.id);

            if (conductor) {
                res.json({
                    success: true,
                    data: conductor,
                });
            } else {
                res.json({
                    success: false,
                    msg: "error: " + "conductor no encontrado",
                });
            }
        } catch (error) {
            sendError(error, res);
        }
    }

    async createConductor(req, res, next) {
        try {
            const response = req.body;
            console.log(response);
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
            sendError(error, res);
        }
    }
}

module.exports = ConductorController;