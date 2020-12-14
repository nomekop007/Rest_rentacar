const ContratoService = require("../services/contrato.service");
const ArriendoService = require("../services/arriendo.service");
const ConductorService = require("../services/conductor.service");
const { sendError, ordenarArrayporFecha } = require("../helpers/components");
const contratoPlantilla = require("../utils/pdf_plantillas/contratoArriendo");
const logo = require.resolve("../utils/images/logo2.png");
const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const nodemailer = require("nodemailer");
const base64 = require("image-to-base64");
const pdfMake = require('pdfmake/build/pdfmake.js');
const pdfFonts = require('pdfmake/build/vfs_fonts.js');
pdfMake.vfs = pdfFonts.pdfMake.vfs;


class contrato_controller {
    constructor() {
        this.serviceContrato = new ContratoService();
        this.serviceArriendo = new ArriendoService();
        this.serviceConductor = new ConductorService();
    }


    async createContrato(req, res) {
        try {
            const response = req.body;
            const arriendo = await this.serviceArriendo.getFindOne(response.id_arriendo);
            const nameFile = uuidv4();
            const pathFile = path.join(__dirname, `${process.env.PATH_CONTRATO}/${nameFile}.pdf`)
            fs.writeFileSync(pathFile, response.base64, "base64", (err) => {
                res.json({
                    success: false,
                    msg: err
                });
                return;
            });
            //guarda el ultimo pago en el contrato
            const fila = arriendo.pagosArriendos.length - 1;
            response.id_pagoArriendo = arriendo.pagosArriendos[fila].id_pagoArriendo;
            response.documento = nameFile + ".pdf";
            const contrato = await this.serviceContrato.postCreate(response);
            res.json({
                success: true,
                data: contrato,
            });
        } catch (error) {
            sendError(error, res);
        }
    }



    async generatePDFContrato(req, res) {
        try {
            const response = req.body;
            const arriendo = await this.serviceArriendo.getFindOne(response.id_arriendo);
            //si existen mas conductores los busca
            if (arriendo.rut_conductor2) response.conductor2 = await this.serviceConductor.getFindByPK(arriendo.rut_conductor2);
            if (arriendo.rut_conductor3) response.conductor3 = await this.serviceConductor.getFindByPK(arriendo.rut_conductor3);
            // si no hay garantia&archivos se detiene
            if (!arriendo.garantia || !arriendo.requisito) {
                res.json({
                    success: false,
                    msg: "falta registrar garantia y subir archivos requeridos!"
                });
                return;
            }
            //si no es uno de estos estados se detiene
            if (arriendo.estado_arriendo != "CONFIRMADO" && arriendo.estado_arriendo != "E-CONFIRMADO") {
                res.json({
                    success: false,
                    msg: "el documento esta firmado!"
                });
                return;
            }
            response.arriendo = arriendo;
            //se genera el documento
            const docDefinition = await contratoPlantilla(response);
            const pdfDocGenerator = pdfMake.createPdf(docDefinition);
            pdfDocGenerator.getBase64((base64) => {
                res.json({
                    success: true,
                    data: {
                        firma: response.firmaClientePNG,
                        base64: base64
                    },
                });
            });
        } catch (error) {
            sendError(error, res);
        }
    }


    async sendEmailContrato(req, res) {
        try {
            const response = req.body;
            const arriendo = await this.serviceArriendo.getFindOneMin(response.id_arriendo);
            const client = {};
            //funcion para ordenar el array de pagos por fecha de creacion y poner el mas nuevo al final
            const contratos = ordenarArrayporFecha(arriendo.contratos);
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

            //datos del email hosting
            const transporter = nodemailer.createTransport({
                host: process.env.EMAIL_HOST,
                port: process.env.EMAIL_PORT,
                secure: false,
                auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
                tls: { rejectUnauthorized: false },
            });
            //datos del mensaje y su destinatario
            const mailOptions = {
                from: "'Rent A Car - Grupo Firma' <api.rentacarmaule@grupofirma.cl>",
                to: client.correo,
                subject: "COPIA DE CONTRATO RENT A CAR",
                text: "Se adjunta copia del contrato Rent a Car",
                html: `
                <p>Sr.(a) ${client.name}:</p>
                <p>Por este medio envio su copia del contrato de arriendo de Rent a Car.</p>
                <br><br>
                <p>------------------------------------------------------------------------------------------------------------------------------</p>
                <p>Atentamente, Rent a Car Maule Ltda. </p>
                <img src="data:image/jpeg;base64,${await base64(logo)}" width="200" height="50"  />
                `,
                attachments: [{
                    filename: "CONSTRATO.pdf",
                    contentType: "pdf",
                    path: path.join(__dirname, `${process.env.PATH_CONTRATO}/${contratos[contratos.length - 1].documento}`)
                },],
            };
            const resp = await transporter.sendMail(mailOptions);
            res.json({
                success: true,
                msg: resp,
            });
        } catch (error) {
            sendError(error, res);
        }
    }



}

module.exports = contrato_controller;