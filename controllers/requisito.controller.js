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


    async createRequisitoArriendo(req, res, next) {
        try {
            const files = req.files;
            let data = {
                id_arriendo: req.params.id,
                userAt: req.headers["userat"],
                carnetFrontal_requisito: files.inputCarnetFrontal ? files.inputCarnetFrontal[0].filename : null,
                carnetTrasera_requisito: files.inputCarnetTrasera ? files.inputCarnetTrasera[0].filename : null,
                licenciaConducirFrontal_requisito: files.inputlicenciaFrontal ? files.inputlicenciaFrontal[0].filename : null,
                licenciaConducirTrasera_requisito: files.inputlicenciaTrasera ? files.inputlicenciaTrasera[0].filename : null,
                tarjetaCredito_requisito: files.inputTarjeta ? files.inputTarjeta[0].filename : null,
                chequeGarantia_requisito: files.inputCheque ? files.inputCheque[0].filename : null,
                comprobanteDomicilio_requisito: files.inputComprobante ? files.inputComprobante[0].filename : null,
                cartaRemplazo_requisito: files.inputCartaRemplazo ? files.inputCartaRemplazo[0].filename : null,
                boletaEfectivo_requisito: files.inputBoletaEfectivo ? files.inputBoletaEfectivo[0].filename : null,
                documentoEstatuto_requisito: files.inputEstatuto ? files.inputEstatuto[0].filename : null,
                documentoRol_requisito: files.inputRol ? files.inputRol[0].filename : null,
                documentoVigencia_requisito: files.inputVigencia ? files.inputVigencia[0].filename : null,
                carpetaTributaria_requisito: files.inputCarpetaTributaria ? files.inputCarpetaTributaria[0].filename : null,
                cartaAutorizacion_requisito: files.inputCartaAutorizacion ? files.inputCartaAutorizacion[0].filename : null,
            };
            //buscar los documentos del conductor y cliente , o empresa y si bienen vacios los archivos , se remplazan por lo que estan
            const arriendo = await this.serviceArriendo.getFindOneClients(data.id_arriendo);
            // tambien se guardan los documentos en sus respectivos clientes , empresa y conductor
            data = await this.requisitoConductor(data, req, arriendo);
            switch (arriendo.tipo_arriendo) {
                case "PARTICULAR":
                    data = await this.requisitoParticular(data, req, arriendo);
                    break;
                case "REEMPLAZO":
                    data = await this.requisitoRemplazo(data, req, arriendo);
                    break;
                case "EMPRESA":
                    data = await this.requisitoEmpresa(data, req, arriendo);
                    break;
            }
            console.log(data)
            const requisito = await this.serviceRequisito.postCreate(data);
            res.json({
                success: true,
                data: requisito,
            });
            next();
        } catch (error) {
            sendError(error, res);
        }
    }



    async requisitoConductor(data, req, arriendo) {
        let dataDoc = {
            userAt: req.headers["userat"],
            licenciaConducirFrontal: data.licenciaConducirFrontal_requisito,
            licenciaConducirTrasera: data.licenciaConducirTrasera_requisito,
            rut_conductor: arriendo.rut_conductor
        };
        const [doc, created] = await this.serviceDocumentoConductor.postFindOrCreate(dataDoc, dataDoc.rut_conductor);
        // si los requisitos que llegan estan vacios , los reemplaza por lo que haya en la BD
        if (!data.licenciaConducirFrontal_requisito) data.licenciaConducirFrontal_requisito = doc.licenciaConducirFrontal;
        if (!data.licenciaConducirTrasera_requisito) data.licenciaConducirTrasera_requisito = doc.licenciaConducirTrasera;
        //si no existe los documentos en la BD , los reemplaza por los que llegan.
        if (!doc.licenciaConducirFrontal) await this.serviceDocumentoConductor.putUpdate({ licenciaConducirFrontal: dataDoc.licenciaConducirFrontal }, dataDoc.rut_conductor);
        if (!doc.licenciaConducirTrasera) await this.serviceDocumentoConductor.putUpdate({ licenciaConducirTrasera: dataDoc.licenciaConducirTrasera }, dataDoc.rut_conductor);
        return data;
    }


    async requisitoParticular(data, req, arriendo) {
        let dataDoc = {
            userAt: req.headers["userat"],
            carnetFrontal: data.carnetFrontal_requisito,
            carnetTrasera: data.carnetTrasera_requisito,
            comprobanteDomicilio: data.comprobanteDomicilio_requisito,
            rut_cliente: arriendo.rut_cliente
        }
        const [doc, created] = await this.serviceDocumentoCliente.postFindOrCreate(dataDoc, dataDoc.rut_cliente);
        // si los requisitos que llegan estan vacios , los reemplaza por lo que haya en la BD
        if (!data.carnetFrontal_requisito) data.carnetFrontal_requisito = doc.carnetFrontal;
        if (!data.carnetTrasera_requisito) data.carnetTrasera_requisito = doc.carnetTrasera;
        if (!data.comprobanteDomicilio_requisito) data.comprobanteDomicilio_requisito = doc.comprobanteDomicilio;
        //si no existe los documentos en la BD , los reemplaza por los que llegan.
        if (!doc.carnetFrontal) await this.serviceDocumentoCliente.putUpdate({ carnetFrontal: dataDoc.carnetFrontal }, dataDoc.rut_cliente);
        if (!doc.carnetTrasera) await this.serviceDocumentoCliente.putUpdate({ carnetFrontal: dataDoc.carnetTrasera }, dataDoc.rut_cliente);
        if (!doc.comprobanteDomicilio) await this.serviceDocumentoCliente.putUpdate({ carnetFrontal: dataDoc.comprobanteDomicilio }, dataDoc.rut_cliente);
        return data;
    }


    async requisitoRemplazo(data, req, arriendo) {
        let dataDoc = {
            userAt: req.headers["userat"],
            carnetFrontal: data.carnetFrontal_requisito,
            carnetTrasera: data.carnetTrasera_requisito,
            comprobanteDomicilio: data.comprobanteDomicilio_requisito,
            rut_cliente: arriendo.remplazo.cliente.rut_cliente
        }
        const [doc, created] = await this.serviceDocumentoCliente.postFindOrCreate(dataDoc, dataDoc.rut_cliente);
        // si los requisitos que llegan estan vacios , los reemplaza por lo que haya en la BD
        if (!data.carnetFrontal_requisito) data.carnetFrontal_requisito = doc.carnetFrontal;
        if (!data.carnetTrasera_requisito) data.carnetTrasera_requisito = doc.carnetTrasera;
        if (!data.comprobanteDomicilio_requisito) data.comprobanteDomicilio_requisito = doc.comprobanteDomicilio;
        //si no existe los documentos en la BD , los reemplaza por los que llegan.
        if (!doc.carnetFrontal) await this.serviceDocumentoCliente.putUpdate({ carnetFrontal: dataDoc.carnetFrontal }, dataDoc.rut_cliente);
        if (!doc.carnetTrasera) await this.serviceDocumentoCliente.putUpdate({ carnetFrontal: dataDoc.carnetTrasera }, dataDoc.rut_cliente);
        if (!doc.comprobanteDomicilio) await this.serviceDocumentoCliente.putUpdate({ carnetFrontal: dataDoc.comprobanteDomicilio }, dataDoc.rut_cliente);
        return data;
    }


    async requisitoEmpresa(data, req, arriendo) {
        let dataDoc = {
            userAt: req.headers["userat"],
            carnetFrontal: data.carnetFrontal_requisito,
            carnetTrasera: data.carnetTrasera_requisito,
            documentoEstatuto: data.documentoEstatuto_requisito,
            documentoRol: data.documentoRol_requisito,
            documentoVigencia: data.documentoVigencia_requisito,
            rut_empresa: arriendo.rut_empresa
        }
        const [doc, created] = await this.serviceDocumentoEmpresa.postFindOrCreate(dataDoc, dataDoc.rut_empresa);
        // si los requisitos que llegan estan vacios , los reemplaza por lo que haya en la BD
        if (!data.carnetFrontal_requisito) data.carnetFrontal_requisito = doc.carnetFrontal;
        if (!data.carnetTrasera_requisito) data.carnetTrasera_requisito = doc.carnetTrasera;
        if (!data.documentoEstatuto_requisito) data.documentoEstatuto_requisito = doc.documentoEstatuto;
        if (!data.documentoRol_requisito) data.documentoRol_requisito = doc.documentoRol;
        if (!data.documentoVigencia_requisito) data.documentoVigencia_requisito = doc.documentoVigencia;
        //si no existe los documentos en la BD , los reemplaza por los que llegan.
        if (!doc.carnetFrontal) await this.serviceDocumentoEmpresa.putUpdate({ carnetFrontal: dataDoc.carnetFrontal }, dataDoc.rut_empresa);
        if (!doc.carnetTrasera) await this.serviceDocumentoEmpresa.putUpdate({ carnetTrasera: dataDoc.carnetTrasera }, dataDoc.rut_empresa);
        if (!doc.documentoEstatuto) await this.serviceDocumentoEmpresa.putUpdate({ documentoEstatuto: dataDoc.documentoEstatuto }, dataDoc.rut_empresa);
        if (!doc.documentoRol) await this.serviceDocumentoEmpresa.putUpdate({ documentoRol: dataDoc.documentoRol }, dataDoc.rut_empresa);
        if (!doc.documentoVigencia) await this.serviceDocumentoEmpresa.putUpdate({ documentoVigencia: dataDoc.documentoVigencia }, dataDoc.rut_empresa);
        return data;
    }



}

module.exports = RequisitoController;