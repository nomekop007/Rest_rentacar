class ArriendoService {

    constructor({ ArriendoBusiness }) {
        this._arriendoBusiness = ArriendoBusiness;
    }

    async getArriendos(id_sucursal, estado) {
        return await this._arriendoBusiness.getArriendos(id_sucursal, estado);
    }

    async getArriendosEnproceso(id_sucursal, estado) {
        return await this._arriendoBusiness.getArriendosEnproceso(id_sucursal, estado);
    }

    async getArriendosActivos(id_sucursal, estado) {
        return await this._arriendoBusiness.getArriendosActivos(id_sucursal, estado);
    }

    async findArriendo(id_arriendo) {
        return await this._arriendoBusiness.findArriendo(id_arriendo);
    }

    async createArriendo(arriendo) {
        return await this._arriendoBusiness.createArriendo(arriendo);
    }

    async updateStateArriendo(payload, id_arriendo) {
        return await this._arriendoBusiness.updateStateArriendo(payload, id_arriendo);
    }

    async sendCorreoAtraso(id_arriendo, nombre_cliente, correo_cliente) {
        return await this._arriendoBusiness.sendCorreoAtraso(id_arriendo, nombre_cliente, correo_cliente);
    }

    async updateArriendo(arriendo, id_arriendo) {
        return await this._arriendoBusiness.updateArriendo(arriendo, id_arriendo);
    }

    async modificarTipo(tipo, empresaRemplazo, id_arriendo, userAt) {
        return await this._arriendoBusiness.modificarTipo(tipo, empresaRemplazo, id_arriendo, userAt);
    }

    async finalizarArriendos(id_sucursal) {
        return await this._arriendoBusiness.finalizarArriendos(id_sucursal);
    }

    async createRequisitoArriendo(payload) {
        return await this._arriendoBusiness.createRequisitoArriendo(payload);
    }

    async createGarantia(garantia) {
        return await this._arriendoBusiness.createGarantia(garantia);
    }

    async createExtencionArriendo(extencion) {
        return await this._arriendoBusiness.createExtencionArriendo(extencion);
    }

    async buscarExtencionesPorArriendo(id_arriendo) {
        return await this._arriendoBusiness.buscarExtencionesPorArriendo(id_arriendo);
    }

    async createContrato(id_arriendo, userAt, base64) {
        return await this._arriendoBusiness.createContrato(id_arriendo, userAt, base64)
    }

    async createExtencionContrato(id_extencion, userAt, base64) {
        return await this._arriendoBusiness.createExtencionContrato(id_extencion, userAt, base64);
    }

    async subirContrato(id_arriendo, documento, userAt) {
        return await this._arriendoBusiness.subirContrato(id_arriendo, documento, userAt);
    }

    async subirExtencionContrato(id_extencion, documento, userAt) {
        return await this._arriendoBusiness.subirExtencionContrato(id_extencion, documento, userAt);
    }

    async generatePDFContrato(payload) {
        return await this._arriendoBusiness.generatePDFContrato(payload);
    }

    async generatePDFExtencion(payload) {
        return await this._arriendoBusiness.generatePDFExtencion(payload);
    }

    async sendEmailContrato(id_arriendo) {
        return await this._arriendoBusiness.sendEmailContrato(id_arriendo);
    }

    async sendEmailContratoExtencion(id_extencion) {
        return await this._arriendoBusiness.sendEmailContratoExtencion(id_extencion);
    }

    async createContacto(contacto) {
        return await this._arriendoBusiness.createContacto(contacto);
    }

    async updateContacto(contacto, id_contacto) {
        return await this._arriendoBusiness.updateContacto(contacto, id_contacto);
    }

    async anularArriendo(id_arriendo, motivo, userAt) {
        return await this._arriendoBusiness.anularArriendo(id_arriendo, motivo, userAt);
    }

}

module.exports = ArriendoService;