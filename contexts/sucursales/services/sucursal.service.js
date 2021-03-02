class SucursalService {

    constructor({ SucursalBusiness }) {
        this._sucursalBusiness = SucursalBusiness;
    }

    async getSucursales() {
        return await this._sucursalBusiness.getSucursales();
    }

    async createSucursal(sucursal) {
        return await this._sucursalBusiness.createSucursal(sucursal);
    }

    async updateSucursal(id_sucursal, sucursal) {
        return await this._sucursalBusiness.updateSucursal(id_sucursal, sucursal);
    }

    async getFindArriendoBySucursal() {
        return await this._sucursalBusiness.getFindArriendoBySucursal();
    }


}

module.exports = SucursalService;