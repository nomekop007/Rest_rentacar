
const path = require("path");
class FinanzasComponent {
    constructor({ ArriendoRepository, sendError }) {
        this.serviceArriendo = ArriendoRepository;
        this.sendError = sendError;
    }


    async getArriendoFinanzas(req, res) {
        try {
            const arriendos = await this.serviceArriendo.getFindAll();
            res.json({
                success: true,
                data: arriendos,
            });
        } catch (error) {
            this.sendError(error, req, res);
        }
    }


    async findArriendoFinanzas(req, res) {
        try {
            const arriendo = await this.serviceArriendo.getFindOne(req.params.id);
            if (arriendo) {
                res.json({
                    success: true,
                    data: arriendo,
                });
            } else {
                res.json({
                    success: false,
                    msg: "error: " + "arriendo no encontrado",
                });
            }
        } catch (error) {
            this.sendError(error, req, res);
        }
    }



    async findDocumentosArriendoFinanzas(req, res) {
        try {
            const { documento, tipo } = req.body;
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
            res.json({
                success: true,
                data: {
                    nombre: documento,
                    tipo: tipo,
                    paths: paths
                },
            });
        } catch (error) {
            this.sendError(error, req, res);
        }
    }
}

module.exports = FinanzasComponent;

