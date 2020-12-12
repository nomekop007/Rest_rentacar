const { Empresa } = require('../database/db');

class EmpresaService {

    async getFindAll() {
        return await Empresa.findAll({
            attributes: [
                "rut_empresa",
                "nombre_empresa",
                "rol_empresa",
                "correo_empresa",
            ],
        });
    }


    async getFindByPk(ID) {
        return await Empresa.findByPk(ID);
    }


    async postfindOrCreate(DATA, ID) {
        return await Empresa.postfindOrCreate({
            where: { rut_empresa: ID },
            defaults: DATA,
        });
    }


    async putUpdate(DATA, ID) {
        return await Empresa.update(DATA, {
            where: { rut_empresa: ID },
        });
    }
}

module.exports = EmpresaService;