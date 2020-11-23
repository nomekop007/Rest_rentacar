const { Cliente } = require("../database/db");
const { sendError } = require("../helpers/components");

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
            sendError(error, res);
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
            sendError(error, res);
        }
    }

    async createCliente(req, res, next) {
        try {
            const response = req.body;


            //si es extranjero
            if (response.nacionalidad_cliente != "CHILENO/A") {
                response.rut_cliente = "@" + response.rut_cliente
            }


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
            sendError(error, res);
        }
    }
}

module.exports = ClienteController;