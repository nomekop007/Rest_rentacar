const jwt = require("jwt-simple");
const moment = require("moment");

//se comprueba que exista un token en la cabecera
const checkToken = (req, res, next) => {

    if (!req.headers["usertoken"]) {
        return res.json({
            success: false,
            msg: "error en la autentifacion del token , reinicie Sesion",
        });
    }

    const userToken = req.headers["usertoken"];

    let payload = {};
    //se comprueba que el token sea correcto
    try {
        payload = jwt.decode(userToken, process.env.SECRET_PHRASE);
    } catch (err) {
        return res.json({
            success: false,
            msg: "El token es incorrecto",
        });
    }

    //se comprueba si el token expiro
    if (payload.expiredAt < moment().unix()) {
        return res.json({
            success: false,
            msg: "El token a expirado, reinicie sesion",
        });
    }

    req.usuarioId = payload.usuarioId;

    next();
};

module.exports = {
    checkToken: checkToken,
};