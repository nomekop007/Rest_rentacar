class PermisoController {


    constructor({ RolPermisoService, sendError }) {
        this._serviceRolPermiso = RolPermisoService;
        this.sendError = sendError;
    }

    async mostrarPermisosPorRol(req, res) {
        try {
            const rolPermisos = await this._serviceRolPermiso.getFindOneWithRol(req.params.id);
            let permisos = [];
            rolPermisos.map((rolPermiso) => permisos.push(rolPermiso.permiso))
            res.json({ success: true, data: permisos })
        } catch (error) {
            this.sendError(error, req, res);
        }
    }


}


module.exports = PermisoController;

