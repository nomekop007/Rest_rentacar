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


}

module.exports = SucursalController;