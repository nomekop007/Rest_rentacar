class PermisoService {

    constructor({ PermisoBusiness }) {
        this._permisoBusiness = PermisoBusiness;
    }

    async mostrarPermisosPorRol(id_rol) {
        return await this._permisoBusiness.mostrarPermisosPorRol(id_rol);
    }

    async cargarPermisos() {
        return await this._permisoBusiness.cargarPermisos();
    }

    async registrarPermiso(permiso) {
        return await this._permisoBusiness.registrarPermiso(permiso);
    }

    async buscarPermiso(id_permiso) {
        return await this._permisoBusiness.buscarPermiso(id_permiso);
    }

    async modificarPermiso(permiso, id_permiso) {
        return await this._permisoBusiness.modificarPermiso(permiso, id_permiso);
    }

    async eliminarRolPermiso(id_permiso) {
        return await this._permisoBusiness.eliminarRolPermiso(id_permiso);
    }

    async agregarRolPermiso(rolPermiso) {
        return await this._permisoBusiness.agregarRolPermiso(rolPermiso);
    }

    async validarPermisos(id_permiso) {
        return await this._permisoBusiness.validarPermisos(id_permiso);
    }

    async getRoles() {
        return await this._permisoBusiness.getRoles();
    }

    async createRol(rol) {
        return await this._permisoBusiness.createRol(rol);
    }


}

module.exports = PermisoService;