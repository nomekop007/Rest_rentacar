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
} = require("../db");
const nodemailer = require("nodemailer");
const path = require("path");

class ArriendoController {
    async getArriendos(req, res) {
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
    }

    async getArriendosListos(req, res) {
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
    }

    async findArriendo(req, res) {
        const arriendo = await Arriendo.findOne({
            where: { id_arriendo: req.params.id },
            include: [
                { model: Cliente },
                { model: Empresa },
                { model: Vehiculo },
                { model: Conductor },
                { model: Accesorio },
                { model: Usuario, attributes: ["nombre_usuario"] },
                {
                    model: Remplazo,
                    include: [{ model: Cliente }],
                },
            ],
        });

        if (arriendo) {
            res.json({
                success: true,
                data: arriendo,
            });
        } else {
            res.json({
                success: false,
                msg: "sin datos",
            });
        }
    }

    async createArriendo(req, res) {
        const response = req.body;

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
    }

    async stateArriendo(req, res) {
        const response = req.body;

        await Arriendo.update({ estado_arriendo: response.estado_arriendo, userAt: response.userAt }, {
            where: { id_arriendo: req.params.id },
        });

        res.json({
            success: true,
            msg: "registro exitoso",
        });
    }

    async sendEmail(req, res) {
        const response = req.body;
        const arriendo = await Arriendo.findOne({
            where: { id_arriendo: response.id_arriendo },
            include: [
                { model: Cliente, attributes: ["correo_cliente", "nombre_cliente"] },
                { model: Empresa, attributes: ["correo_empresa", "nombre_empresa"] },
                { model: Contrato },
            ],
        });

        //datos del email hosting
        const transporter = nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port: process.env.EMAIL_PORT,
            secure: false,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        const client = {};
        switch (arriendo.tipo_arriendo) {
            case "PARTICULAR":
                client.name = arriendo.cliente.nombre_cliente;
                client.correo = arriendo.cliente.correo_cliente;
                break;
            case "REMPLAZO":
                client.name = arriendo.cliente.nombre_cliente;
                client.correo = arriendo.cliente.correo_cliente;
                break;
            case "EMPRESA":
                client.name = arriendo.empresa.nombre_empresa;
                client.correo = arriendo.empresa.correo_empresa;
                break;
            default:
                break;
        }

        //datos del mensaje y su destinatario
        const mailOptions = {
            from: client.name,
            to: client.correo,
            subject: "COPIA DE CONTRATO RENT A CAR",
            text: "se adjunta copia del contrato Rent a Car",
            attachments: [{
                filename: "contrato",
                path: path.join(
                    __dirname,
                    "../uploads/documentos/contratos/" +
                    arriendo.contratos[0].documento +
                    ".pdf"
                ),
            }, ],
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (!error) {
                res.json({
                    success: true,
                    msg: "email enviado",
                });
            } else {
                res.json({
                    success: false,
                    msg: " a ocurrido un error al enviar el email",
                    data: arriendo,
                });
            }
        });
    }
}

module.exports = ArriendoController;