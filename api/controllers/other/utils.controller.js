const fs = require("fs");
const path = require("path");

class UtilsController {

    constructor({ ArriendoRepository, ContratoRepository, PagoArriendoRepository, GarantiaRepository, RequisitoRepository, sendError }) {
        this._serviceArriendo = ArriendoRepository;
        this._serviceContrato = ContratoRepository;
        this._servicePagoArriendo = PagoArriendoRepository;
        this._serviceGarantia = GarantiaRepository;
        this._serviceRequisito = RequisitoRepository;
        this.sendError = sendError;
    }

    async findDocumento(req, res) {
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
            const link = `${process.env.PATH_SERVER}/${documento}`;
            const base64 = fs.readFileSync(paths, { encoding: "base64" });
            res.json({
                success: true,
                data: {
                    link: link,
                    nombre: documento,
                    tipo: tipo,
                    base64: base64
                },
            });
        } catch (error) {
            this.sendError(error, req, res);
        }
    }


    async rollbackVistaFirma(req, res) {
        try {
            const arriendo = await this._serviceArriendo.getFindOne(req.params.id);
            const estado = arriendo.estado_arriendo;
            if (estado !== 'PENDIENTE' && estado !== 'CONFIRMADO' && estado !== 'FIRMADO') {
                res.json({ success: false, msg: "este arriendo ya esta despachado!" })
                return;
            }
            let rollback = {};
            if (arriendo.pagosArriendos.length !== 0) rollback = { estado_arriendo: "CONFIRMADO" };
            else rollback = { estado_arriendo: "PENDIENTE" };
            await this._serviceContrato.deleteByIDArriendo(arriendo.id_arriendo);
            await this._serviceArriendo.putUpdate(rollback, arriendo.id_arriendo);
            res.json({ success: true, msg: "hecho!" })
        } catch (error) {
            this.sendError(error, req, res);
        }
    }


    async rollbackVistaPago(req, res) {
        try {
            const arriendo = await this._serviceArriendo.getFindOne(req.params.id);
            const estado = arriendo.estado_arriendo;
            if (estado !== 'PENDIENTE' && estado !== 'CONFIRMADO' && estado !== 'FIRMADO') {
                res.json({ success: false, msg: "este arriendo ya esta despachado!" })
                return;
            }
            await this._servicePagoArriendo.deleteByIDarriendo(arriendo.id_arriendo);
            const rollback = { estado_arriendo: "PENDIENTE" }
            await this._serviceArriendo.putUpdate(rollback, arriendo.id_arriendo)
            res.json({ success: true, msg: "hecho!" })
        } catch (error) {
            this.sendError(error, req, res);
        }
    }


    async rollbackVistaRequisito(req, res) {
        try {
            const arriendo = await this._serviceArriendo.getFindOne(req.params.id);
            const estado = arriendo.estado_arriendo;
            if (estado !== 'PENDIENTE' && estado !== 'CONFIRMADO' && estado !== 'FIRMADO') {
                res.json({ success: false, msg: "este arriendo ya esta despachado!" })
                return;
            }
            const rollback = { estado_arriendo: "PENDIENTE" }
            await this._serviceGarantia.deleteByIDarriendo(arriendo.id_arriendo);
            await this._serviceRequisito.deleteByIdArriendo(arriendo.id_arriendo);
            await this._serviceArriendo.putUpdate(rollback, arriendo.id_arriendo)
            res.json({ success: true, msg: "hecho!" })
        } catch (error) {
            this.sendError(error, req, res);
        }
    }


}


module.exports = UtilsController;