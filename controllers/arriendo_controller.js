const {
    Usuario,
    Arriendo,
    Cliente,
    Conductor,
    Empresa,
    Accesorio,
    Vehiculo,
    Contrato,
    Remplazo,
    Requisito,
} = require("../db");
const nodemailer = require("nodemailer");
const path = require("path");

class ArriendoController {
    async getArriendos(req, res) {
        try {
            //preguntar si el usuario no es administrador
            const where = {};
            if (req.body.id_rol != 1) {
                where.id_sucursal = req.body.id_sucursal;
            }

            const arriendos = await Arriendo.findAll({
                where: where,
                include: [
                    { model: Usuario, attributes: ["nombre_usuario"] },
                    { model: Cliente, attributes: ["nombre_cliente"] },
                    { model: Empresa, attributes: ["nombre_empresa"] },
                    {
                        model: Remplazo,
                        attributes: ["nombreEmpresa_remplazo"],
                        include: [{ model: Cliente, attributes: ["nombre_cliente"] }],
                    },
                ],
                attributes: [
                    "id_arriendo",
                    "createdAt",
                    "tipo_arriendo",
                    "estado_arriendo",
                ],
            });
            res.json({
                success: true,
                data: arriendos,
            });
        } catch (error) {
            res.json({
                success: false,
                msg: "error: " + error,
            });
        }
    }

    async getArriendosListos(req, res) {
        try {
            //preguntar si el usuario no es administrador
            const where = { estado_arriendo: "FIRMADO" };
            if (req.body.id_rol != 1) {
                where.id_sucursal = req.body.id_sucursal;
            }

            const arriendos = await Arriendo.findAll({
                where: where,
                include: [
                    { model: Usuario, attributes: ["nombre_usuario"] },
                    { model: Vehiculo, attributes: ["patente_vehiculo"] },
                    { model: Cliente, attributes: ["nombre_cliente"] },
                    { model: Empresa, attributes: ["nombre_empresa"] },
                    {
                        model: Remplazo,
                        attributes: ["nombreEmpresa_remplazo"],
                        include: [{ model: Cliente, attributes: ["nombre_cliente"] }],
                    },
                ],
                attributes: [
                    "id_arriendo",
                    "tipo_arriendo",
                    "estado_arriendo",
                    "fechaEntrega_arriendo",
                    "fechaRecepcion_arriendo",
                ],
            });

            res.json({
                success: true,
                data: arriendos,
            });
        } catch (error) {
            res.json({
                success: false,
                msg: "error: " + error,
            });
        }
    }

    async findArriendo(req, res) {
        try {
            const arriendo = await Arriendo.findOne({
                where: { id_arriendo: req.params.id },
                include: [
                    { model: Cliente },
                    { model: Empresa },
                    { model: Vehiculo },
                    { model: Conductor },
                    { model: Accesorio },
                    { model: Requisito },
                    { model: Usuario, attributes: ["nombre_usuario"] },
                    {
                        model: Remplazo,
                        include: [{ model: Cliente }],
                    },
                ],
            });
            res.json({
                success: true,
                data: arriendo,
            });
        } catch (error) {
            res.json({
                success: false,
                msg: "error: " + error,
            });
        }
    }

    async createArriendo(req, res, next) {
        try {
            let response = req.body;

            switch (response.tipo_arriendo) {
                case "PARTICULAR":
                    response.rut_empresa = null;
                    response.id_remplazo = null;
                    break;
                case "REMPLAZO":
                    response.rut_empresa = null;
                    response.rut_cliente = null;
                    break;
                case "EMPRESA":
                    response.id_remplazo = null;
                    response.rut_cliente = null;
                    break;
            }
            //se crea el arriendo
            const a = await Arriendo.create(response);

            const arriendo = await Arriendo.findOne({
                include: [
                    { model: Usuario, attributes: ["nombre_usuario"] },
                    { model: Cliente, attributes: ["nombre_cliente"] },
                    { model: Empresa, attributes: ["nombre_empresa"] },
                    {
                        model: Remplazo,
                        attributes: ["nombreEmpresa_remplazo"],
                        include: [{ model: Cliente, attributes: ["nombre_cliente"] }],
                    },
                ],
                where: { id_arriendo: a.id_arriendo },
                attributes: [
                    "id_arriendo",
                    "createdAt",
                    "tipo_arriendo",
                    "estado_arriendo",
                    "patente_vehiculo",
                ],
            });

            // en caso de querer crear un accesorio
            if (response.inputOtros != "") {
                const accesorio = await Accesorio.create({
                    nombre_accesorio: response.inputOtros,
                });
                //se registra en la tabla arriendos-accesorios
                await a.addAccesorios(accesorio);
            }
            res.json({
                success: true,
                msg: "registro exitoso",
                data: arriendo,
            });
            next(a.logging);
        } catch (error) {
            res.json({
                success: false,
                msg: "error: " + error,
            });
        }
    }

    async updateArriendo(req, res) {
        try {
            const response = req.body;
            const a = await Arriendo.findOne({
                where: { id_arriendo: req.params.id },
            });

            if (a.estado_arriendo === "PENDIENTE") {
                const arriendo = await Arriendo.update(response, {
                    where: { id_arriendo: req.params.id },
                });

                res.json({
                    success: true,
                    msg: "actualizacion exitoso",
                    data: arriendo,
                });
            } else {
                res.json({
                    success: false,
                    msg: "no es posible actualizar, contrato firmado",
                });
            }
        } catch (error) {
            res.json({
                success: false,
                msg: "error: " + error,
            });
        }
    }

    async sendEmail(req, res) {
        try {
            const response = req.body;
            const arriendo = await Arriendo.findOne({
                where: { id_arriendo: response.id_arriendo },
                include: [
                    { model: Cliente, attributes: ["correo_cliente", "nombre_cliente"] },
                    { model: Empresa, attributes: ["correo_empresa", "nombre_empresa"] },
                    { model: Contrato },
                    {
                        model: Remplazo,
                        include: [{ model: Cliente }],
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
                subject: "COPIA DE CONTRATO RENT A CAR",
                text: "se adjunta copia del contrato Rent a Car",
                html: "<h4>se adjunta copia del contrato de arriendo Rent a Car</h4>",
                attachments: [{
                    filename: "contrato.pdf",
                    contentType: "pdf",
                    path: path.join(
                        __dirname,
                        "../uploads/documentos/contratos/" +
                        arriendo.contratos[0].documento +
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

module.exports = ArriendoController;