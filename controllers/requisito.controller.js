const RequisitoService = require("../services/requisito.service");
const DocumentoClienteService = require("../services/documentoCliente.service");
const DocumentoEmpresaService = require("../services/documentoEmpresa.service");
const DocumentoConductorService = require("../services/documentosConductor.service");
const ArriendoService = require("../services/arriendo.service");
const { sendError } = require("../helpers/components");
class RequisitoController {

    constructor() {
        this.serviceDocumentoEmpresa = new DocumentoEmpresaService();
        this.serviceDocumentoCliente = new DocumentoClienteService();
        this.serviceDocumentoConductor = new DocumentoConductorService();
        this.serviceRequisito = new RequisitoService();
        this.serviceArriendo = new ArriendoService();
    }


    async createRequisitoArriendo(req, res) {
        try {
            const files = req.files;
            const data = {
                id_arriendo: req.params.id,
                userAt: req.headers["userat"],
                carnetFrontal_requisito: files.inputCarnetFrontal ?
                    files.inputCarnetFrontal[0].filename : null,
                carnetTrasera_requisito: files.inputCarnetTrasera ?
                    files.inputCarnetTrasera[0].filename : null,
                licenciaConducirFrontal_requisito: files.inputlicenciaFrontal ?
                    files.inputlicenciaFrontal[0].filename : null,
                licenciaConducirTrasera_requisito: files.inputlicenciaTrasera ?
                    files.inputlicenciaTrasera[0].filename : null,
                tarjetaCredito_requisito: files.inputTarjeta ?
                    files.inputTarjeta[0].filename : null,
                chequeGarantia_requisito: files.inputCheque ?
                    files.inputCheque[0].filename : null,
                comprobanteDomicilio_requisito: files.inputComprobante ?
                    files.inputComprobante[0].filename : null,
                cartaRemplazo_requisito: files.inputCartaRemplazo ?
                    files.inputCartaRemplazo[0].filename : null,
                boletaEfectivo_requisito: files.inputBoletaEfectivo ?
                    files.inputBoletaEfectivo[0].filename : null,
                documentoEstatuto_requisito: files.inputEstatuto ?
                    files.inputEstatuto[0].filename : null,
                documentoRol_requisito: files.inputRol ?
                    files.inputRol[0].filename : null,
                documentoVigencia_requisito: files.inputVigencia ?
                    files.inputVigencia[0].filename : null,
                carpetaTributaria_requisito: files.inputCarpetaTributaria ?
                    files.inputCarpetaTributaria[0].filename : null,
                cartaAutorizacion_requisito: files.inputCartaAutorizacion ?
                    files.inputCartaAutorizacion[0].filename : null,
            };

            //buscar los documentos del conductor y cliente , o empresa y si bienen vacios los archivos , se remplazan por lo que estan
            const arriendo = await this.serviceArriendo.getFindOneClients(data.id_arriendo);


            // tambien se guardan los documentos en sus respectivos clientes , empresa y conductor

            let dataDocumento = {
                userAt: req.headers["userat"],
                licenciaConducirFrontal: data.licenciaConducirFrontal_requisito,
                licenciaConducirTrasera: data.licenciaConducirTrasera_requisito,
                rut_conductor: arriendo.rut_conductor
            };
            const [doc0, created0] = await this.serviceDocumentoConductor.postFindOrCreate(dataDocumento, dataDocumento.rut_conductor);
            //if (!created0 && dataDocumento.licenciaConducirFrontal && dataDocumento.licenciaConducirTrasera) await this.serviceDocumentoConductor.putUpdate(dataDocumento, dataDocumento.rut_conductor);
            if (!data.licenciaConducirFrontal_requisito) data.licenciaConducirFrontal_requisito = doc0.licenciaConducirFrontal;
            if (!data.licenciaConducirTrasera_requisito) data.licenciaConducirTrasera_requisito = doc0.licenciaConducirTrasera;

            switch (arriendo.tipo_arriendo) {
                case "PARTICULAR":
                    dataDocumento = {
                        userAt: req.headers["userat"],
                        carnetFrontal: data.carnetFrontal_requisito,
                        carnetTrasera: data.carnetTrasera_requisito,
                        rut_cliente: arriendo.rut_cliente
                    }
                    const [doc1, created1] = await this.serviceDocumentoCliente.postFindOrCreate(dataDocumento, dataDocumento.rut_cliente);
                    //   if (!created1 && dataDocumento.carnetFrontal && dataDocumento.carnetTrasera) await this.serviceDocumentoCliente.putUpdate(dataDocumento, dataDocumento.rut_cliente);
                    if (!data.carnetFrontal_requisito) data.carnetFrontal_requisito = doc1.carnetFrontal;
                    if (!data.carnetTrasera_requisito) data.carnetTrasera_requisito = doc1.carnetTrasera;
                    break;
                case "REEMPLAZO":
                    dataDocumento = {
                        userAt: req.headers["userat"],
                        carnetFrontal: data.carnetFrontal_requisito,
                        carnetTrasera: data.carnetTrasera_requisito,
                        rut_cliente: arriendo.remplazo.cliente.rut_cliente
                    }
                    const [doc2, created2] = await this.serviceDocumentoCliente.postFindOrCreate(dataDocumento, dataDocumento.rut_cliente);
                    //  if (!created2 && dataDocumento.carnetFrontal && dataDocumento.carnetTrasera) await this.serviceDocumentoCliente.putUpdate(dataDocumento, dataDocumento.rut_cliente);
                    if (!data.carnetFrontal_requisito) data.carnetFrontal_requisito = doc2.carnetFrontal;
                    if (!data.carnetTrasera_requisito) data.carnetTrasera_requisito = doc2.carnetTrasera;
                    break;
                case "EMPRESA":

                    dataDocumento = {
                        userAt: req.headers["userat"],
                        carnetFrontal: data.carnetFrontal_requisito,
                        carnetTrasera: data.carnetTrasera_requisito,
                        documentoEstatuto: data.documentoEstatuto_requisito,
                        documentoRol: data.documentoRol_requisito,
                        documentoVigencia: data.documentoVigencia_requisito,
                        rut_empresa: arriendo.rut_empresa
                    }
                    const [doc3, created3] = await this.serviceDocumentoEmpresa.postFindOrCreate(dataDocumento, dataDocumento.rut_empresa);
                    //  if (!created3 && dataDocumento.carnetFrontal && dataDocumento.carnetTrasera) await this.serviceDocumentoEmpresa.putUpdate(dataDocumento, dataDocumento.rut_empresa);
                    if (!data.carnetFrontal_requisito) data.carnetFrontal_requisito = doc3.carnetFrontal;
                    if (!data.carnetTrasera_requisito) data.carnetTrasera_requisito = doc3.carnetTrasera;
                    if (!data.documentoEstatuto_requisito) data.documentoEstatuto_requisito = doc3.documentoEstatuto;
                    if (!data.documentoRol_requisito) data.documentoRol_requisito = doc3.documentoRol;
                    if (!data.documentoVigencia_requisito) data.documentoVigencia_requisito = doc3.documentoVigencia;
                    break;
            }

            const requisito = await this.serviceRequisito.postCreate(data);

            res.json({
                success: true,
                data: requisito,
            });
        } catch (error) {
            sendError(error, res);
        }
    }


}

module.exports = RequisitoController;