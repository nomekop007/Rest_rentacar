const ArriendoService = require("../services/arriendo.service");
const ContratoService = require("../services/contrato.service");
const PagoArriendoService = require("../services/pagoArriendo.service");
const GarantiaService = require("../services/garantia.service");
const RequisitoService = require("../services/requisito.service");

const { sendError } = require("../helpers/components");
const fs = require("fs");
const path = require("path");

class UtilsController {

    constructor() {
        this.serviceArriendo = new ArriendoService();
        this.serviceContrato = new ContratoService();
        this.servicePagoArriendo = new PagoArriendoService();
        this.serviceGarantia = new GarantiaService();
        this.serviceRequisito = new RequisitoService();
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
            const base64 = fs.readFileSync(paths, { encoding: "base64" });
            res.json({
                success: true,
                data: {
                    nombre: documento,
                    tipo: tipo,
                    base64: base64
                },
            });
        } catch (error) {
            sendError(error, res);
        }
    }


    async rollbackVistaFirma(req, res) {
        try {
            const arriendo = await this.serviceArriendo.getFindOne(req.params.id);
            const estado = arriendo.estado_arriendo;
            if (estado !== 'PENDIENTE' && estado !== 'CONFIRMADO' && estado !== 'FIRMADO') {
                res.json({ success: false, msg: "este arriendo ya esta despachado!" })
                return;
            }
            let rollback = {};
            if (arriendo.pagosArriendos.length !== 0) rollback = { estado_arriendo: "CONFIRMADO" };
            else rollback = { estado_arriendo: "PENDIENTE" };
            await this.serviceContrato.deleteByIDArriendo(arriendo.id_arriendo);
            await this.serviceArriendo.putUpdate(rollback, arriendo.id_arriendo);
            res.json({ success: true, msg: "hecho!" })
        } catch (error) {
            sendError(error, res)
        }
    }


    async rollbackVistaPago(req, res) {
        try {
            const arriendo = await this.serviceArriendo.getFindOne(req.params.id);
            const estado = arriendo.estado_arriendo;
            if (estado !== 'PENDIENTE' && estado !== 'CONFIRMADO' && estado !== 'FIRMADO') {
                res.json({ success: false, msg: "este arriendo ya esta despachado!" })
                return;
            }
            await this.servicePagoArriendo.deleteByIDarriendo(arriendo.id_arriendo);
            const rollback = { estado_arriendo: "PENDIENTE" }
            await this.serviceArriendo.putUpdate(rollback, arriendo.id_arriendo)
            res.json({ success: true, msg: "hecho!" })
        } catch (error) {
            sendError(error, res)
        }
    }


    async rollbackVistaRequisito(req, res) {
        try {
            const arriendo = await this.serviceArriendo.getFindOne(req.params.id);
            const estado = arriendo.estado_arriendo;
            if (estado !== 'PENDIENTE' && estado !== 'CONFIRMADO' && estado !== 'FIRMADO') {
                res.json({ success: false, msg: "este arriendo ya esta despachado!" })
                return;
            }
            const rollback = { estado_arriendo: "PENDIENTE" }
            await this.serviceGarantia.deleteByIDarriendo(arriendo.id_arriendo);
            await this.serviceRequisito.deleteByIdArriendo(arriendo.id_arriendo);
            await this.serviceArriendo.putUpdate(rollback, arriendo.id_arriendo)
            res.json({ success: true, msg: "hecho!" })
        } catch (error) {
            sendError(error, res)
        }
    }


}


module.exports = UtilsController;