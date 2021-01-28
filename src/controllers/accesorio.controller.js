const { sendError } = require("../helpers/components");
const AccesoriosService = require("../services/accesorio.service");

class AccesorioController {
    constructor() {
        this._serviceAccesorio = new AccesoriosService();
    }

    async getAccesorios(req, res) {
        try {
            const accesorios = await this._serviceAccesorio.getFindAll();
            res.json({
                success: true,
                data: accesorios,
            });
        } catch (error) {
            sendError(error, req, res);
        }
    }

    async getAccesoriosBySucursal(req, res) {
        try {
            const accesorios = await this._serviceAccesorio.getFindAllBySucursal(req.params.id);
            res.json({
                success: true,
                data: accesorios
            })
        } catch (error) {
            sendError(error, req, res);
        }
    }


    async createAccesorio(req, res, next) {
        try {
            const accesorio = await this._serviceAccesorio.postCreate(req.body);
            res.json({
                success: true,
                data: accesorio
            })
            next();
        } catch (error) {
            sendError(error, req, res);
        }
    }

    async findAccesorio(req, res) {
        try {
            const accesorio = await this._serviceAccesorio.getFindByPk(req.params.id);
            res.json({
                success: true,
                data: accesorio
            })
        } catch (error) {
            sendError(error, req, res);
        }
    }

    async updateAccesorio(req, res, next) {
        try {
            const accesorio = await this._serviceAccesorio.putUpdate(req.body, req.params.id);
            res.json({
                success: true,
                data: accesorio
            })
            next();
        } catch (error) {
            sendError(error, req, res);
        }
    }


}

module.exports = AccesorioController;