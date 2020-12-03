const { sendError } = require("../helpers/components");
const fs = require("fs");
const path = require("path");

class UtilsController {


    async findDocumento(req, res) {
        try {
            try {
                const { documento, tipo } = req.body;
                let paths = "";
                switch (tipo) {
                    case "contrato":
                        paths = path.join(__dirname, `${process.env.PATH_CONTRATO}/${documento}`);
                        break;
                    case "acta":
                        paths = path.join(__dirname, `${process.env.PATH_ACTA_ENTREGA}/${documento}`);
                        break;
                    case "requisito":
                        paths = path.join(__dirname, `${process.env.PATH_REQUISITO_ARRIENDO}/${documento}`);
                        break;
                    case "facturacion":
                        paths = path.join(__dirname, `${process.env.PATH_FACTURACIONES}/${documento}`);
                        break;
                    case "recepcion":
                        paths = path.join(__dirname, `${process.env.PATH_RECEPCIONES}/${documento}`);
                        break;
                    case "fotosDañoVehiculo":
                        paths = path.join(__dirname, `${process.env.PATH_DANIO_VEHICULO}/${documento}`);
                        break;
                    case "fotoVehiculo":
                        paths = path.join(__dirname, `${process.env.PATH_FOTO_VEHICULO}/${documento}`);
                        break;
                    default:
                        res.json({
                            success: false,
                            msg: "tipo no encontrado"
                        });
                        return;
                }
                const base64 = fs.readFileSync(paths, { encoding: "base64" });
                res.json({
                    success: true,
                    data: {
                        nombre: documento,
                        tipo: tipo,
                        paths: paths,
                        base64: base64
                    },
                });
            } catch (error) {
                sendError(error, res);
            }
        } catch (error) {
            sendError(error)
        }
    }


}


module.exports = UtilsController;