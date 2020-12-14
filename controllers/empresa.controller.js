const EmpresaService = require("../services/empresa.service");
const { sendError } = require("../helpers/components");

class EmpresaController {
    constructor() {
        this.serviceEmpresa = new EmpresaService();
    }

    async getEmpresas(req, res) {
        try {
            const empresas = await this.serviceEmpresa.getFindAll();
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
            const empresa = await this.serviceEmpresa.getFindByPk(req.params.id);
            if (empresa) {
                res.json({
                    success: true,
                    data: empresa,
                });
            } else {
                res.json({
                    success: false,
                    msg: "empresa no encontrada",
                });
            }
        } catch (error) {
            sendError(error, res);
        }
    }


    async createEmpresa(req, res, next) {
        try {
            const response = req.body;
            const [empresa, created] = await this.serviceEmpresa.postfindOrCreate(response, response.rut_empresa);
            if (!created) await this.serviceEmpresa.putUpdate(response, response.rut_empresa);
            const newEmpresa = await this.serviceEmpresa.getFindByPk(response.rut_empresa);
            res.json({
                success: true,
                data: newEmpresa,
            });
            if (created) next(empresa.logging);
        } catch (error) {
            sendError(error, res);
        }
    }


}

module.exports = EmpresaController;