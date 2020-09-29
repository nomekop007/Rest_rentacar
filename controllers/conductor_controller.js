const { Conductor } = require("../db");

class ConductorController {
    async getConductores(req, res) {
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
    }

    async findConductor(req, res) {
        const conductor = await Conductor.findByPk(req.params.id);

        if (conductor) {
            res.json({
                success: true,
                data: conductor,
            });
        } else {
            res.json({
                success: false,
                msg: "sin datos",
            });
        }
    }

    async createConductor(req, res) {
        const response = req.body;
        const dataConductor = {
            rut_conductor: response.rut_conductor,
            nombre_conductor: response.nombre_conductor,
            telefono_conductor: response.telefono_conductor,
            clase_conductor: response.clase_conductor,
            numero_conductor: response.numero_conductor,
            municipalidad_conductor: response.municipalidad_conductor,
            direccion_conductor: response.direccion_conductor,
            vcto_conductor: response.vcto_conductor == "" ? null : response.vcto_conductor,
        };

        const [conductor, created] = await Conductor.findOrCreate({
            where: { rut_conductor: response.rut_conductor },
            defaults: dataConductor,
        });
        //si existe conductor lo actualiza
        if (!created) {
            await Conductor.update(dataConductor, {
                where: { rut_conductor: conductor.rut_conductor },
            });
        }

        res.json({
            success: true,
            data: conductor,
        });
    }
}

module.exports = ConductorController;