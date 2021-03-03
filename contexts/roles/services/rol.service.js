class RolService {

    constructor({ RolBusiness }) {
        this._rolBusiness = RolBusiness;
    }

    async getRoles() {
        return await this._rolBusiness.getRoles();
    }

    async createRol(rol) {
        return await this._rolBusiness.createRol(rol);
    }

}

module.exports = RolService;