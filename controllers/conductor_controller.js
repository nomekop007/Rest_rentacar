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
            console.log(error);
            res.status(501).json({
                success: false,
                msg: "Server error 501",
            });
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
            console.log(error);
            res.status(501).json({
                success: false,
                msg: "Server error 501",
            });
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
            console.log(error);
            res.status(501).json({
                success: false,
                msg: "Server error 501",
            });
        }
    }
}

module.exports = ConductorController;