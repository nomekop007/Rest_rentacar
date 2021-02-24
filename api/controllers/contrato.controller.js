
const { nodemailerTransporter, ordenarArrayporFecha } = require("../helpers/components");
const contratoPlantilla = require("../utils/pdf_plantillas/contratoArriendo");
const extencionPlantilla = require("../utils/pdf_plantillas/extenderArriendo");
const logo = require.resolve("../utils/images/logo2.png");
const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const base64 = require("image-to-base64");
const pdfMake = require('pdfmake/build/pdfmake.js');
const pdfFonts = require('pdfmake/build/vfs_fonts.js');
pdfMake.vfs = pdfFonts.pdfMake.vfs;


class contrato_controller {
    constructor({ ContratoService, ArriendoService, ConductorService, ExtencionService, sendError }) {
        this._serviceContrato = ContratoService;
        this._serviceArriendo = ArriendoService;
        this._serviceConductor = ConductorService;
        this._serviceExtencion = ExtencionService;
        this.sendError = sendError
    }


    async createContrato(req, res) {
        try {
            const response = req.body;
            const arriendo = await this._serviceArriendo.getFindOne(response.id_arriendo);
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
            const arrayPagos = ordenarArrayporFecha(arriendo.pagosArriendos);
            const fila = arrayPagos.length - 1;
            const dataContrato = {
                documento: nameFile + ".pdf",
                id_pagoArriendo: arrayPagos[fila].id_pagoArriendo,
                id_arriendo: arriendo.id_arriendo,
                userAt: req.headers["userat"]
            }
            const contrato = await this._serviceContrato.postCreate(dataContrato);
            res.json({
                success: true,
                data: contrato,
            });
        } catch (error) {
            this.sendError(error, req, res);
        }
    }


    async createExtencionContrato(req, res) {
        try {
            const { id_extencion, base64 } = req.body;
            const extencion = await this._serviceExtencion.findOne(id_extencion);
            const nameFile = uuidv4();
            const pathFile = path.join(__dirname, `${process.env.PATH_CONTRATO}/${nameFile}.pdf`)
            fs.writeFileSync(pathFile, base64, "base64", (err) => {
                res.json({
                    success: false,
                    msg: err
                });
                return;
            });
            const data = {
                documento: nameFile + ".pdf",
                id_pagoArriendo: extencion.id_pagoArriendo,
                id_arriendo: extencion.id_arriendo,
                userAt: req.headers["userat"],
            };
            const contrato = await this._serviceContrato.postCreate(data);
            await this._serviceExtencion.putUpdateById({ id_contrato: contrato.id_contrato, estado_extencion: "FIRMADO" }, id_extencion);
            res.json({
                success: true,
                data: contrato,
            });
        } catch (error) {
            this.sendError(error, req, res);
        }
    }


    async subirContrato(req, res) {
        try {
            const arriendo = await this._serviceArriendo.getFindOne(req.params.id);
            const arrayPagos = ordenarArrayporFecha(arriendo.pagosArriendos);
            const fila = arrayPagos.length - 1;
            const data = {
                documento: req.file.filename,
                id_pagoArriendo: arrayPagos[fila].id_pagoArriendo,
                id_arriendo: req.params.id,
                userAt: req.headers["userat"],
            };
            const contrato = await this._serviceContrato.postCreate(data);
            res.json({
                success: true,
                data: contrato
            });
        } catch (error) {
            this.sendError(error, req, res);
        }
    }


    async subirExtencionContrato(req, res) {
        try {
            const extencion = await this._serviceExtencion.findOne(req.params.id);
            if (extencion.estado_extencion == "FIRMADO") {
                res.json({ success: false, msg: "este contrato ya esta firmada!" });
                return;
            }
            const data = {
                documento: req.file.filename,
                id_pagoArriendo: extencion.id_pagoArriendo,
                id_arriendo: extencion.id_arriendo,
                userAt: req.headers["userat"],
            };
            const contrato = await this._serviceContrato.postCreate(data);
            await this._serviceExtencion.putUpdateById({
                id_contrato: contrato.id_contrato,
                estado_extencion: "FIRMADO"
            }, req.params.id);
            res.json({ success: true, data: contrato });
        } catch (error) {
            this.sendError(error, req, res);
        }
    }



