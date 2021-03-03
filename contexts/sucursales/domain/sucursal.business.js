class SucursalBusiness {

    constructor({ SucursalRepository, RegionRepository }) {
        this._sucursalRepository = SucursalRepository;
        this._regionRepository = RegionRepository;
    }

    async getSucursales() {
        const sucursales = await this._sucursalRepository.getFindAll();
        return sucursales;
    }


    async createSucursal(sucursal) {
        const CreateSucursal = await this._sucursalRepository.postCreate(sucursal);
        return CreateSucursal;
    }

    async updateSucursal(id_sucursal, sucursal) {
        await this._sucursalRepository.putUpdate(id_sucursal, sucursal);
        return true;
    }

    async getFindArriendoBySucursal() {
        const sucursal = await this._sucursalRepository.getArriendoBySucursal();
        return sucursal;
    }

    async getRegiones() {
        const regiones = await this._regionRepository.getFindAll();
        return regiones;
    }

}

module.exports = SucursalBusiness;