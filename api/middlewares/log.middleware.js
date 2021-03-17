const { Log } = require("../../config/database/db");
//CORREGIR

//const LogService = require("../../contexts/logs/services/log.service");
const logRegister = async (req, res) => {
    try {
        const log = {
            userAt_log: req.body.userAt,
            body_log: "" + JSON.stringify(req.body),
            accion_log: req.originalUrl,
            id_usuario: req.usuarioId
        };
        await Log.create(log);
    } catch (error) {
        console.log(error);
    }
};

module.exports = {
    logRegister: logRegister,
};