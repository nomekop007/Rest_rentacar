class EmpresaController {

    constructor({ EmpresaService, DocumentoEmpresaService, sendError }) {
        this._serviceEmpresa = EmpresaService;
        this._serviceDocEmpresa = DocumentoEmpresaService;
        this.sendError = sendError;
    }

    async getEmpresas(req, res) {
        try {
            const empresas = await this._serviceEmpresa.getFindAll();
            res.json({
                success: true,
                data: empresas,
            });
        } catch (error) {
            this.sendError(error, req, res);
        }
    }


    async findEmpresa(req, res) {
        try {
            const empresa = await this._serviceEmpresa.getFindOne(req.params.id);
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
            this.sendError(error, req, res);
        }
    }


    async createEmpresa(req, res, next) {
        try {
            const response = req.body;
            const [empresa, created] = await this._serviceEmpresa.postfindOrCreate(response, response.rut_empresa);
            if (!created) await this._serviceEmpresa.putUpdate(response, response.rut_empresa);
            const newEmpresa = await this._serviceEmpresa.getFindByPk(response.rut_empresa);
            res.json({
                success: true,
                data: newEmpresa,
            });
            if (created) next();
        } catch (error) {
            this.sendError(error, req, res);
        }
    }

    async putEmpresa(req, res, next) {
        try {
            const response = req.body;
            await this._serviceEmpresa.putUpdate(response, req.params.id);
            res.json({
                success: true,
                msg: "registro actualizado"
            })
            next();
        } catch (error) {
            this.sendError(error, req, res);
        }
    }

    async updateFile(req, res, next) {
        try {
            const files = req.files;
            const data = {};
            data.userAt = req.headers["userat"];
            if (files["inputCarnetFrontalEmpresa"]) data.carnetFrontal = req.files["inputCarnetFrontalEmpresa"][0].filename;
            if (files["inputCarnetTraseraEmpresa"]) data.carnetTrasera = req.files["inputCarnetTraseraEmpresa"][0].filename;
            if (files["inputDocumentotRol"]) data.documentoRol = req.files["inputDocumentotRol"][0].filename;
            if (files["inputEstatuto"]) data.documentoEstatuto = req.files["inputEstatuto"][0].filename;
            if (files["inputDocumentoVigencia"]) data.documentoVigencia = req.files["inputDocumentoVigencia"][0].filename;
            const [empresa, created] = await this._serviceDocEmpresa.postFindOrCreate(data, req.params.id);
            if (!created) await this._serviceDocEmpresa.putUpdate(data, req.params.id);
            res.json({
                success: true,
                msg: "archivo actualizado",
            });
            next();
        } catch (error) {
            this.sendError(error, req, res);
        }
    }


}

module.exports = EmpresaController;