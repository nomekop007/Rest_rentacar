const SucursalService = require("../services/sucursal.service");
const { sendError } = require("../helpers/components");
class SucursalController {

    constructor() {
        this._serviceSucursal = new SucursalService();
    }


    async getSucursales(req, res) {
        try {
            const sucursales = await this._serviceSucursal.getFindAll();
            res.json({
                success: true,
                data: sucursales,
            });
        } catch (error) {
            sendError(error, req, res);
        }
    }


    async getFindVehiculosPorSucursal(req, res) {
        try {
            const sucursal = await this._serviceSucursal.getFindByName(req.params.name);
            res.json({
                success: true,
                data: sucursal,
            });
        } catch (error) {
            sendError(error, req, res);
        }
    }


    async createSucursal(req, res, next) {
        try {
            const sucursal = await this._serviceSucursal.postCreate(req.body);
            res.json({ success: true, data: sucursal })
            next();
        } catch (error) {
            sendError(error, req, res);;
        }
    }

    async updateSucursal(req, res, next) {
        try {
            await this._serviceSucursal.putUpdate(req.params.id, req.body);
            res.json({ success: true, msg: "sucursal modificada" });
            next();
        } catch (error) {
            sendError(error, req, res);;
        }
    }

    async getFindArriendoBySucursal(req, res) {
        try {
            const sucursal = await this._serviceSucursal.getArriendoBySucursal();
            res.json({ success: true, data: sucursal })
        } catch (error) {
            sendError(error, req, res);;
        }
    }

}

module.exports = SucursalController;