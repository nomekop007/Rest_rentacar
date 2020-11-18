const checkTokenApiRest = (req, res, next) => {
    if (!req.headers["usertoken"]) {
        return res.json({
            success: false,
            msg: "Necesitas incluir el usertoken en la cabecera",
        });
    }

    const userToken = req.headers["usertoken"];

    if (userToken != process.env.TOKEN_API_REST) {
        return res.json({
            success: false,
            msg: "El token es incorrecto",
        });
    }


    next();
}

module.exports = {
    checkTokenApiRest: checkTokenApiRest
};