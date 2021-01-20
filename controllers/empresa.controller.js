const EmpresaService = require("../services/empresa.service");
const DocumentoEmpresaService = require("../services/documentoEmpresa.service");

const { sendError } = require("../helpers/components");

class EmpresaController {
    constructor() {
        this.serviceEmpresa = new EmpresaService();
        this.serviceDocEmpresa = new DocumentoEmpresaService();
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
            const empresa = await this.serviceEmpresa.getFindOne(req.params.id);
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

    async putEmpresa(req, res, next) {
        try {
            const response = req.body;
            const empresa = await this.serviceEmpresa.putUpdate(response, req.params.id);
            res.json({
                success: true,
                msg: "registro actualizado"
            })
            next(empresa.logging);
        } catch (error) {
            sendError(error, res);
        }
    }

    async updateFile(req, res) {
        try {
            const files = req.files;
            const data = {};
            data.userAt = req.headers["userat"];
            if (files["inputCarnetFrontalEmpresa"]) data.carnetFrontal = req.files["inputCarnetFrontalEmpresa"][0].filename;
            if (files["inputCarnetTraseraEmpresa"]) data.carnetTrasera = req.files["inputCarnetTraseraEmpresa"][0].filename;
            if (files["inputDocumentotRol"]) data.documentoRol = req.files["inputDocumentotRol"][0].filename;
            if (files["inputEstatuto"]) data.documentoEstatuto = req.files["inputEstatuto"][0].filename;
            if (files["inputDocumentoVigencia"]) data.documentoVigencia = req.files["inputDocumentoVigencia"][0].filename;
            console.log(data);
            const [empresa, created] = await this.serviceDocEmpresa.postFindOrCreate(data, req.params.id);
            if (!created) await this.serviceDocEmpresa.putUpdate(data, req.params.id);
            res.json({
                success: true,
                msg: "archivo actualizado",
            });
        } catch (error) {
            sendError(error, res);
        }
    }


}

module.exports = EmpresaController;