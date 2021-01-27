const { DocumentoCliente } = require("../database/db");

class DocumentoClienteSerivce {
    async postFindOrCreate(DATA, ID) {
        return await DocumentoCliente.findOrCreate({
            where: { rut_cliente: ID },
            defaults: DATA,
        });
    }

    async putUpdate(DATA, ID) {
        return await DocumentoCliente.update(DATA, {
            where: { rut_cliente: ID },
        });
    }

}

module.exports = DocumentoClienteSerivce;