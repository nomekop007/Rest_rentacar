const { DocumentoConductor } = require("../config/database/db");

class DocumentoConductorService {

    async postFindOrCreate(DATA, ID) {
        return await DocumentoConductor.findOrCreate({
            where: { rut_conductor: ID },
            defaults: DATA,
        });
    }

    async putUpdate(DATA, ID) {
        return await DocumentoConductor.update(DATA, {
            where: { rut_conductor: ID },
        });
    }

}

module.exports = DocumentoConductorService;