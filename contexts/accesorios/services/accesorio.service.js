class AccesorioService {

    constructor({ AccesorioBusiness }) {
        this._accesorioBusiness = AccesorioBusiness;
    }

    async getAccesorios() {
        return await this._accesorioBusiness.getAccesorios();
    }

    async getAccesoriosBySucursal(id_sucursal) {
        return await this._accesorioBusiness.getAccesoriosBySucursal(id_sucursal);
    }

    async createAccesorio(accesorio) {
        return await this._accesorioBusiness.createAccesorio(accesorio);
    }

    async findAccesorio(id_accesorio) {
        return await this._accesorioBusiness.findAccesorio(id_accesorio);
    }

    async updateAccesorio(accesorio, id_accesorio) {
        return await this._accesorioBusiness.updateAccesorio(accesorio, id_accesorio);
    }


}

module.exports = AccesorioService;