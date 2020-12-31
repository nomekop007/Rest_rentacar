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
            const { TARIFAVEHICULO, LISTVEHICULO } = req.body;

            LISTVEHICULO.forEach(async vehiculo => {
                TARIFAVEHICULO.userAt = req.body.userAt;
                TARIFAVEHICULO.patente_vehiculo = vehiculo.patente_vehiculo;
                await this._tarifaVehiculo.postCreate(TARIFAVEHICULO);
                /*  console.log(TARIFAVEHICULO.patente_vehiculo);
                 console.log(created); */
                //SOLUCIONAR ERROR 
                console.log(TARIFAVEHICULO.patente_vehiculo);
                /* const [tarifaVehiculo, created] = await this._tarifaVehiculo.postFindOrCreate(TARIFAVEHICULO, vehiculo.patente_vehiculo);
                if (!created) await this._tarifaVehiculo.putUpdate(TARIFAVEHICULO, vehiculo.patente_vehiculo); */
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