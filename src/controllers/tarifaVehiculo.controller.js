const TarifaVehiculoService = require("../services/tarifasVehiculo.service");
const VehiculoService = require('../services/vehiculo.service');
const { sendError } = require('../helpers/components');

class TarifaVehiculoController {

    constructor() {
        this._tarifaVehiculo = new TarifaVehiculoService();
        this._vehiculo = new VehiculoService();
    }

    async createTarifaVehiculo(req, res, next) {
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
            next();
        } catch (error) {
            sendError(error, req, res);
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
            sendError(error, req, res);
        }
    }


    async findTarifaVehiculoByDias(req, res) {
        try {
            const { patente, dias } = req.query;
            const tarifaVehiculo = await this._tarifaVehiculo.getFindOne(patente);
            let valorDia = 0;
            let valorNeto = 0;
            if (tarifaVehiculo) {
                if (Number(dias) < 7) {
                    valorDia = tarifaVehiculo.valor_neto_diario;
                }
                if (Number(dias) >= 7) {
                    valorDia = tarifaVehiculo.valor_neto_semanal / 7;
                }
                if (Number(dias) >= 15) {
                    valorDia = tarifaVehiculo.valor_neto_quincenal / 15;
                }
                if (Number(dias) >= 30) {
                    valorDia = tarifaVehiculo.valor_neto_mensual / 30;
                }
                valorNeto = valorDia * Number(dias);
            }
            res.json({
                success: true,
                data: { valorDia, valorNeto }
            });
        } catch (error) {
            sendError(error, req, res);
        }
    }


}

module.exports = TarifaVehiculoController;