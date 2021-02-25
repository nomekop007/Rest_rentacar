const moment = require("moment");


module.exports = () => {
    let f = new Date();
    return moment(f).format("HH:mm:ss a");
};