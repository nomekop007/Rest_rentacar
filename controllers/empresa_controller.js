const { Empresa } = require("../db");
const { sendError } = require("../helpers/components");

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
            sendError(error, res);
        }
    }

    async findEmpresa(req, res) {
        try {
            const empresa = await Empresa.findByPk(req.params.id);

            if (empresa) {
                res.json({
                    success: true,
                    data: empresa,
                });
            } else {
                res.json({
                    success: false,
                    msg: "error: " + "empresa no encontrada",
                });
            }
        } catch (error) {
            sendError(error, res);
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
            sendError(error, res);
        }
    }
}

module.exports = EmpresaController;