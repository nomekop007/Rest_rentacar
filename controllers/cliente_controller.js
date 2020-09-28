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
}

module.exports = ClienteController;