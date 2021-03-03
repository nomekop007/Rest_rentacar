class RolBusiness {

    constructor({ RolRepository }) {
        this._rolRepository = RolRepository;
    }

    async getRoles() {
        const roles = await this._rolRepository.getFindAll();
        return roles;
    }

    async createRol(rol) {
        const rolRepo = await this._rolRepository.postCreate(rol);
        return rolRepo;
    }
}

module.exports = RolBusiness;