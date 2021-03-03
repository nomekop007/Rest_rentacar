class PermisoBusiness {

    constructor({ PermisoRepository, RolRepository, RolPermisoRepository }) {
        this._permisoRepository = PermisoRepository;
        this._rolRepository = RolRepository;
        this._rolPermisoRepository = RolPermisoRepository;
    }

    async mostrarPermisosPorRol(id_rol) {
        const rolPermisos = await this._rolPermisoRepository.getFindOneWithRol(id_rol);
        return rolPermisos;
    }

    async cargarPermisos() {
        const permisos = await this._permisoRepository.getFindAll();
        return permisos;
    }

    async registrarPermiso(permiso) {
        const permisoRepo = await this._permisoRepository.postCreate(permiso);
        return permisoRepo;
    }

    async buscarPermiso(id_permiso) {
        const permiso = await this._permisoRepository.getFindByPk(id_permiso);
        return permiso
    }

    async modificarPermiso(permiso, id_permiso) {
        await this._permisoRepository.putUpdate(permiso, id_permiso);
        return true;
    }

    async eliminarRolPermiso(id_permiso) {
        await this._rolPermisoRepository.deleteById(id_permiso);
        return true;
    }

    async agregarRolPermiso(rolPermiso) {
        const rolPermisoRepo = await this._rolPermisoRepository.postCreate(rolPermiso);
        return rolPermisoRepo;
    }

    async validarPermisos(id_permiso) {
        const rolesPermisos = await this._rolPermisoRepository.getFindOneWithRol(id_permiso);
        let arrayIdPermisos = [];
        arrayIdPermisos = rolesPermisos.map((rolPermiso) => rolPermiso.id_permiso);
        return arrayIdPermisos;
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

module.exports = PermisoBusiness;