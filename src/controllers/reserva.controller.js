const ReservaService = require('../services/reserva.service');
const { sendError } = require('../helpers/components');

class ReservaController {

    constructor() {
        this._serviceReserva = new ReservaService();
    }


    async getReservas(req, res) {
        try {
            const { sucursal } = req.query;
            const reservas = await this._serviceReserva.getFindAll(sucursal);
            res.json({ success: true, data: reservas });
        } catch (error) {
            sendError(error, req, res);
        }
    }

    async findReserva(req, res) {
        try {
            const reserva = await this._serviceReserva.getFindOne(req.params.id);
            res.json({ success: true, data: reserva });
        } catch (error) {
            sendError(error, req, res);
        }
    }

    async createReserva(req, res, next) {
        try {
            const reserva = await this._serviceReserva.postCreateWithClient(req.body);
            res.json({ success: true, data: reserva, msg: "reserva agregada!" });
            next();
        } catch (error) {
            sendError(error, req, res);
        }
    }

    async updateReserva(req, res, next) {
        try {
            await this._serviceReserva.putUpdate(req.body, req.params.id);
            res.json({ success: true, msg: 'reserva modificada' });
            next();
        } catch (error) {
            sendError(error, req, res);
        }
    }

    async deleteReserva(req, res, next) {
        try {
            await this._serviceReserva.deleteDestroy(req.params.id);
            res.json({ success: true, msg: 'reserva eliminada' });
            next();
        } catch (error) {
            sendError(error, req, res);
        }
    }

}

module.exports = ReservaController;

