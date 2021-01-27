const ReservaService = require('../services/reserva.service');
const { sendError } = require('../helpers/components');

class ReservaController {

    constructor() {
        this._serviceReserva = new ReservaService();
    }


    async getReservas(req, res) {
        try {
            const reservas = await this._serviceReserva.getFindAll();
            res.json({ success: true, data: reservas });
        } catch (error) {
            sendError(error, res);
        }
    }

    async findReserva(req, res) {
        try {
            const reserva = await this._serviceReserva.getFindOne(req.params.id);
            res.json({ success: true, data: reserva });
        } catch (error) {
            sendError(error, res);
        }
    }

    async createReserva(req, res, next) {
        try {
            const reserva = await this._serviceReserva.postCreate(req.body);
            res.json({ success: true, data: reserva, msg: "reserva agregada!" });
            next();
        } catch (error) {
            sendError(error, res);
        }
    }

    async updateReserva(req, res, next) {
        try {
            await this._serviceReserva.putUpdate(req.body, req.params.id);
            res.json({ success: true, msg: 'reserva modificada' });
            next();
        } catch (error) {
            sendError(error, res);
        }
    }

    async deleteReserva(req, res, next) {
        try {
            await this._serviceReserva.deleteReserva(req.params.id);
            res.json({ success: true, msg: 'reserva eliminada' });
            next();
        } catch (error) {
            sendError(error, res);
        }
    }

}

module.exports = ReservaController;

