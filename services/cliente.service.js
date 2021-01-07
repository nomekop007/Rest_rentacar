const { Cliente, DocumentoCliente } = require("../database/db");

class ClienteService {

    async getFindAll() {
        return await Cliente.findAll({
            attributes: [
                "rut_cliente",
                "nombre_cliente",
                "telefono_cliente",
                "correo_cliente",
            ],
        });
    }

    async getFindByPk(ID) {
        return await Cliente.findByPk(ID);
    }

    async getFindOne(ID) {
        return await Cliente.findOne({
            where: { rut_cliente: ID },
            include: [{ model: DocumentoCliente, attributes: ["carnetFrontal", "carnetTrasera"] }]
        })
    }

    async postFindOrCreate(DATA, ID) {
        return await Cliente.findOrCreate({
            where: { rut_cliente: ID },
            defaults: DATA,
        });
    }

    async putUpdate(DATA, ID) {
        return await Cliente.update(DATA, {
            where: { rut_cliente: ID },
        });
    }

}

module.exports = ClienteService;