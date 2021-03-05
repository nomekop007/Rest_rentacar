
class ClienteController {

    constructor({ ClienteService, sendError }) {
        this._clienteService = ClienteService;
        this.sendError = sendError;
    }

    async getClientes(req, res) {
        try {
            const cliente = await this._clienteService.getClientes();
            res.json({ success: true, data: cliente });
        } catch (error) {
            this.sendError(error, req, res);
        }
    }


    async findCliente(req, res) {
        try {
            const { id } = req.params;
            const cliente = await this._clienteService.findCliente(id);
            if (cliente) {
                res.json({ success: true, data: cliente });
            } else {
                res.json({ success: false, msg: "cliente no encontrado" });
            }
        } catch (error) {
            this.sendError(error, req, res);
        }
    }

    async createCliente(req, res, next) {
        try {
            const cliente = req.body;
            const clienteRepo = await this._clienteService.createCliente(cliente);
            res.json({ success: true, data: clienteRepo });
            next();
        } catch (error) {
            this.sendError(error, req, res);
        }
    }

    async putCliente(req, res, next) {
        try {
            const cliente = req.body;
            const { id } = req.params;
            await this._clienteService.putCliente(cliente, id);
            res.json({ success: true, msg: "registro actualizado" })
            next();
        } catch (error) {
            this.sendError(error, req, res);
        }
    }

    async updateFileCliente(req, res, next) {
        try {
            const payload = {};
            const files = req.files;
            const { id } = req.params;
            payload.userAt = req.headers["userat"];
            if (files["inputCarnetFrontalCliente"]) payload.carnetFrontal = req.files["inputCarnetFrontalCliente"][0].filename;
            if (files["inputCarnetTraseraCliente"]) payload.carnetTrasera = req.files["inputCarnetTraseraCliente"][0].filename;
            await this._clienteService.updateFileCliente(id, payload);
            next();
            res.json({ success: true, msg: "archivo actualizado" });
        } catch (error) {
            this.sendError(error, req, res);
        }
    }

    async getConductores(req, res) {
        try {
            const conductores = await this._clienteService.getConductores();
            res.json({ success: true, data: conductores });
        } catch (error) {
            this.sendError(error, req, res);
        }
    }

    async findConductor(req, res) {
        try {
            const { id } = req.params;
            const conductor = await this._clienteService.findConductor(id);
            if (conductor) {
                res.json({ success: true, data: conductor });
            } else {
                res.json({ success: false, msg: "conductor no encontrado" });
            }
        } catch (error) {
            this.sendError(error, req, res);
        }
    }

    async createConductor(req, res, next) {
        try {
            const conductor = req.body;
            const newConductor = await this._clienteService.createConductor(conductor);
            res.json({ success: true, data: newConductor });
            next();
        } catch (error) {
            this.sendError(error, req, res);
        }
    }

    async putConductor(req, res, next) {
        try {
            const conductor = req.body;
            const { id } = req.params;
            await this._clienteService.putConductor(conductor, id);
            res.json({ success: true, msg: "registro actualizado" })
            next();
        } catch (error) {
            this.sendError(error, req, res);
        }
    }

    async updateFileConductor(req, res, next) {
        try {
            const files = req.files;
            const payload = {};
            const { id } = req.params;
            payload.userAt = req.headers["userat"];
            if (files["inputlicenciaFrontalConductor"]) payload.licenciaConducirFrontal = req.files["inputlicenciaFrontalConductor"][0].filename;
            if (files["inputlicenciaTraseraConductor"]) payload.licenciaConducirTrasera = req.files["inputlicenciaTraseraConductor"][0].filename;
            await this._clienteService.updateFileConductor(id, payload);
            res.json({ success: true, msg: "archivo actualizado" });
            next();
        } catch (error) {
            this.sendError(error, req, res);
        }
    }

    async getEmpresas(req, res) {
        try {
            const empresas = await this._clienteService.getEmpresas();
            res.json({ success: true, data: empresas });
        } catch (error) {
            this.sendError(error, req, res);
        }
    }

    async findEmpresa(req, res) {
        try {
            const { id } = req.params;
            const empresa = await this._clienteService.findEmpresa(id);
            if (empresa) {
                res.json({ success: true, data: empresa });
            } else {
                res.json({ success: false, msg: "empresa no encontrada" });
            }
        } catch (error) {
            this.sendError(error, req, res);
        }
    }

    async createEmpresa(req, res, next) {
        try {
            const empresa = req.body;
            const newEmpresa = await this._clienteService.createEmpresa(empresa);
            res.json({ success: true, data: newEmpresa });
            next();
        } catch (error) {
            this.sendError(error, req, res);
        }
    }

    async putEmpresa(req, res, next) {
        try {
            const empresa = req.body;
            const { id } = req.params;
            await this._clienteService.putEmpresa(empresa, id);
            res.json({ success: true, msg: "registro actualizado" })
            next();
        } catch (error) {
            this.sendError(error, req, res);
        }
    }

    async updateFileEmpresa(req, res, next) {
        try {
            const files = req.files;
            const payload = {};
            const { id } = req.params;
            payload.userAt = req.headers["userat"];
            if (files["inputCarnetFrontalEmpresa"]) payload.carnetFrontal = req.files["inputCarnetFrontalEmpresa"][0].filename;
            if (files["inputCarnetTraseraEmpresa"]) payload.carnetTrasera = req.files["inputCarnetTraseraEmpresa"][0].filename;
            if (files["inputDocumentotRol"]) payload.documentoRol = req.files["inputDocumentotRol"][0].filename;
            if (files["inputEstatuto"]) payload.documentoEstatuto = req.files["inputEstatuto"][0].filename;
            if (files["inputDocumentoVigencia"]) payload.documentoVigencia = req.files["inputDocumentoVigencia"][0].filename;
            await this._clienteService.updateFileEmpresa(id, payload);
            res.json({ success: true, msg: "archivo actualizado" });
            next();
        } catch (error) {
            this.sendError(error, req, res);
        }
    }


}

module.exports = ClienteController;