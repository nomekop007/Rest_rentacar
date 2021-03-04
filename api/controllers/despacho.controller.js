class DespachoController {

    constructor({ DespachoService, sendError }) {
        this._despachoService = DespachoService;
        this.sendError = sendError;
    }

    async createRecepcionUsuario(req, res) {
        try {
            const { id_arriendo } = req.body;
            const id_usuario = req.usuarioId;
            const userAt = req.headers["userat"];
            const recepcionUsuario = await this._despachoService.createRecepcionUsuario(id_arriendo, id_usuario, userAt);
            res.json({ success: true, data: recepcionUsuario });
        } catch (error) {
            this.sendError(error, req, res);
        }
    }

    async revisarRecepcionUsuario(req, res) {
        try {
            const id_usuario = req.usuarioId;
            const response = await this._despachoService.revisarRecepcionUsuario(id_usuario);
            res.json({ success: true, data: response });
        } catch (error) {
            this.sendError(error, req, res);
        }
    }

    async createDespacho(req, res) {
        try {
            const despacho = req.body;
            const despachoRepo = await this._despachoService.createDespacho(despacho);
            res.json({ success: true, id_despacho: despachoRepo.id_despacho });
        } catch (error) {
            this.sendError(error, req, res);
        }
    }

    async addRevision(req, res) {
        try {
            const { arrayImages } = req.body;
            const { id } = req.params;
            const response = await this._despachoService.addRevision(id, arrayImages);
            res.json(response);
        } catch (error) {
            this.sendError(error, req, res);
        }
    }

    async createActaEntrega(req, res) {
        try {
            const { base64, id_despacho } = req.body;
            const userAt = req.headers["userat"];
            const response = await this._despachoService.createActaEntrega(id_despacho, userAt, base64)
            res.json(response);
        } catch (error) {
            this.sendError(error, req, res);
        }
    }



    async generatePDFactaEntrega(req, res) {
        try {
            const payload = req.body;
            const response = await this._despachoService.generatePDFactaEntrega(payload);
            if (response.success) {
                response.pdfDocGenerator.getBase64((base64) => {
                    res.json({
                        success: true,
                        data: {
                            firma1: response.firma1PNG,
                            firma2: response.firma2PNG,
                            base64: base64
                        }
                    })
                });
            } else {
                res.json(response);
            }
        } catch (error) {
            this.sendError(error, req, res);
        }
    }

    async sendEmailActaEntrega(req, res) {
        try {
            const { id_arriendo } = req.body;
            const responseEmail = await this._despachoService.sendEmailActaEntrega(id_arriendo)
            res.json({ success: true, msg: responseEmail });
        } catch (error) {
            this.sendError(error, req, res);
        }
    }

    async guardarFotosVehiculos(req, res) {
        try {
            const files = req.files;
            const { id } = req.params;
            const userAt = req.headers["userat"];
            await this._despachoService.guardarFotosVehiculos(id, userAt, files);
            res.json({ success: true, msg: "foto subidas" });
        } catch (error) {
            this.sendError(error, req, res);
        }
    }


    async findActaEntrega(req, res) {
        try {
            const { id } = req.params;
            const response = await this._despachoService.findActaEntrega(id);
            res.json({
                success: true,
                data: response,
            });
        } catch (error) {
            this.sendError(error, req, res);
        }
    }
}

module.exports = DespachoController;