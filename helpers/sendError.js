
const { logErrorRegister } = require("../api/middlewares/logError.middleware")

module.exports = (error, req, res) => {
    console.log(error);
    logErrorRegister(req, error);
    res.status(310).json({
        success: false,
        msg: "Server error 310",
    });
};