class ClienteService {

    constructor({ ClienteBusiness }) {
        this._clienteBusiness = ClienteBusiness;
    }

    async getClientes() {
        return await this._clienteBusiness.getClientes();
    }

    async findCliente(rut_cliente) {
        return await this._clienteBusiness.findCliente(rut_cliente);
    }

    async createCliente(cliente) {
        return await this._clienteBusiness.createCliente(cliente);
    }

    async putCliente(cliente, rut_cliente) {
        return await this._clienteBusiness.putCliente(cliente, rut_cliente);
    }

    async getConductores() {
        return await this._clienteBusiness.getConductores();
    }

    async findConductor(rut_conductor) {
        return await this._clienteBusiness.findConductor(rut_conductor);
    }

    async createConductor(conductor) {
        return await this._clienteBusiness.createConductor(conductor);
    }

    async putConductor(conductor, rut_conductor) {
        return await this._clienteBusiness.putConductor(conductor, rut_conductor);
    }

    async getEmpresas() {
        return await this._clienteBusiness.getEmpresas();
    }

    async findEmpresa(rut_empresa) {
        return await this._clienteBusiness.findEmpresa(rut_empresa);
    }

    async createEmpresa(empresa) {
        return await this._clienteBusiness.createEmpresa(empresa);
    }

    async putEmpresa(empresa, rut_empresa) {
        return await this._clienteBusiness.putEmpresa(empresa, rut_empresa);
    }

    async updateFileConductor(rut_conductor, payload) {
        return await this._clienteBusiness.updateFileConductor(rut_conductor, payload);
    }

    async updateFileCliente(rut_cliente, payload) {
        return await this._clienteBusiness.updateFileCliente(rut_cliente, payload);
    }

    async updateFileEmpresa(rut_empresa, payload) {
        return await this._clienteBusiness.updateFileEmpresa(rut_empresa, payload);
    }
}

module.exports = ClienteService;