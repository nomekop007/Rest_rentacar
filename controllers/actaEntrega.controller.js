const ActaEntregaServices = require("../services/actaEntrega.service");
const ArriendoServices = require("../services/arriendo.service");
const { fecha, nodemailerTransporter, hora, fechahorafirma, sendError } = require("../helpers/components");
const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const logo = require.resolve("../utils/images/logo2.png");
const base64 = require("image-to-base64");
const actaEntregaPlantilla = require("../utils/pdf_plantillas/actaEntrega");
const pdfMake = require('pdfmake/build/pdfmake.js');
const pdfFonts = require('pdfmake/build/vfs_fonts.js');
pdfMake.vfs = pdfFonts.pdfMake.vfs;



class ActaEntregaController {
    constructor() {
        this.serviceActaEntrega = new ActaEntregaServices();
        this.serviceArriendo = new ArriendoServices();
    }

    async createActaEntrega(req, res, next) {
        try {
            const response = req.body;
            const nameFile = uuidv4();
            const pathFile = path.join(__dirname, `${process.env.PATH_ACTA_ENTREGA}/${nameFile}.pdf`)
            fs.writeFileSync(pathFile, response.base64, "base64", (err) => {
                res.json({
                    success: false,
                    msg: err
                });
                return;
            });
            response.documento = nameFile + ".pdf";
            const actaEntrega = await this.serviceActaEntrega.postCreate(response);
            res.json({
                success: true,
                data: actaEntrega,
            });
            next();
        } catch (error) {
            sendError(error, res);
        }
    }



    async generatePDFactaEntrega(req, res) {
        try {
            const response = req.body;
            const arriendo = await this.serviceArriendo.getFindOne(response.id_arriendo);
            response.vehiculo = arriendo.vehiculo;
            response.kilometraje = arriendo.kilometrosEntrada_arriendo;
            response.id_arriendo = arriendo.id_arriendo;
            response.fecha = fecha();
            response.hora = hora();
            response.fechaHoraFirma = fechahorafirma();
            if (arriendo.estado_arriendo === "FIRMADO" && arriendo.despacho == null) {
                const docDefinition = await actaEntregaPlantilla(response);
                const pdfDocGenerator = pdfMake.createPdf(docDefinition);
                pdfDocGenerator.getBase64((base64) => {
                    res.json({
                        success: true,
                        data: {
                            firma1: response.firma1PNG,
                            firma2: response.firma2PNG,
                            base64: base64
                        },
                    });
                });
            } else {
                res.json({
                    success: false,
                    msg: "el arriendo ya esta despachado o no esta firmado!",
                });
            }
        } catch (error) {
            sendError(error, res);
        }
    }



    async sendEmailActaEntrega(req, res) {
        try {
            const response = req.body;
            const arriendo = await this.serviceArriendo.getFindOne(response.id_arriendo);
            const client = {};
            switch (arriendo.tipo_arriendo) {
                case "PARTICULAR":
                    client.name = arriendo.cliente.nombre_cliente;
                    client.correo = arriendo.cliente.correo_cliente;
                    break;
                case "REEMPLAZO":
                    client.name = arriendo.remplazo.cliente.nombre_cliente;
                    client.correo = arriendo.remplazo.cliente.correo_cliente;
                    break;
                case "EMPRESA":
                    client.name = arriendo.empresa.nombre_empresa;
                    client.correo = arriendo.empresa.correo_empresa;
                    break;
            }

            //datos del mensaje y su destinatario
            const mailOptions = {
                from: "'Rent A Car - Grupo Firma' <api.rentacarmaule@grupofirma.cl>",
                to: client.correo,
                bcc: "api.rentacarmaule@grupofirma.cl",
                subject: "COPIA DE ACTA DE ENTREGA RENT A CAR",
                text: "Se adjunta copia del Acta de entrega de Rent a Car",
                html: `
                <p>Sr.(a) ${client.name}:</p>
                <p>Por este medio envio su copia del Acta de entrega de Rent a Car.</p>
                <br><br>
                <p>------------------------------------------------------------------------------------------------------------------------------</p>
                <p>Atentamente, Rent a Car Maule Ltda. </p>
                <img src="data:image/jpeg;base64,${await base64(
                    logo
                )}" width="200" height="50"  />
                `,
                attachments: [{
                    filename: "ACTA-DE-ENTREGA.pdf",
                    contentType: "pdf",
                    path: path.join(__dirname, `${process.env.PATH_ACTA_ENTREGA}/${arriendo.despacho.actasEntrega.documento}`),
                },],
            };
            const resp = await nodemailerTransporter.sendMail(mailOptions);
            res.json({
                success: true,
                msg: resp,
            });
        } catch (error) {
            sendError(error, res);
        }
    }



    async findActaEntrega(req, res) {
        try {
            const actaEntrega = await this.serviceActaEntrega.getFindOneByIDdespacho(req.params.id);
            const pathFile = path.join(__dirname, `${process.env.PATH_ACTA_ENTREGA}/${actaEntrega.documento}`)
            const base64 = fs.readFileSync(pathFile, { encoding: 'base64' });
            res.json({
                success: true,
                data: { actaEntrega: actaEntrega, base64: base64 },
            });
        } catch (error) {
            sendError(error, res);
        }
    }
}

module.exports = ActaEntregaController;