
class VehiculoService {

    constructor({ VehiculoBusiness }) {
        this._vehiculoBusiness = VehiculoBusiness;
    }

    async getVehiculos() {
        return await this._vehiculoBusiness.getVehiculos();
    }

    async getAllVehiculos() {
        return await this._vehiculoBusiness.getAllVehiculos();
    }

    async findVehiculo(patente) {
        return await this._vehiculoBusiness.findVehiculo(patente);
    }

    async createVehiculo(vehiculo) {
        return await this._vehiculoBusiness.createVehiculo(vehiculo);
    }

    async updateStateVehiculo(vehiculo, patente) {
        return await this._vehiculoBusiness.updateStateVehiculo(vehiculo, patente);
    }

    async deleteVehiculo(patente) {
        return await this._vehiculoBusiness.deleteVehiculo(patente);
    }

    async updateImageVehiculo(name_file, patente) {
        return await this._vehiculoBusiness.updateImageVehiculo(name_file, patente);
    }

    async updateVehiculo(vehiculo, patente) {
        return await this._vehiculoBusiness.updateVehiculo(vehiculo, patente);
    }

}

module.exports = VehiculoService;