const sendError = require('../../helpers/sendError');

class SucursalController {

    constructor({ SucursalService }) {
        this._sucursalService = SucursalService;
    }


    async getSucursales(req, res) {
        try {
            const sucursales = await this._sucursalService.getSucursales();
            res.json({
                success: true,
                data: sucursales,
            });
        } catch (error) {
            sendError(error, req, res);
        }
    }

    async findSucursalById(req, res) {
        try {
            const { id } = req.params;
            const sucursal = await this._sucursalService.findSucursalById(id);
            res.json({ success: true, data: sucursal })
        } catch (error) {
            sendError(error, req, res);
        }
    }

    async createSucursal(req, res, next) {
        try {
            const sucursal = req.body;
            const sucursalCreate = await this._sucursalService.createSucursal(sucursal);
            res.json({ success: true, data: sucursalCreate })
            next();
        } catch (error) {
            sendError(error, req, res);;
        }
    }

    async updateSucursal(req, res, next) {
        try {
            const sucursal = req.body;
            const { id } = req.params;
            await this._sucursalService.updateSucursal(id, sucursal);
            res.json({ success: true, msg: "sucursal modificada" });
            next();
        } catch (error) {
            sendError(error, req, res);;
        }
    }

    async getFindArriendoBySucursal(req, res) {
        try {
            const sucursal = await this._sucursalService.getFindArriendoBySucursal();
            res.json({ success: true, data: sucursal })
        } catch (error) {
            sendError(error, req, res);;
        }
    }

    async getRegiones(req, res) {
        try {
            const regiones = await this._sucursalService.getRegiones();
            res.json({
                success: true,
                data: regiones
            })
        } catch (error) {
            sendError(error, req, res);
        }
    }

}

module.exports = SucursalController;