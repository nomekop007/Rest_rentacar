class AccesorioController {

    constructor({ AccesorioService, sendError }) {
        this._accesorioService = AccesorioService;
        this.sendError = sendError;
    }

    async getAccesorios(req, res) {
        try {
            const accesorios = await this._accesorioService.getAccesorios();
            res.json({ success: true, data: accesorios });
        } catch (error) {
            this.sendError(error, req, res);
        }
    }

    async getAccesoriosBySucursal(req, res) {
        try {
            const { id } = req.params;
            const accesorios = await this._accesorioService.getAccesoriosBySucursal(id);
            res.json({ success: true, data: accesorios })
        } catch (error) {
            this.sendError(error, req, res);
        }
    }

    async createAccesorio(req, res, next) {
        try {
            const accesorio = req.body;
            const accesorioRepo = await this._accesorioService.createAccesorio(accesorio);
            res.json({ success: true, data: accesorioRepo });
            next();
        } catch (error) {
            this.sendError(error, req, res);
        }
    }

    async findAccesorio(req, res) {
        try {
            const { id } = req.params;
            const accesorio = await this._accesorioService.findAccesorio(id);
            res.json({ success: true, data: accesorio });
        } catch (error) {
            this.sendError(error, req, res);
        }
    }

    async updateAccesorio(req, res, next) {
        try {
            const accesorio = req.body;
            const { id } = req.params;
            const accesorioRepo = await this._accesorioService.updateAccesorio(accesorio, id);
            res.json({ success: true, data: accesorioRepo });
            next();
        } catch (error) {
            this.sendError(error, req, res);
        }
    }


}

module.exports = AccesorioController;