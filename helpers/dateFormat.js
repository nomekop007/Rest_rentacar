const moment = require("moment");

module.exports = (fecha) => {
    let f = new Date(fecha);
    return moment(f).format("DD-MM-YYYY");
};