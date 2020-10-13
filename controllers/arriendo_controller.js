const {
    Usuario,
    Arriendo,
    Cliente,
    Conductor,
    Empresa,
    Accesorio,
    Vehiculo,
} = require("../db");

class ArriendoController {
    async getArriendos(req, res) {
        const arriendos = await Arriendo.findAll({
            where: { id_sucursal: req.body.id_sucursal },
            include: [
                { model: Usuario, attributes: ["nombre_usuario"] },
                { model: Cliente, attributes: ["nombre_cliente"] },
                { model: Empresa, attributes: ["nombre_empresa"] },
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
        const arriendos = await Arriendo.findAll({
            where: { estado_arriendo: "FIRMADO", id_sucursal: req.body.id_sucursal },
            include: [
                { model: Usuario, attributes: ["nombre_usuario"] },
                { model: Vehiculo, attributes: ["patente_vehiculo"] },
                { model: Cliente, attributes: ["nombre_cliente"] },
                { model: Empresa, attributes: ["nombre_empresa"] },
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

        if (response.tipo_arriendo == 1) {
            response.tipo_arriendo = "PARTICULAR";
        } else if (response.tipo_arriendo == 2) {
            response.tipo_arriendo = "REMPLAZO";
        } else {
            response.tipo_arriendo = "EMPRESA";
        }
        const dataArriendo = {
            estado_arriendo: response.estado_arriendo,
            kilometrosEntrada_arriendo: response.kilometrosEntrada_arriendo,
            kilometrosSalida_arriendo: null,
            kilometrosMantencion_arriendo: response.kilometrosMantencion_arriendo,
            ciudadEntrega_arriendo: response.ciudadEntrega_arriendo,
            fechaEntrega_arriendo: response.fechaEntrega_arriendo,
            ciudadRecepcion_arriendo: response.ciudadRecepcion_arriendo,
            fechaRecepcion_arriendo: response.fechaRecepcion_arriendo,
            numerosDias_arriendo: response.numerosDias_arriendo,
            tipo_arriendo: response.tipo_arriendo,

            //foraneas
            id_usuario: response.id_usuario,
            patente_vehiculo: response.patente_vehiculo,
            id_sucursal: response.id_sucursal,
            rut_conductor: response.rut_conductor,
            rut_cliente: response.rut_cliente ? response.rut_cliente : null,
            rut_empresa: response.rut_empresa ? response.rut_empresa : null,
        };

        //se crea el arriendo
        const a = await Arriendo.create(dataArriendo);

        const arriendo = await Arriendo.findOne({
            include: [
                { model: Usuario, attributes: ["nombre_usuario"] },
                { model: Cliente, attributes: ["nombre_cliente"] },
                { model: Empresa, attributes: ["nombre_empresa"] },
            ],
            where: { id_arriendo: a.id_arriendo },
            attributes: [
                "id_arriendo",
                "createdAt",
                "tipo_arriendo",
                "estado_arriendo",
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

        await Arriendo.update({ estado_arriendo: response.estado_arriendo }, {
            where: { id_arriendo: req.params.id },
        });

        await Vehiculo.update({ estado_vehiculo: response.estado_vehiculo }, {
            where: { patente_vehiculo: response.patente_vehiculo },
        });

        res.json({
            success: true,
            msg: "registro exitoso",
        });
    }
}

module.exports = ArriendoController;