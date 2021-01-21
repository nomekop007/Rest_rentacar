const SucursalService = require("../services/sucursal.service");
const { sendError } = require("../helpers/components");
class SucursalController {

    constructor() {
        this.serviceSucursal = new SucursalService();
    }


    async getSucursales(req, res) {
        try {
            const sucursales = await this.serviceSucursal.getFindAll();
            res.json({
                success: true,
                data: sucursales,
            });
        } catch (error) {
            sendError(error, res);
        }
    }


    async getFindVehiculosPorSucursal(req, res) {
        try {
            const sucursal = await this.serviceSucursal.getFindByName(req.params.name);
            res.json({
                success: true,
                data: sucursal,
            });
        } catch (error) {
            sendError(error, res);
        }
    }


    async createSucursal(req, res, next) {
        try {
            const sucursal = await this.serviceSucursal.postCreate(req.body);
            res.json({ success: true, data: sucursal })
            next();
        } catch (error) {
            sendError(error);
        }
    }

    async updateSucursal(req, res, next) {
        try {
            await this.serviceSucursal.putUpdate(req.params.id, req.body);
            res.json({ success: true, msg: "sucursal modificada" });
            next();
        } catch (error) {
            sendError(error);
        }
    }

    async getFindArriendoBySucursal(req, res) {
        try {
            const sucursal = await this.serviceSucursal.getArriendoBySucursal();
            res.json({ success: true, data: sucursal })
        } catch (error) {
            sendError(error);
        }
    }

}

module.exports = SucursalController;