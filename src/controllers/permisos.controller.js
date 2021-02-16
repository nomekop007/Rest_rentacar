class PermisoController {

    constructor({ RolPermisoService, PermisoService, sendError }) {
        this._serviceRolPermiso = RolPermisoService;
        this._servicePermiso = PermisoService;
        this.sendError = sendError;
    }

    async mostrarPermisosPorRol(req, res) {
        try {
            const rolPermisos = await this._serviceRolPermiso.getFindOneWithRol(req.params.id);
            res.json({ success: true, data: rolPermisos })
        } catch (error) {
            this.sendError(error, req, res);
        }
    }


    async cargarPermisos(req, res) {
        try {
            const permisos = await this._servicePermiso.getFindAll();
            res.json({ success: true, data: permisos });
        } catch (error) {
            this.sendError(error, req, res);
        }
    }


    async registrarPermiso(req, res, next) {
        try {
            const permiso = await this._servicePermiso.postCreate(req.body);
            res.json({ success: true, data: permiso });
            next();
        } catch (error) {
            this.sendError(error, req, res);
        }
    }


    async buscarPermiso(req, res) {
        try {
            const permiso = await this._servicePermiso.getFindByPk(req.params.id);
            res.json({ success: true, data: permiso });
        } catch (error) {
            this.sendError(error, req, res);
        }
    }


    async modificarPermiso(req, res, next) {
        try {
            await this._servicePermiso.putUpdate(req.body, req.params.id);
            res.json({ success: true, msg: "modificado" });
            next()
        } catch (error) {
            this.sendError(error, req, res);
        }
    }


    async eliminarRolPermiso(req, res, next) {
        try {
            await this._serviceRolPermiso.deleteById(req.params.id);
            res.json({ success: true, msg: "asociacion eliminada" });
            next()
        } catch (error) {
            this.sendError(error, req, res);
        }
    }

    async agregarRolPermiso(req, res, next) {
        try {
            const rolPermiso = await this._serviceRolPermiso.postCreate(req.body);
            res.json({ success: true, data: rolPermiso });
            next();
        } catch (error) {
            this.sendError(error, req, res);
        }
    }

    async validarPermisos(req, res) {
        try {
            const { id_rol, id_permiso } = req.query;
            const rolesPermisos = await this._serviceRolPermiso.getFindOneWithRol(id_rol);
            let existe = rolesPermisos.find((rolPermiso) => rolPermiso.id_permiso == id_permiso)
            if (existe) {
                res.json({ success: true, data: true });
            } else {
                res.json({ success: true, data: false, msg: "no tienes los permisos suficientes para realizar esta accion" });
            }
        } catch (error) {
            this.sendError(error, req, res);
        }
    }

}


module.exports = PermisoController;

