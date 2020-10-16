const { Empresa } = require("../db");

class EmpresaController {
    async getEmpresas(req, res) {
        const empresas = await Empresa.findAll({
            attributes: [
                "rut_empresa",
                "nombre_empresa",
                "rol_empresa",
                "correo_empresa",
            ],
        });
        res.json({
            success: true,
            data: empresas,
        });
    }

    async findEmpresa(req, res) {
        const empresa = await Empresa.findByPk(req.params.id);

        if (empresa) {
            res.json({
                success: true,
                data: empresa,
            });
        } else {
            res.json({
                success: false,
                msg: "sin datos",
            });
        }

    }

    async createEmpresa(req, res) {
        const response = req.body;

        const [empresa, created] = await Empresa.findOrCreate({
            where: { rut_empresa: response.rut_empresa },
            defaults: response,
        });
        if (!created) {
            await Empresa.update(response, {
                where: { rut_empresa: empresa.rut_empresa },
            });
        }

        res.json({
            success: true,
            data: empresa,
        });
    }
}

module.exports = EmpresaController;