const { Cliente } = require("../db");

class ClienteController {
    async getClientes(req, res) {
        try {
            const cliente = await Cliente.findAll({
                attributes: [
                    "rut_cliente",
                    "nombre_cliente",
                    "telefono_cliente",
                    "correo_cliente",
                ],
            });
            res.json({
                success: true,
                data: cliente,
            });
        } catch (error) {
            console.log(error);
            res.status(501).json({
                success: false,
                msg: "Server error 501",
            });
        }
    }

    async findCliente(req, res) {
        try {
            const cliente = await Cliente.findByPk(req.params.id);
            if (cliente) {
                res.json({
                    success: true,
                    data: cliente,
                });
            } else {
                res.json({
                    success: false,
                    msg: "error: " + "cliente no encontrado",
                });
            }
        } catch (error) {
            console.log(error);
            res.status(501).json({
                success: false,
                msg: "Server error 501",
            });
        }
    }

    async createCliente(req, res, next) {
        try {
            const response = req.body;
            console.log(response);
            if (response.fechaNacimiento_cliente == "") {
                response.fechaNacimiento_cliente = null;
            }

            //si no existe lo crea
            const [cliente, created] = await Cliente.findOrCreate({
                where: { rut_cliente: response.rut_cliente },
                defaults: response,
            });
            //si existia lo modifica
            if (!created) {
                await Cliente.update(response, {
                    where: { rut_cliente: cliente.rut_cliente },
                });
            }

            res.json({
                success: true,
                data: cliente,
            });

            if (created) {
                next(cliente.logging);
            }
        } catch (error) {
            console.log(error);
            res.status(501).json({
                success: false,
                msg: "Server error 501",
            });
        }
    }
}

module.exports = ClienteController;