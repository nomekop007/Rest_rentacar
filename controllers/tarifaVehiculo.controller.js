const TarifaVehiculoService = require("../services/tarifasVehiculo.service");
const VehiculoService = require('../services/vehiculo.service');
const { sendError } = require('../helpers/components');

class TarifaVehiculoController {

    constructor() {
        this._tarifaVehiculo = new TarifaVehiculoService();
        this._vehiculo = new VehiculoService();
    }

    async createTarifaVehiculo(req, res) {
        try {
            const { TARIFASVEHICULOS } = req.body;
            TARIFASVEHICULOS.forEach(async vehiculo => {
                vehiculo.userAt = req.body.userAt;
                const [tarifaVehiculo, created] = await this._tarifaVehiculo.postFindOrCreate(vehiculo, vehiculo.patente_vehiculo);
                if (!created) await this._tarifaVehiculo.putUpdate(vehiculo, vehiculo.patente_vehiculo);
            });
            res.json({
                success: true,
                msg: "asignacion exitosa!"
            })
        } catch (error) {
            sendError(error, res);
        }
    }

    async getTarifaVehiculo(req, res) {
        try {
            const tarifasVehiculos = await this._tarifaVehiculo.getFindAll();
            res.json({
                success: true,
                data: tarifasVehiculos
            })
        } catch (error) {
            sendError(error, res);
        }
    }

}


module.exports = TarifaVehiculoController;