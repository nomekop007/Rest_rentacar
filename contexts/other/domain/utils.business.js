const fs = require("fs");
const path = require("path");


class UtilsBusiness {

    constructor({ ArriendoRepository, ContratoRepository, PagoArriendoRepository, GarantiaRepository, RequisitoRepository }) {
        this._arriendoRepository = ArriendoRepository;
        this._contratoRepository = ContratoRepository;
        this._pagoRepository = PagoArriendoRepository;
        this._garantiaRepository = GarantiaRepository;
        this._requisitoRepository = RequisitoRepository;
    }

    async findDocumento(documento, tipo) {
        let paths = "";
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
                };
        }
        const link = `${process.env.PATH_SERVER}/${documento}`;
        const base64 = fs.readFileSync(paths, { encoding: "base64" });
        return {
            success: true,
            data: {
                link: link,
                nombre: documento,
                tipo: tipo,
                base64: base64
            },
        }
    }

    async rollbackVistaFirma(id_arriendo) {
        const arriendo = await this._arriendoRepository.getFindOne(id_arriendo);
        const estado = arriendo.estado_arriendo;
        if (estado !== 'PENDIENTE' && estado !== 'CONFIRMADO' && estado !== 'FIRMADO') {
            return false;
        }
        let rollback = {};
        if (arriendo.pagosArriendos.length !== 0) rollback = { estado_arriendo: "CONFIRMADO" };
        else rollback = { estado_arriendo: "PENDIENTE" };
        await this._contratoRepository.deleteByIDArriendo(arriendo.id_arriendo);
        await this._arriendoRepository.putUpdate(rollback, arriendo.id_arriendo);
        return true;
    }

    async rollbackVistaPago(id_arriendo) {
        const arriendo = await this._arriendoRepository.getFindOne(id_arriendo);
        const estado = arriendo.estado_arriendo;
        if (estado !== 'PENDIENTE' && estado !== 'CONFIRMADO' && estado !== 'FIRMADO') {
            return false
        }
        await this._pagoRepository.deleteByIDarriendo(arriendo.id_arriendo);
        const rollback = { estado_arriendo: "PENDIENTE" }
        await this._arriendoRepository.putUpdate(rollback, arriendo.id_arriendo)
        return true;
    }

    async rollbackVistaRequisito(id_arriendo) {
        const arriendo = await this._arriendoRepository.getFindOne(id_arriendo);
        const estado = arriendo.estado_arriendo;
        if (estado !== 'PENDIENTE' && estado !== 'CONFIRMADO' && estado !== 'FIRMADO') {
            return false;
        }
        const rollback = { estado_arriendo: "PENDIENTE" }
        await this._garantiaRepository.deleteByIDarriendo(arriendo.id_arriendo);
        await this._requisitoRepository.deleteByIdArriendo(arriendo.id_arriendo);
        await this._arriendoRepository.putUpdate(rollback, arriendo.id_arriendo)
        return true;
    }


}


module.exports = UtilsBusiness;