
const ClienteService = require("../services/cliente.service");
const { sendError } = require("../helpers/components");

class ClienteController {
    constructor() {
        this.serviceCliente = new ClienteService();
    }

    async getClientes(req, res) {
        try {
            const cliente = await this.serviceCliente.getFindAll();
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
            const cliente = await this.serviceCliente.getFindByPk(req.params.id);
            if (cliente) {
                res.json({
                    success: true,
                    data: cliente,
                });
            } else {
                res.json({
                    success: false,
                    msg: "cliente no encontrado",
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
            if (response.nacionalidad_cliente != "CHILENO/A") response.rut_cliente = "@" + response.rut_cliente;
            //si no existe lo crea
            const [cliente, created] = await this.serviceCliente.postFindOrCreate(response, response.rut_cliente);
            //si existia lo modifica
            if (!created) await this.serviceCliente.putUpdate(response, cliente.rut_cliente);
            //se buscar el cliente
            const newCliente = await this.serviceCliente.getFindByPk(cliente.rut_cliente);
            res.json({
                success: true,
                data: newCliente,
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