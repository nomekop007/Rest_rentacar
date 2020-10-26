const { Empresa } = require("../db");

class EmpresaController {
    async getEmpresas(req, res) {
        try {
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
        } catch (error) {
            res.json({
                success: false,
                msg: "error: " + error,
            });
        }
    }

    async findEmpresa(req, res) {
        try {
            const empresa = await Empresa.findByPk(req.params.id);
            res.json({
                success: true,
                data: empresa,
            });
        } catch (error) {
            res.json({
                success: false,
                msg: "error: " + error,
            });
        }
    }

    async createEmpresa(req, res, next) {
        try {
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
            if (created) {
                next(empresa.logging);
            }
        } catch (error) {
            res.json({
                success: false,
                msg: "error: " + error,
            });
        }
    }
}

module.exports = EmpresaController;