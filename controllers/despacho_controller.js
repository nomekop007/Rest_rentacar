const { Despacho, Arriendo, Cliente, Empresa, ActaEntrega, Remplazo } = require("../db");
const nodemailer = require("nodemailer");
const path = require("path");

class DespachoController {
    async createDespacho(req, res, next) {
        try {
            const response = req.body;

            const despacho = await Despacho.create(response);

            res.json({
                success: true,
                id_despacho: despacho.id_despacho
            })

            next(despacho.logging);
        } catch (error) {
            res.json({
                success: false,
                msg: "error: " + error,
            });
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
                        include: [{ model: Cliente, attributes: ["correo_cliente", "nombre_cliente"] }],
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


            //datos del mensaje y su destinatario
            const mailOptions = {
                from: "'Rent A Car - Grupo Firma' <api.rentacarmaule@grupofirma.cl>",
                to: client.correo,
                subject: "COPIA DE ACTA DE ENTREGA RENT A CAR",
                text: "se adjunta copia del Acta de entrega de Rent a Car",
                html: "<h4>se adjunta copia del Acta de entrega de arriendo Rent a Car</h4>",
                attachments: [{
                    filename: "actaEntrega.pdf",
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
            res.json({
                success: false,
                msg: "error: " + error,
            });
        }
    }
}

module.exports = DespachoController;