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
            res.json({
                success: false,
                msg: "error: " + error,
            });
        }
    }

    async findCliente(req, res) {
        try {
            const cliente = await Cliente.findByPk(req.params.id);
            res.json({
                success: true,
                data: cliente,
            });
        } catch (error) {
            res.json({
                success: false,
                msg: "error: " + error,
            });
        }
    }

    async createCliente(req, res, next) {
        try {
            const response = req.body;

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
            next(cliente.logging);
        } catch (error) {
            res.json({
                success: false,
                msg: "error: " + error,
            });
        }
    }
}

module.exports = ClienteController;