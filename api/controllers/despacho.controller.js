const sendError = require('../../helpers/sendError');

class DespachoController {

    constructor({ DespachoService }) {
        this._despachoService = DespachoService;
    }

    async createBloqueoUsuario(req, res) {
        try {
            const { id_arriendo, tipo } = req.body;
            const id_usuario = req.usuarioId;
            const userAt = req.headers["userat"];
            const bloqueoUsuario = await this._despachoService.createBloqueoUsuario(id_arriendo, id_usuario, tipo, userAt);
            res.json({ success: true, data: bloqueoUsuario });
        } catch (error) {
            sendError(error, req, res);
        }
    }

    async revisarBloqueoUsuario(req, res) {
        try {
            const id_usuario = req.usuarioId;
            const response = await this._despachoService.revisarBloqueoUsuario(id_usuario);
            res.json({ success: true, data: response });
        } catch (error) {
            sendError(error, req, res);
        }
    }

    async createDespacho(req, res) {
        try {
            const despacho = req.body;
            const despachoRepo = await this._despachoService.createDespacho(despacho);
            res.json({ success: true, id_despacho: despachoRepo.id_despacho });
        } catch (error) {
            sendError(error, req, res);
        }
    }

    async addRevision(req, res) {
        try {
            const { arrayImages } = req.body;
            const { id } = req.params;
            const userAt = req.headers["userat"];
            const response = await this._despachoService.addRevision(id, arrayImages, userAt);
            res.json(response);
        } catch (error) {
            sendError(error, req, res);
        }
    }

    async createActaEntrega(req, res) {
        try {
            const { base64, id_despacho } = req.body;
            const userAt = req.headers["userat"];
            const response = await this._despachoService.createActaEntrega(id_despacho, userAt, base64);
            res.json(response);
        } catch (error) {
            sendError(error, req, res);
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
            sendError(error, req, res);
        }
    }

    async generarPDFactaRecepcion(req, res) {
        try {
            const payload = req.body;
            const response = await this._despachoService.generatePDFactaRecepcion(payload);
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
            sendError(error, req, res);
        }
    }

    async sendEmailActaEntrega(req, res) {
        try {
            const { id_arriendo } = req.body;
            const responseEmail = await this._despachoService.sendEmailActaEntrega(id_arriendo)
            res.json({ success: true, msg: responseEmail });
        } catch (error) {
            sendError(error, req, res);
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
            sendError(error, req, res);
        }
    }

    async guardarFotoRecepcion(req, res) {
        try {

            const { id } = req.params;
            const name_file = req.file.filename;
            const userAt = req.headers["userat"];
            const response = await this._despachoService.guardarFotoRecepcion(id, userAt, name_file);
            res.json(response);
        } catch (error) {
            sendError(error, req, res);
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
            sendError(error, req, res);
        }
    }


    async eliminarFotosRecepcion(req, res) {
        try {
            const { id } = req.params;
            const response = await this._despachoService.eliminarFotosRecepcion(id);
            res.json(response)
        } catch (error) {
            sendError(error, req, res);
        }
    }


    async eliminarFotosDespacho(req, res) {
        try {
            const { id } = req.params;
            const response = await this._despachoService.eliminarFotosDespacho(id);
            res.json(response)
        } catch (error) {
            sendError(error, req, res);
        }
    }


    async confirmarRecepcionArriendo(req, res) {
        try {
            const { id_arriendo, base64 } = req.body;
            const response = await this._despachoService.confirmarRecepcionArriendo(id_arriendo, base64);
            res.json(response);
        } catch (error) {
            sendError(error, req, res);
        }
    }
}

module.exports = DespachoController;