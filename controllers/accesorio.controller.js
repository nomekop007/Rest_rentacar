const { sendError } = require("../helpers/components");
const AccesoriosService = require("../services/accesorio.service");

class AccesorioController {
    constructor() {
        this.service = new AccesoriosService();
    }

    async getAccesorios(req, res) {
        try {
            const accesorios = await this.service.getFindAll();
            res.json({
                success: true,
                data: accesorios,
            });
        } catch (error) {
            sendError(error, res);
        }
    }


    async createAccesorio(req, res, next) {
        try {
            const accesorio = await this.service.postCreate(req.body);
            res.json({
                success: true,
                data: accesorio
            })
            next(accesorio.logging);
        } catch (error) {
            sendError(error, res);
        }
    }

    async findAccesorio(req, res) {
        try {
            const accesorio = await this.service.getFindByPk(req.params.id);
            res.json({
                success: true,
                data: accesorio
            })
        } catch (error) {
            sendError(error, res);
        }
    }

    async updateAccesorio(req, res) {
        try {
            const accesorio = await this.service.putUpdate(req.body, req.params.id);
            res.json({
                success: true,
                data: accesorio
            })
        } catch (error) {
            sendError(error, res);
        }
    }


}

module.exports = AccesorioController;