    async generatePDFContrato(req, res) {
        try {
            const response = req.body;
            const arriendo = await this._serviceArriendo.getFindOne(response.id_arriendo);
            //si existen mas conductores los busca
            if (arriendo.rut_conductor2) response.conductor2 = await this._serviceConductor.getFindByPK(arriendo.rut_conductor2);
            if (arriendo.rut_conductor3) response.conductor3 = await this._serviceConductor.getFindByPK(arriendo.rut_conductor3);
            // si no hay garantia&archivos, se detiene
            if (!arriendo.requisito) {
                res.json({ success: false, msg: "falta subir archivos requeridos!" });
                return;
            }
            //si no es uno de estos estados, se detiene
            if (arriendo.estado_arriendo != "CONFIRMADO" && arriendo.estado_arriendo != "E-CONFIRMADO") {
                res.json({ success: false, msg: "el documento esta firmado!" });
                return;
            }
            // si el primer pago no esta pagado , se detiene
            if (arriendo.tipo_arriendo != "REEMPLAZO" && arriendo.estado_arriendo == "CONFIRMADO") {
                console.log(arriendo.pagosArriendos[0].pagos[0].estado_pago);
                if (arriendo.pagosArriendos[0].pagos[0].estado_pago != "PAGADO") {
                    res.json({ success: false, msg: "se debe subir el comprobante de pago antes de firmar el contrato!" });
                    return;
                }
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
            this.sendError(error, req, res);
        }
    }


    async generatePDFExtencion(req, res) {
        try {
            const response = req.body;
            const extencion = await this._serviceExtencion.findOne(response.id_extencion);
            const arriendo = await this._serviceArriendo.getFindOne(extencion.id_arriendo);
            //si existen mas conductores los busca
            if (arriendo.rut_conductor2) response.conductor2 = await this._serviceConductor.getFindByPK(arriendo.rut_conductor2);
            if (arriendo.rut_conductor3) response.conductor3 = await this._serviceConductor.getFindByPK(arriendo.rut_conductor3);
            response.arriendo = arriendo;
            response.extencion = extencion;
            //se genera el documento
            const docDefinition = await extencionPlantilla(response);
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
            this.sendError(error, req, res);
        }
    }


    async sendEmailContrato(req, res) {
        try {
            const response = req.body;
            const arriendo = await this._serviceArriendo.getFindOneMin(response.id_arriendo);
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

            //datos del mensaje y su destinatario
            const mailOptions = {
                from: "'Rent A Car - Grupo Firma' <api.rentacarmaule@grupofirma.cl>",
                to: client.correo,
                bcc: process.env.CORREO_SUPERVISOR,
                subject: "COPIA DE CONTRATO RENT A CAR",
                text: "Se adjunta copia del contrato Rent a Car",
                html: `
                <p>Sr.(a) ${client.name}:</p>
                <p>Por este medio envio su copia del contrato de arriendo de Rent a Car.</p>
                <br><br>
                <p>------------------------------------------------------------------------------------------------------------------------------</p>
                <p>Atentamente, Rent a Car Maule Ltda. </p>
                <p>Por favor no responder este correo.</p>
                <img src="data:image/jpeg;base64,${await base64(logo)}" width="200" height="50"  />
                `,
                attachments: [{
                    filename: "CONSTRATO.pdf",
                    contentType: "pdf",
                    path: path.join(__dirname, `${process.env.PATH_CONTRATO}/${contratos[contratos.length - 1].documento}`)
                },],
            };
            const resp = await nodemailerTransporter.sendMail(mailOptions);
            res.json({
                success: true,
                msg: resp,
            });
        } catch (error) {
            this.sendError(error, req, res);
        }
    }


    async sendEmailContratoExtencion(req, res) {
        try {
            const { id_extencion } = req.body;
            const extencion = await this._serviceExtencion.findOne(id_extencion);
            const arriendo = await this._serviceArriendo.getFindOneMin(extencion.id_arriendo);
            const client = {};
            //funcion para ordenar el array de pagos por fecha de creacion y poner el mas nuevo al final
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
                bcc: process.env.CORREO_SUPERVISOR,
                subject: "COPIA DE CONTRATO RENT A CAR",
                text: "Se adjunta copia del contrato Rent a Car",
                html: `
                <p>Sr.(a) ${client.name}:</p>
                <p>Por este medio envio su copia del contrato de arriendo de Rent a Car.</p>
                <br><br>
                <p>------------------------------------------------------------------------------------------------------------------------------</p>
                <p>Atentamente, Rent a Car Maule Ltda. </p>
                <p>Por favor no responder este correo.</p>
                <img src="data:image/jpeg;base64,${await base64(logo)}" width="200" height="50"  />
                `,
                attachments: [{
                    filename: "CONSTRATO.pdf",
                    contentType: "pdf",
                    path: path.join(__dirname, `${process.env.PATH_CONTRATO}/${extencion.contrato.documento}`)
                },],
            };
            const resp = await nodemailerTransporter.sendMail(mailOptions);
            res.json({ success: true, msg: resp });
        } catch (error) {
            this.sendError(error, req, res);
        }
    }



}

module.exports = contrato_controller;