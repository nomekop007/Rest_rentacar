const {
    ActaEntrega,
    Arriendo,
    Vehiculo,
    Despacho,
    Cliente,
    Empresa,
    Remplazo,
} = require("../db");
const fs = require("fs");
const path = require("path");
const { v5: uuidv5 } = require("uuid");
const PdfPrinter = require("pdfmake");
const nodemailer = require("nodemailer");
const logo = require.resolve("../utils/images/logo2.png");
const {
    fecha,
    hora,
    fechahorafirma,
    sendError,
} = require("../helpers/components");
const base64 = require("image-to-base64");
const actaEntregaPlantilla = require("../utils/pdf_plantillas/actaEntrega");

class ActaEntregaController {
    async createActaEntrega(req, res) {
        try {
            const response = req.body;

            const actaEntrega = await ActaEntrega.create(response);
            res.json({
                success: true,
                data: actaEntrega,
            });
        } catch (error) {
            sendError(error, res);
        }
    }
    async generatePDFactaEntrega(req, res) {
        try {
            const response = req.body;
            const arriendo = await Arriendo.findOne({
                where: { id_arriendo: response.id_arriendo },
                include: [
                    { model: Despacho },
                    {
                        model: Vehiculo,
                        attributes: [
                            "marca_vehiculo",
                            "modelo_vehiculo",
                            "año_vehiculo",
                            "color_vehiculo",
                            "patente_vehiculo",
                        ],
                    },
                ],
            });
            response.vehiculo = arriendo.vehiculo;
            response.kilometraje = arriendo.kilometrosEntrada_arriendo;
            response.id_arriendo = arriendo.id_arriendo;
            response.fecha = fecha();
            response.hora = hora();
            response.fechaHoraFirma = fechahorafirma();
            if (arriendo.estado_arriendo === "FIRMADO" && arriendo.despacho == null) {
                const docDefinition = await actaEntregaPlantilla(response);
                const fonts = {
                    Roboto: {
                        normal: require.resolve("../utils/fonts/Roboto-Regular.ttf"),
                        bold: require.resolve("../utils/fonts/Roboto-Medium.ttf"),
                        italics: require.resolve("../utils/fonts/Roboto-Italic.ttf"),
                        bolditalics: require.resolve(
                            "../utils/fonts/Roboto-MediumItalic.ttf"
                        ),
                    },
                };
                //se genera un nombre combinado con la id del arriendo
                const nameFile = uuidv5(
                    "actaEntrega-" + arriendo.id_arriendo,
                    uuidv5.URL
                );

                const printer = new PdfPrinter(fonts);
                const pdfDoc = printer.createPdfKitDocument(docDefinition);

                //se guarda el pdf en una ruta predeterminada
                pdfDoc.pipe(
                    fs.createWriteStream(
                        path.join(
                            __dirname,
                            "../uploads/documentos/actaEntrega/" + nameFile + ".pdf"
                        )
                    )
                );
                pdfDoc.end();

                setTimeout(() => {
                    res.json({
                        success: true,
                        data: {
                            nombre_documento: nameFile,
                            firma1: response.firma1PNG,
                            firma2: response.firma2PNG,
                        },
                    });
                }, 2000);
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
            const arriendo = await Arriendo.findOne({
                where: { id_arriendo: response.id_arriendo },
                include: [
                    { model: Cliente, attributes: ["correo_cliente", "nombre_cliente"] },
                    { model: Empresa, attributes: ["correo_empresa", "nombre_empresa"] },
                    {
                        model: Despacho,
                        include: [{ model: ActaEntrega }],
                    },
                    {
                        model: Remplazo,
                        include: [{
                            model: Cliente,
                            attributes: ["correo_cliente", "nombre_cliente"],
                        }, ],
                    },
                ],
            });

            const client = {};
            switch (arriendo.tipo_arriendo) {
                case "PARTICULAR":
                    client.name = arriendo.cliente.nombre_cliente;
                    client.correo = arriendo.cliente.correo_cliente;
                    break;
                case "REMPLAZO":
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
                auth: {
                    user: process.env.EMAIL_USER,
                    pass: process.env.EMAIL_PASS,
                },
                tls: {
                    rejectUnauthorized: false,
                },
            });

            //client.correo

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
                    path: path.join(
                        __dirname,
                        "../uploads/documentos/actaEntrega/" +
                        arriendo.despacho.actasEntrega.documento +
                        ".pdf"
                    ),
                }, ],
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

module.exports = ActaEntregaController;