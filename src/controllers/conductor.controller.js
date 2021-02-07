const ConductorService = require("../services/conductor.service");
const DocumentoConductorService = require("../services/documentosConductor.service");
const { sendError } = require("../helpers/components");

class ConductorController {
    constructor() {
        this._serviceConductor = new ConductorService();
        this._serviceDocConductor = new DocumentoConductorService();
    }



    async getConductores(req, res) {
        try {
            const conductores = await this._serviceConductor.getFindAll();
            res.json({
                success: true,
                data: conductores,
            });
        } catch (error) {
            sendError(error, req, res);
        }
    }



    async findConductor(req, res) {
        try {
            const conductor = await this._serviceConductor.getFindOne(req.params.id);
            if (conductor) {
                res.json({
                    success: true,
                    data: conductor,
                });
            } else {
                res.json({
                    success: false,
                    msg: "conductor no encontrado",
                });
            }
        } catch (error) {
            sendError(error, req, res);
        }
    }



    async createConductor(req, res, next) {
        try {
            const response = req.body;
            //si es extranjero
            if (response.nacionalidad_conductor != "CHILENO/A") response.rut_conductor = "@" + response.rut_conductor;
            //si no existe lo crea
            const [conductor, created] = await this._serviceConductor.postFindOrCreate(response, response.rut_conductor);
            //si existe conductor lo actualiza
            if (!created) await this._serviceConductor.putUpdate(response, conductor.rut_conductor);
            // se busca el conductor
            const newConductor = await this._serviceConductor.getFindByPK(conductor.rut_conductor);
            res.json({
                success: true,
                data: newConductor,
            });
            if (created) next();
        } catch (error) {
            sendError(error, req, res);
        }
    }


    async putConductor(req, res, next) {
        try {
            const response = req.body;
            await this._serviceConductor.putUpdate(response, req.params.id);
            res.json({
                success: true,
                msg: "registro actualizado"
            })
            next();
        } catch (error) {
            sendError(error, req, res);
        }
    }

    async updateFile(req, res, next) {
        try {
            const files = req.files;
            const data = {};
            data.userAt = req.headers["userat"];
            if (files["inputlicenciaFrontalConductor"]) data.licenciaConducirFrontal = req.files["inputlicenciaFrontalConductor"][0].filename;
            if (files["inputlicenciaTraseraConductor"]) data.licenciaConducirTrasera = req.files["inputlicenciaTraseraConductor"][0].filename;
            const [conductor, created] = await this._serviceDocConductor.postFindOrCreate(data, req.params.id);
            if (!created) await this._serviceDocConductor.putUpdate(data, req.params.id);
            res.json({
                success: true,
                msg: "archivo actualizado",
            });
            next();
        } catch (error) {
            sendError(error, req, res);
        }
    }

}

module.exports = ConductorController;