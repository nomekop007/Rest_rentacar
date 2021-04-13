const sendError = require('../../helpers/sendError');

class LicitacionController {

    constructor({ LicitacionService }) {
        this._licitacionService = LicitacionService;
    }

    async getLicitaciones(req, res) {
        try {
            const licitaciones = await this._licitacionService.getLicitaciones();
            res.json({ success: true, data: licitaciones });
        } catch (error) {
            sendError(error, req, res);
        }
    }

    async getIngresosLicitaciones(req, res) {
        try {
            const ingresos = await this._licitacionService.getIngresosLicitaciones();
            res.json({ success: true, data: ingresos });
        } catch (error) {
            sendError(error, req, res);
        }
    }


    async createIngresoLicitacion(req, res) {
        try {
            const ingresoLicitacion = req.body;
            const ingreso = await this._licitacionService.createIngresoLicitacion(ingresoLicitacion);
            res.json({ success: true, data: ingreso });
        } catch (error) {
            sendError(error, req, res);
        }
    }


    async uploadRespaldoIngresoLicitacion(req, res) {
        try {
            const { id_ingresoLicitacion, usertAt } = req.body;
            const documento = req.file.filename;
            const respaldo = await this._licitacionService.uploadRespaldoIngresoLicitacion(usertAt, documento, id_ingresoLicitacion);
            res.json({ success: true, data: respaldo });
        } catch (error) {
            sendError(error, req, res);
        }
    }

}

module.exports = LicitacionController;