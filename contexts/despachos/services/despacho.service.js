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

    async sendEmailActaEntrega(id_arriendo) {
        return await this._despachoBusiness.sendEmailActaEntrega(id_arriendo);
    }

    async guardarFotosVehiculos(id_arriendo, userAt, arrayFiles) {
        return await this._despachoBusiness.guardarFotosVehiculos(id_arriendo, userAt, arrayFiles);
    }

    async findActaEntrega(id_despacho) {
        return await this._despachoBusiness.findActaEntrega(id_despacho);
    }

}

module.exports = DespachoService;