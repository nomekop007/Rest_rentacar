class AccesorioBusiness {

    constructor({ AccesorioRepository }) {
        this._accesorioRepository = AccesorioRepository;
    }

    async getAccesorios() {
        const accesorios = await this._accesorioRepository.getFindAll();
        return accesorios;
    }


    async getAccesoriosBySucursal(id_sucursal) {
        const accesorios = await this._accesorioRepository.getFindAllBySucursal(id_sucursal);
        return accesorios;
    }


    async createAccesorio(accesorio) {
        const accesorioRepo = await this._accesorioRepository.postCreate(accesorio);
        return accesorioRepo;
    }


    async findAccesorio(id_accesorio) {
        const accesorio = await this._accesorioRepository.getFindByPk(id_accesorio);
        return accesorio;
    }


    async updateAccesorio(accesorio, id_accesorio) {
        const accesorioRepo = await this._accesorioRepository.putUpdate(accesorio, id_accesorio);
        return accesorioRepo;
    }


}

module.exports = AccesorioBusiness;