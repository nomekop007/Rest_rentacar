const moment = require("moment");

module.exports = (fecha) => {
    var f = new Date(fecha);
    return moment(f).format("DD-MM-YYYY  HH:mm a");
};