
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

    async createDanioVehiculo(id_arriendo, descripcion_danio, arrayImages, userAt) {
        return await this._vehiculoBusiness.createDanioVehiculo(id_arriendo, descripcion_danio, arrayImages, userAt);
    }

    async consultarDanioVehiculo(id_arriendo) {
        return await this._vehiculoBusiness.consultarDanioVehiculo(id_arriendo);
    }

    async getDanioVehiculo(id_sucursal) {
        return await this._vehiculoBusiness.getDanioVehiculo(id_sucursal);
    }


    async updateDanioVehiculo(danio, id_danio) {
        return await this._vehiculoBusiness.updateDanioVehiculo(danio, id_danio);
    }

    async createTarifaVehiculo(arrayTarifasVehiculos, userAt) {
        return await this._vehiculoBusiness.createTarifaVehiculo(arrayTarifasVehiculos, userAt);
    }


    async getTarifaVehiculo() {
        return await this._vehiculoBusiness.getTarifaVehiculo();
    }

    async findTarifaVehiculoByDias(patente, dias) {
        return await this._vehiculoBusiness.findTarifaVehiculoByDias(patente, dias);
    }


}

module.exports = VehiculoService;