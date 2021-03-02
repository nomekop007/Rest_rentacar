const path = require("path");

class FinanzasBusiness {

    constructor({ ArriendoRepository }) {
        this._arriendoRepository = ArriendoRepository;
    }

    async getArriendoFinanzas() {
        const arriendos = await this._arriendoRepository.getFindAll();
        return arriendos;
    }

    async findArriendoFinanza(id_arriendo) {
        const arriendo = await this._arriendoRepository.getFindOne(id_arriendo);
        return arriendo;
    }


    async findDocumentosArriendoFinanzas(documento, tipo) {
        let paths = '';
        switch (tipo) {
            case "contrato":
                paths = path.join(__dirname, `../${process.env.PATH_CONTRATO}/${documento}`);
                break;
            case "acta":
                paths = path.join(__dirname, `../${process.env.PATH_ACTA_ENTREGA}/${documento}`);
                break;
            case "requisito":
                paths = path.join(__dirname, `../${process.env.PATH_REQUISITO_ARRIENDO}/${documento}`);
                break;
            case "facturacion":
                paths = path.join(__dirname, `../${process.env.PATH_FACTURACIONES}/${documento}`);
                break;
            case "recepcion":
                paths = path.join(__dirname, `../${process.env.PATH_RECEPCIONES}/${documento}`);
                break;
            case "fotosDañoVehiculo":
                paths = path.join(__dirname, `../${process.env.PATH_DANIO_VEHICULO}/${documento}`);
                break;
            case "fotoVehiculo":
                paths = path.join(__dirname, `../${process.env.PATH_FOTO_VEHICULO}/${documento}`);
                break;
            default:
                return {
                    success: false,
                    msg: "tipo no encontrado"
                }
        }
        return {
            success: true,
            data: {
                nombre: documento,
                tipo: tipo,
                paths: paths
            },
        }
    }
}

module.exports = FinanzasBusiness;