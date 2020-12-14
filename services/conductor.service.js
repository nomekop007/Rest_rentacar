const { Conductor } = require("../database/db");

class ConductorService {

    async getFindAll() {
        return await Conductor.findAll({
            attributes: [
                "rut_conductor",
                "nombre_conductor",
                "clase_conductor",
                "telefono_conductor",
            ],
        });
    }


    async getFindByPK(ID) {
        return await Conductor.findByPk(ID);
    }


    async postFindOrCreate(DATA, ID) {
        return await Conductor.findOrCreate({
            where: { rut_conductor: ID },
            defaults: DATA,
        });
    }


    async putUpdate(DATA, ID) {
        return await Conductor.update(DATA, {
            where: { rut_conductor: ID },
        });
    }

}

module.exports = ConductorService;