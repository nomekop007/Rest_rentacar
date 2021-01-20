const DocumentoClienteSerivce = require("../services/documentoCliente.service");
const ClienteService = require("../services/cliente.service");
const { sendError } = require("../helpers/components");

class ClienteController {
    constructor() {
        this.serviceCliente = new ClienteService();
        this.serviceDocCliente = new DocumentoClienteSerivce();
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
            const cliente = await this.serviceCliente.getFindOne(req.params.id);
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
            if (created) next(cliente.logging);
        } catch (error) {
            sendError(error, res);
        }
    }

    async putCliente(req, res, next) {
        try {
            const response = req.body;
            const cliente = await this.serviceCliente.putUpdate(response, req.params.id);
            res.json({
                success: true,
                msg: "registro actualizado"
            })
            next(cliente.logging);
        } catch (error) {
            sendError(error, res);
        }
    }



    async updateFile(req, res) {
        try {

            const files = req.files;
            const data = {};
            data.userAt = req.headers["userat"];
            if (files["inputCarnetFrontalCliente"]) data.carnetFrontal = req.files["inputCarnetFrontalCliente"][0].filename;
            if (files["inputCarnetTraseraCliente"]) data.carnetTrasera = req.files["inputCarnetTraseraCliente"][0].filename;
            console.log(data);
            const [cliente, created] = await this.serviceDocCliente.postFindOrCreate(data, req.params.id);
            if (!created) await this.serviceDocCliente.putUpdate(data, req.params.id);
            res.json({
                success: true,
                msg: "archivo actualizado",
            });
        } catch (error) {
            sendError(error, res);
        }
    }
}

module.exports = ClienteController;