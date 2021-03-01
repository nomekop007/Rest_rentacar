class SucursalBusiness {

    constructor({ SucursalRepository }) {
        this._sucursalRepository = SucursalRepository;
    }

    async getSucursales() {
        const sucursales = await this._sucursalRepository.getFindAll();
        return sucursales;
    }

    async getFindVehiculosPorSucursal(id_sucursal) {
        const sucursalWithVehiculos = await this._sucursalRepository.getFindById(id_sucursal);
        return sucursalWithVehiculos;
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

}

module.exports = SucursalBusiness;