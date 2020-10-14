const { Cliente } = require("../db");

class ClienteController {
    async getClientes(req, res) {
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
    }

    async findCliente(req, res) {
        const cliente = await Cliente.findByPk(req.params.id);
        if (cliente) {
            res.json({
                success: true,
                data: cliente,
            });
        } else {
            res.json({
                success: false,
                msg: "sin datos",
            });
        }
    }

    async createCliente(req, res) {
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
    }
}

module.exports = ClienteController;