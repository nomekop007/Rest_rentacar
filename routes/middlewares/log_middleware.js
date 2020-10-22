const { Log } = require("../../db");

const logRegister = async(req, res) => {
    const consulta = {
        userAt_log: "" + req.headers.userat,
        body_log: "" + JSON.stringify(req.body),
        accion_log: "" + req.originalUrl,
    }
    console.log(consulta);
    await Log.create(consulta);
};

module.exports = {
    logRegister: logRegister,
};