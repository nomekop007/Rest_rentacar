class PermisoController {

    constructor({ PermisoService, sendError }) {
        this.sendError = sendError;
        this._permisoService = PermisoService;
    }

    async mostrarPermisosPorRol(req, res) {
        try {
            const { id } = req.params;
            const rolPermisos = await this._permisoService.mostrarPermisosPorRol(id);
            res.json({ success: true, data: rolPermisos });
        } catch (error) {
            this.sendError(error, req, res);
        }
    }


    async cargarPermisos(req, res) {
        try {
            const permisos = await this._permisoService.cargarPermisos();
            res.json({ success: true, data: permisos });
        } catch (error) {
            this.sendError(error, req, res);
        }
    }


    async registrarPermiso(req, res, next) {
        try {
            const permiso = req.body;
            const permisoRepo = await this._permisoService.registrarPermiso(permiso);
            res.json({ success: true, data: permisoRepo });
            next();
        } catch (error) {
            this.sendError(error, req, res);
        }
    }


    async buscarPermiso(req, res) {
        try {
            const { id } = req.params;
            const permiso = await this._permisoService.buscarPermiso(id);
            res.json({ success: true, data: permiso });
        } catch (error) {
            this.sendError(error, req, res);
        }
    }


    async modificarPermiso(req, res, next) {
        try {
            const { id } = req.params;
            const permiso = req.body;
            await this._permisoService.modificarPermiso(permiso, id);
            res.json({ success: true, msg: "modificado" });
            next()
        } catch (error) {
            this.sendError(error, req, res);
        }
    }


    async eliminarRolPermiso(req, res, next) {
        try {
            const { id } = req.params;
            await this._permisoService.eliminarRolPermiso(id);
            res.json({ success: true, msg: "asociacion eliminada" });
            next();
        } catch (error) {
            this.sendError(error, req, res);
        }
    }

    async agregarRolPermiso(req, res, next) {
        try {
            const rolPermiso = req.body;
            const rolPermisoRepo = await this._permisoService.agregarRolPermiso(rolPermiso);
            res.json({ success: true, data: rolPermisoRepo });
            next();
        } catch (error) {
            this.sendError(error, req, res);
        }
    }

    async validarPermisos(req, res) {
        try {
            const { id } = req.params;
            const arrayIdPermisos = await this._permisoService.validarPermisos(id);
            res.send(arrayIdPermisos);
        } catch (error) {
            this.sendError(error, req, res);
        }
    }

    async getRoles(req, res) {
        try {
            const roles = await this._permisoService.getRoles();
            res.json({ success: true, data: roles, });
        } catch (error) {
            this.sendError(error, req, res);
        }
    }


    async createRol(req, res) {
        try {
            const rol = req.body;
            const rolRepo = await this._permisoService.createRol(rol);
            res.json({ success: true, data: rolRepo })
        } catch (error) {
            this.sendError(error, req, res);
        }
    }


}


module.exports = PermisoController;

