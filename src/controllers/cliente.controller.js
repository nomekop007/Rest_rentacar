const DocumentoClienteSerivce = require("../services/documentoCliente.service");
const ClienteService = require("../services/cliente.service");
const { sendError } = require("../helpers/components");

class ClienteController {
    constructor() {
        this._serviceCliente = new ClienteService();
        this._serviceDocCliente = new DocumentoClienteSerivce();
    }

    async getClientes(req, res) {
        try {
            const cliente = await this._serviceCliente.getFindAll();
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
            const cliente = await this._serviceCliente.getFindOne(req.params.id);
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
            const [cliente, created] = await this._serviceCliente.postFindOrCreate(response, response.rut_cliente);
            //si existia lo modifica
            if (!created) await this._serviceCliente.putUpdate(response, cliente.rut_cliente);
            //se buscar el cliente
            const newCliente = await this._serviceCliente.getFindByPk(cliente.rut_cliente);
            res.json({
                success: true,
                data: newCliente,
            });
            if (created) next();
        } catch (error) {
            sendError(error, res);
        }
    }

    async putCliente(req, res, next) {
        try {
            const response = req.body;
            await this._serviceCliente.putUpdate(response, req.params.id);
            res.json({
                success: true,
                msg: "registro actualizado"
            })
            next();
        } catch (error) {
            sendError(error, res);
        }
    }



    async updateFile(req, res, next) {
        try {

            const files = req.files;
            const data = {};
            data.userAt = req.headers["userat"];
            if (files["inputCarnetFrontalCliente"]) data.carnetFrontal = req.files["inputCarnetFrontalCliente"][0].filename;
            if (files["inputCarnetTraseraCliente"]) data.carnetTrasera = req.files["inputCarnetTraseraCliente"][0].filename;
            const [cliente, created] = await this._serviceDocCliente.postFindOrCreate(data, req.params.id);
            if (!created) await this._serviceDocCliente.putUpdate(data, req.params.id);
            next();
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