const fs = require("fs");
const path = require("path");

module.exports = (name, direccion) => {
    try {
        fs.unlinkSync(path.join(__dirname, `${direccion}/${name}`))
        return true;
    } catch (err) {
        return console.log(err);
    }
};
