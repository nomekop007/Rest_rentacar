const { Log } = require("../db");

const logRegister = async(req, res) => {
    try {
        const consulta = {
            userAt_log: "" + req.headers.userat,
            body_log: "" + JSON.stringify(req.body),
            accion_log: "" + req.originalUrl,
        };

        await Log.create(consulta);
    } catch (error) {
        console.log(error);
    }
};

module.exports = {
    logRegister: logRegister,
};