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

    async findSucursalById(id_sucursal) {
        return await this._sucursalBusiness.findSucursalById(id_sucursal);
    }

    async updateSucursal(id_sucursal, sucursal) {
        return await this._sucursalBusiness.updateSucursal(id_sucursal, sucursal);
    }

    async getFindArriendoBySucursal() {
        return await this._sucursalBusiness.getFindArriendoBySucursal();
    }

    async getRegiones() {
        return await this._sucursalBusiness.getRegiones();
    }
    async createTrasladoOrigen(DATA){
        return await this._sucursalBusiness.createTrasladoOrigen(DATA);
    }

    async updateTrasladoEstado(id_traslado,DATA){
        return await this._sucursalBusiness.updateTrasladoEstado(id_traslado,DATA);
    }
    
    async guardarFotosTrasladoOrigen(ID,Fotos){
        return await this._sucursalBusiness.guardarFotosTrasladoOrigen(ID,Fotos);
    }

    async guardarFotosTrasladoDestino(ID,Fotos){
        return await this._sucursalBusiness.guardarFotosTrasladoDestino(ID,Fotos);
    }

    async deleteTraslado(ID){
        return await this._sucursalBusiness.deleteTraslado(ID);
    }

    async getTraslado(ID){
        return await this._sucursalBusiness.getTraslado(ID);
    }

    async getAllTraslado(){
        return await this._sucursalBusiness.getAllTraslado();
    }


}

module.exports = SucursalService;