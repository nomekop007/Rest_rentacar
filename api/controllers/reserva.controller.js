class ReservaController {

    constructor({ ReservaService, sendError }) {
        this.sendError = sendError;
        this._reservaService = ReservaService;
    }


    async getReservas(req, res) {
        try {
            const { sucursal } = req.query;
            const reservas = await this._reservaService.getReservasBySucursal(sucursal);
            res.json({ success: true, data: reservas });
        } catch (error) {
            this.sendError(error, req, res);
        }
    }

    async findReserva(req, res) {
        try {
            const { id } = req.params;
            const reserva = await this._reservaService.findReserva(id);
            res.json({ success: true, data: reserva });
        } catch (error) {
            this.sendError(error, req, res);
        }
    }

    async createReserva(req, res, next) {
        try {
            const reserva = req.body;
            const reservaRepo = await this._reservaService.createReserva(reserva);
            res.json({ success: true, data: reservaRepo, msg: "reserva agregada!" });
            next();
        } catch (error) {
            this.sendError(error, req, res);
        }
    }

    async updateReserva(req, res, next) {
        try {
            const { id } = req.params;
            const reserva = req.body;
            await this._reservaService.updateReserva(reserva, id);
            res.json({ success: true, msg: 'reserva modificada' });
            next();
        } catch (error) {
            this.sendError(error, req, res);
        }
    }

    async deleteReserva(req, res, next) {
        try {
            const { id } = req.params;
            await this._reservaService.deleteReserva(id);
            res.json({ success: true, msg: 'reserva eliminada' });
            next();
        } catch (error) {
            this.sendError(error, req, res);
        }
    }

}

module.exports = ReservaController;

