const { DocumentoEmpresa } = require("../database/db");

class DocumentoEmpresaService {

    async postFindOrCreate(DATA, ID) {
        return await DocumentoEmpresa.findOrCreate({
            where: { rut_empresa: ID },
            defaults: DATA,
        });
    }
    async putUpdate(DATA, ID) {
        return await DocumentoEmpresa.update(DATA, {
            where: { rut_empresa: ID },
        });
    }
}


module.exports = DocumentoEmpresaService;