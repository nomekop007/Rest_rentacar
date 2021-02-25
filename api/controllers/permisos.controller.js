class PermisoController {

    constructor({ RolPermisoRepository, PermisoRepository, sendError }) {
        this.sendError = sendError;

        //mover
        this._serviceRolPermiso = RolPermisoRepository;
        this._servicePermiso = PermisoRepository;
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
            const rolesPermisos = await this._serviceRolPermiso.getFindOneWithRol(req.params.id);
            let arrayIdPermisos = [];
            arrayIdPermisos = rolesPermisos.map((rolPermiso) => rolPermiso.id_permiso);
            res.send(arrayIdPermisos)
        } catch (error) {
            this.sendError(error, req, res);
        }
    }

}


module.exports = PermisoController;

