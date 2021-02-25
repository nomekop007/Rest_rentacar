
class ClienteController {

    constructor({ ClienteService, ClienteRepository, DocumentoClienteRepository, ConductorRepository, DocumentoConductorRepository, EmpresaRepository, DocumentoEmpresaRepository, sendError }) {
        this.sendError = sendError;
        this._clienteService = ClienteService;

        //mover
        this._serviceCliente = ClienteRepository;
        this._serviceDocCliente = DocumentoClienteRepository;
        this._serviceConductor = ConductorRepository;
        this._serviceDocConductor = DocumentoConductorRepository;
        this._serviceEmpresa = EmpresaRepository;
        this._serviceDocEmpresa = DocumentoEmpresaRepository;
    }

    async getClientes(req, res) {
        try {
            const cliente = await this._serviceCliente.getFindAll();
            res.json({
                success: true,
                data: cliente,
            });
        } catch (error) {
            this.sendError(error, req, res);
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
            this.sendError(error, req, res);
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
            this.sendError(error, req, res);
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
            this.sendError(error, req, res);
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
            this.sendError(error, req, res);
        }
    }

    async getConductores(req, res) {
        try {
            const conductores = await this._serviceConductor.getFindAll();
            res.json({
                success: true,
                data: conductores,
            });
        } catch (error) {
            this.sendError(error, req, res);
        }
    }



    async findConductor(req, res) {
        try {
            const conductor = await this._serviceConductor.getFindOne(req.params.id);
            if (conductor) {
                res.json({
                    success: true,
                    data: conductor,
                });
            } else {
                res.json({
                    success: false,
                    msg: "conductor no encontrado",
                });
            }
        } catch (error) {
            this.sendError(error, req, res);
        }
    }



    async createConductor(req, res, next) {
        try {
            const response = req.body;
            //si es extranjero
            if (response.nacionalidad_conductor != "CHILENO/A") response.rut_conductor = "@" + response.rut_conductor;
            //si no existe lo crea
            const [conductor, created] = await this._serviceConductor.postFindOrCreate(response, response.rut_conductor);
            //si existe conductor lo actualiza
            if (!created) await this._serviceConductor.putUpdate(response, conductor.rut_conductor);
            // se busca el conductor
            const newConductor = await this._serviceConductor.getFindByPK(conductor.rut_conductor);
            res.json({
                success: true,
                data: newConductor,
            });
            if (created) next();
        } catch (error) {
            this.sendError(error, req, res);
        }
    }


    async putConductor(req, res, next) {
        try {
            const response = req.body;
            await this._serviceConductor.putUpdate(response, req.params.id);
            res.json({
                success: true,
                msg: "registro actualizado"
            })
            next();
        } catch (error) {
            this.sendError(error, req, res);
        }
    }

    async updateFile(req, res, next) {
        try {
            const files = req.files;
            const data = {};
            data.userAt = req.headers["userat"];
            if (files["inputlicenciaFrontalConductor"]) data.licenciaConducirFrontal = req.files["inputlicenciaFrontalConductor"][0].filename;
            if (files["inputlicenciaTraseraConductor"]) data.licenciaConducirTrasera = req.files["inputlicenciaTraseraConductor"][0].filename;
            const [conductor, created] = await this._serviceDocConductor.postFindOrCreate(data, req.params.id);
            if (!created) await this._serviceDocConductor.putUpdate(data, req.params.id);
            res.json({
                success: true,
                msg: "archivo actualizado",
            });
            next();
        } catch (error) {
            this.sendError(error, req, res);
        }
    }


    async getEmpresas(req, res) {
        try {
            const empresas = await this._serviceEmpresa.getFindAll();
            res.json({
                success: true,
                data: empresas,
            });
        } catch (error) {
            this.sendError(error, req, res);
        }
    }


    async findEmpresa(req, res) {
        try {
            const empresa = await this._serviceEmpresa.getFindOne(req.params.id);
            if (empresa) {
                res.json({
                    success: true,
                    data: empresa,
                });
            } else {
                res.json({
                    success: false,
                    msg: "empresa no encontrada",
                });
            }
        } catch (error) {
            this.sendError(error, req, res);
        }
    }


    async createEmpresa(req, res, next) {
        try {
            const response = req.body;
            const [empresa, created] = await this._serviceEmpresa.postfindOrCreate(response, response.rut_empresa);
            if (!created) await this._serviceEmpresa.putUpdate(response, response.rut_empresa);
            const newEmpresa = await this._serviceEmpresa.getFindByPk(response.rut_empresa);
            res.json({
                success: true,
                data: newEmpresa,
            });
            if (created) next();
        } catch (error) {
            this.sendError(error, req, res);
        }
    }

    async putEmpresa(req, res, next) {
        try {
            const response = req.body;
            await this._serviceEmpresa.putUpdate(response, req.params.id);
            res.json({
                success: true,
                msg: "registro actualizado"
            })
            next();
        } catch (error) {
            this.sendError(error, req, res);
        }
    }

    async updateFile(req, res, next) {
        try {
            const files = req.files;
            const data = {};
            data.userAt = req.headers["userat"];
            if (files["inputCarnetFrontalEmpresa"]) data.carnetFrontal = req.files["inputCarnetFrontalEmpresa"][0].filename;
            if (files["inputCarnetTraseraEmpresa"]) data.carnetTrasera = req.files["inputCarnetTraseraEmpresa"][0].filename;
            if (files["inputDocumentotRol"]) data.documentoRol = req.files["inputDocumentotRol"][0].filename;
            if (files["inputEstatuto"]) data.documentoEstatuto = req.files["inputEstatuto"][0].filename;
            if (files["inputDocumentoVigencia"]) data.documentoVigencia = req.files["inputDocumentoVigencia"][0].filename;
            const [empresa, created] = await this._serviceDocEmpresa.postFindOrCreate(data, req.params.id);
            if (!created) await this._serviceDocEmpresa.putUpdate(data, req.params.id);
            res.json({
                success: true,
                msg: "archivo actualizado",
            });
            next();
        } catch (error) {
            this.sendError(error, req, res);
        }
    }


}

module.exports = ClienteController;