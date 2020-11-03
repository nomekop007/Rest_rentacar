const {
    Usuario,
    Arriendo,
    Cliente,
    Conductor,
    Empresa,
    Accesorio,
    Vehiculo,
    Remplazo,
    Requisito,
    Garantia,
} = require("../db");

class ArriendoController {
    async getArriendos(req, res) {
        try {
            //preguntar si el usuario no es administrador
            const where = {};
            if (req.body.id_rol != 1) {
                where.id_sucursal = req.body.id_sucursal;
            }
            if (req.body.filtro) {
                where.estado_arriendo = req.body.filtro;
            }
            const arriendos = await Arriendo.findAll({
                where: where,
                include: [
                    { model: Usuario, attributes: ["nombre_usuario"] },
                    { model: Cliente, attributes: ["nombre_cliente"] },
                    { model: Empresa, attributes: ["nombre_empresa"] },
                    { model: Vehiculo, attributes: ["patente_vehiculo"] },
                    {
                        model: Remplazo,
                        attributes: ["nombreEmpresa_remplazo"],
                        include: [{ model: Cliente, attributes: ["nombre_cliente"] }],
                    },
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
                    { model: Garantia },
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
                    msg: "error: " + "arriendo no encontrado",
                });
            }
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
            console.log(response);
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
            if (response.inputOtros != "" && response.inputOtros != null) {
                const accesorio = await Accesorio.create({
                    nombre_accesorio: response.inputOtros,
                    userAt: response.userAt,
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

    async updateArriendo(req, res, next) {
        try {
            const response = req.body;

            const arriendo = await Arriendo.update(response, {
                where: { id_arriendo: req.params.id },
            });

            res.json({
                success: true,
                msg: "actualizacion exitoso",
                data: arriendo,
            });
            next(arriendo.logging);
        } catch (error) {
            res.json({
                success: false,
                msg: "error: " + error,
            });
        }
    }
}

module.exports = ArriendoController;