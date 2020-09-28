const { Documento } = require("../db");

class DocumentoController {
    async createDocumentoRequisitoArriendo(req, res) {
        console.log(req.body);
        console.log(req.files);

        res.json({
            listo: "listo",
        });
    }
}

module.exports = DocumentoController;