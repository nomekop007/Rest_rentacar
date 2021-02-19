const { Conductor, DocumentoConductor } = require("../config/database/db");

class ConductorService {

    async getFindAll() {
        return await Conductor.findAll();
    }


    async getFindByPK(ID) {
        return await Conductor.findByPk(ID);
    }

    async getFindOne(ID) {
        return await Conductor.findOne({
            where: { rut_conductor: ID },
            include: [{ model: DocumentoConductor, attributes: ["licenciaConducirFrontal", "licenciaConducirTrasera"] }]
        })
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