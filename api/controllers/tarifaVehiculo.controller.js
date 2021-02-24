class TarifaVehiculoController {

    constructor({ TarifaVehiculoRepository, sendError }) {
        this._tarifaVehiculo = TarifaVehiculoRepository;
        this.sendError = sendError;
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
            this.sendError(error, req, res);
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
            this.sendError(error, req, res);
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
            this.sendError(error, req, res);
        }
    }


}

module.exports = TarifaVehiculoController;