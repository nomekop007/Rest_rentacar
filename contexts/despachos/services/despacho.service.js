class DespachoService {

    constructor({ DespachoBusiness }) {
        this._despachoBusiness = DespachoBusiness;
    }

    async createBloqueoUsuario(id_arriendo, id_usuario, tipo, userAt) {
        return await this._despachoBusiness.createBloqueoUsuario(id_arriendo, id_usuario, tipo, userAt);
    }

    async revisarBloqueoUsuario(id_usuario) {
        return await this._despachoBusiness.revisarBloqueoUsuario(id_usuario);
    }

    async createDespacho(despacho) {
        return await this._despachoBusiness.createDespacho(despacho);
    }

    async addRevision(id_despacho, arrayImages, userAt) {
        return await this._despachoBusiness.addRevision(id_despacho, arrayImages, userAt);
    }

    async createActaEntrega(id_despacho, userAt, base64) {
        return await this._despachoBusiness.createActaEntrega(id_despacho, userAt, base64);
    }

    async generatePDFactaEntrega(payload) {
        return await this._despachoBusiness.generatePDFactaEntrega(payload);
    }

    async generatePDFactaRecepcion(payload) {
        return await this._despachoBusiness.generatePDFactaRecepcion(payload);
    }

    async sendEmailActaEntrega(id_arriendo) {
        return await this._despachoBusiness.sendEmailActaEntrega(id_arriendo);
    }

    async guardarFotosVehiculos(id_arriendo, userAt, arrayFiles) {
        return await this._despachoBusiness.guardarFotosVehiculos(id_arriendo, userAt, arrayFiles);
    }

    async guardarFotoRecepcion(id_arriendo, userAt, nombre_foto) {
        return await this._despachoBusiness.guardarFotoRecepcion(id_arriendo, userAt, nombre_foto);
    }

    async findActaEntrega(id_despacho) {
        return await this._despachoBusiness.findActaEntrega(id_despacho);
    }

    async eliminarFotosRecepcion(id_arriendo) {
        return await this._despachoBusiness.eliminarFotosRecepcion(id_arriendo);
    }

    async eliminarFotosDespacho(id_arriendo) {
        return await this._despachoBusiness.eliminarFotosDespacho(id_arriendo);
    }

    async confirmarRecepcionArriendo(id_arriendo, base64) {
        return await this._despachoBusiness.confirmarRecepcionArriendo(id_arriendo, base64);
    }

}

module.exports = DespachoService;