const { nodemailerTransporter } = require("../../../helpers/valueObject");
const ordenarArrayporFecha = require("../../../helpers/orderArrayByDate");
const formatFechahora = require("../../../helpers/dateTimeFormat");
const contratoPlantilla = require("../../../utils/pdf_plantillas/contratoArriendo");
const extencionPlantilla = require("../../../utils/pdf_plantillas/extenderArriendo");
const logo = require.resolve("../../../utils/images/logo2.png");
const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const base64 = require("image-to-base64");
const pdfMake = require('pdfmake/build/pdfmake.js');
const pdfFonts = require('pdfmake/build/vfs_fonts.js');
pdfMake.vfs = pdfFonts.pdfMake.vfs;


class ArriendoBusiness {

    constructor({ ExtencionRepository, DocumentoConductorRepository, DocumentoClienteRepository, DocumentoEmpresaRepository, ConductorRepository, ContactoRepository, ContratoRepository, ArriendoRepository, RequisitoRepository, GarantiaRepository, RemplazoRepository }) {
        this._arriendoRepository = ArriendoRepository;
        this._remplazoRepository = RemplazoRepository;
        this._garantiaRepository = GarantiaRepository;
        this._requisitoRepository = RequisitoRepository;
        this._contratoRepository = ContratoRepository;
        this._contactoRepository = ContactoRepository;
        this._conductorRepository = ConductorRepository;
        this._documentoEmpresaRepository = DocumentoEmpresaRepository;
        this._documentoClienteRepository = DocumentoClienteRepository;
        this._documentoConductorRepository = DocumentoConductorRepository;
        this._extencionRepository = ExtencionRepository;
    }


    async getArriendos(id_sucursal, estado) {
        let where = {};
        if (id_sucursal) where.id_sucursal = id_sucursal;
        if (estado) where.estado_arriendo = estado;
        const arriendos = await this._arriendoRepository.getFindAllPublic(where);
        return arriendos;
    }


    async getArriendosActivos(id_sucursal, estado) {
        const arriendos = await this._arriendoRepository.getFindAllActivos(id_sucursal, estado);
        return arriendos;
    }


    async findArriendo(id_arriendo) {
        const arriendo = await this._arriendoRepository.getFindOnePublic(id_arriendo);
        return arriendo;
    }


    async createArriendo(arriendo) {
        switch (arriendo.tipo_arriendo) {
            case "PARTICULAR":
                arriendo.rut_empresa = null;
                arriendo.id_remplazo = null;
                break;
            case "REEMPLAZO":
                arriendo.rut_empresa = null;
                arriendo.rut_cliente = null;
                break;
            case "EMPRESA":
                arriendo.id_remplazo = null;
                arriendo.rut_cliente = null;
                break;
        }
        if (arriendo.rut_conductor2 == "undefined") arriendo.rut_conductor2 = null;
        if (arriendo.rut_conductor3 == "undefined") arriendo.rut_conductor3 = null;
        const arriendoRepo = await this._arriendoRepository.postCreate(arriendo);
        return arriendoRepo;
    }


    async updateStateArriendo(payload, id_arriendo) {
        const arriendoRepo = await this._arriendoRepository.putUpdate(payload, id_arriendo);
        return arriendoRepo;
    }


    async sendCorreoAtraso(id_arriendo, nombre_cliente, correo_cliente) {
        const arriendo = await this._arriendoRepository.getFindOne(id_arriendo);
        const mailOptions = {
            from: "'Rent A Car - Grupo Firma' <api.rentacarmaule@grupofirma.cl>",
            to: correo_cliente,
            subject: "AVISO SOBRE VENCIMIENTO DE ARRIENDO RENT A CAR",
            text: "Se adjunta copia del contrato Rent a Car",
            html: `
            <p>Sr.(a) ${nombre_cliente}:</p>
            <p>Por este medio aviso sobre vencimiento del arriendo que solicito con fecha desde el
              ${formatFechahora(arriendo.fechaEntrega_arriendo)} hasta el ${formatFechahora(arriendo.fechaRecepcion_arriendo)} por favor póngase en contacto con la sucursal más cercana.</p>
            <br><br>
            <p>------------------------------------------------------------------------------------------------------------------------------</p>
            <p>Atentamente, Rent a Car Maule Ltda. </p>
            <p>Por favor no responder este correo.</p>
            <img src="data:image/jpeg;base64,${await base64(logo)}" width="200" height="50"  />
            `,
        };
        const responseEmail = await nodemailerTransporter.sendMail(mailOptions);
        return responseEmail;
    }


    async updateArriendo(arriendo, id_arriendo) {
        const arriendoRepo = await this._arriendoRepository.getFindOneMin(id_arriendo);
        const estado = arriendoRepo.estado_arriendo;
        if (estado !== 'PENDIENTE' && estado !== 'CONFIRMADO' && estado !== 'FIRMADO') {
            return { success: false, msg: "este arriendo ya esta despachado!" }
        }
        arriendo.diasAcumulados_arriendo = arriendo.diasActuales_arriendo;
        await this._arriendoRepository.putUpdate(arriendo, id_arriendo);
        return { success: true, msg: "arriendo modificado!" };
    }


    async modificarTipo(tipo, empresaRemplazo, id_arriendo, userAt) {
        const arriendo = await this._arriendoRepository.getFindOneMin(id_arriendo);
        const estado = arriendo.estado_arriendo;
        if (estado !== 'PENDIENTE' && estado !== 'CONFIRMADO' && estado !== 'FIRMADO') {
            return { success: false, msg: "este arriendo ya esta despachado!" };
        }
        let newData = {};
        switch (tipo) {
            //cambiar de particular a reemplazo
            case 1:
                const reemplazo = await this._remplazoRepository.postCreate({
                    userAt: userAt,
                    codigo_empresaRemplazo: empresaRemplazo,
                    rut_cliente: arriendo.rut_cliente
                });
                newData = {
                    userAt: userAt,
                    tipo_arriendo: "REEMPLAZO",
                    id_remplazo: reemplazo.id_remplazo,
                    rut_cliente: null
                }
                await this._arriendoRepository.putUpdate(newData, id_arriendo);
                break;
            //cambiar de reemplazo a particular
            case 2:
                newData = {
                    userAt: userAt,
                    tipo_arriendo: "PARTICULAR",
                    id_remplazo: null,
                    rut_cliente: arriendo.remplazo.rut_cliente
                }
                await this._arriendoRepository.putUpdate(newData, id_arriendo);
                break;
            //cambiar de empresa de reemplazo 
            case 3:
                newData = {
                    userAt: userAt,
                    codigo_empresaRemplazo: empresaRemplazo
                };
                await this._remplazoRepository.putUpdate(newData, arriendo.id_remplazo);
                break;
        }
        return { success: true, msg: "arriendo modificado!" };
    }


    async finalizarArriendos(id_sucursal) {
        let filter = { id_sucursal: id_sucursal };
        if (id_sucursal === "0") filter = {};
        const formatter = new Intl.NumberFormat("CL");
        const arriendos = await this._arriendoRepository.getFindAllRecepcionados(filter);
        const arrayFaltantes = [];
        arriendos.forEach(async ({ pagosArriendos, id_arriendo, tipo_arriendo, danioVehiculos, estado_arriendo, sucursale }) => {
            let faltante = [];
            let pagos_listos = true;
            let firmas_listas = true;
            let danio_listos = true;
            let i = 1;
            let reemplazo = false;
            pagosArriendos.forEach(({ pagos, contrato }) => {
                if (pagos[0].estado_pago == "PENDIENTE") {
                    pagos_listos = false;
                    if (tipo_arriendo === "REEMPLAZO" && !reemplazo) {
                        faltante.push({ msg: "subir comprobante correspondiente al pago total del arriendo." });
                        reemplazo = true;
                    }
                    if (tipo_arriendo != "REEMPLAZO") {
                        faltante.push({ msg: "subir comprobante correspondiente al monto de $ " + formatter.format(pagos[0].total_pago) + "." });
                    }
                }
                if (!contrato) {
                    firmas_listas = false;
                    faltante.push({ msg: `Firmar contrato de la extencion Nº${i} !.` })
                    i++;
                };
            });
            danioVehiculos.forEach((danio) => {
                if (danio.estado_danioVehiculo == "PENDIENTE") {
                    danio_listos = false;
                    faltante.push({ msg: "Subir comprobante del daño del vehiculo!. " });
                }
            });
            //console.log("arriendo Nº" + id_arriendo + " pagos:" + pagos_listos + " firmas:" + firmas_listas + " daños:" + danio_listos);
            if (pagos_listos && firmas_listas && danio_listos && estado_arriendo === "RECEPCIONADO") {
                await this._arriendoRepository.putUpdate({ estado_arriendo: "FINALIZADO" }, id_arriendo);
            } else {
                arrayFaltantes.push({ id_arriendo: id_arriendo, sucursal: sucursale.nombre_sucursal, falta: faltante })
            }
        })
        return arrayFaltantes;
    }


    async createRequisitoArriendo(payload) {
        //buscar los documentos del conductor y cliente , o empresa y si bienen vacios los archivos , se remplazan por lo que estan
        const arriendo = await this._arriendoRepository.getFindOneClients(payload.id_arriendo);
        payload = await this.requisitoConductor(payload, arriendo);
        switch (arriendo.tipo_arriendo) {
            case "PARTICULAR":
                payload = await this.requisitoParticular(payload, arriendo);
                break;
            case "REEMPLAZO":
                payload = await this.requisitoRemplazo(payload, arriendo);
                break;
            case "EMPRESA":
                payload = await this.requisitoEmpresa(payload, arriendo);
                break;
        }
        const requisitoRepo = await this._requisitoRepository.postCreate(payload);
        return requisitoRepo;
    }

    async requisitoConductor(data, arriendo) {
        let dataDoc = {
            userAt: data.userAt,
            licenciaConducirFrontal: data.licenciaConducirFrontal_requisito,
            licenciaConducirTrasera: data.licenciaConducirTrasera_requisito,
            rut_conductor: arriendo.rut_conductor
        };
        const [doc, created] = await this._documentoConductorRepository.postFindOrCreate(dataDoc, dataDoc.rut_conductor);
        // si los requisitos que llegan estan vacios , los reemplaza por lo que haya en la BD
        if (!data.licenciaConducirFrontal_requisito) data.licenciaConducirFrontal_requisito = doc.licenciaConducirFrontal;
        if (!data.licenciaConducirTrasera_requisito) data.licenciaConducirTrasera_requisito = doc.licenciaConducirTrasera;
        //si no existe los documentos en la BD , los reemplaza por los que llegan.
        if (!doc.licenciaConducirFrontal) await this._documentoConductorRepository.putUpdate({ licenciaConducirFrontal: dataDoc.licenciaConducirFrontal }, dataDoc.rut_conductor);
        if (!doc.licenciaConducirTrasera) await this._documentoConductorRepository.putUpdate({ licenciaConducirTrasera: dataDoc.licenciaConducirTrasera }, dataDoc.rut_conductor);
        return data;
    }

    async requisitoParticular(data, arriendo) {
        let dataDoc = {
            userAt: data.userAt,
            carnetFrontal: data.carnetFrontal_requisito,
            carnetTrasera: data.carnetTrasera_requisito,
            comprobanteDomicilio: data.comprobanteDomicilio_requisito,
            rut_cliente: arriendo.rut_cliente
        }
        const [doc, created] = await this._documentoClienteRepository.postFindOrCreate(dataDoc, dataDoc.rut_cliente);
        // si los requisitos que llegan estan vacios , los reemplaza por lo que haya en la BD
        if (!data.carnetFrontal_requisito) data.carnetFrontal_requisito = doc.carnetFrontal;
        if (!data.carnetTrasera_requisito) data.carnetTrasera_requisito = doc.carnetTrasera;
        if (!data.comprobanteDomicilio_requisito) data.comprobanteDomicilio_requisito = doc.comprobanteDomicilio;
        //si no existe los documentos en la BD , los reemplaza por los que llegan.
        if (!doc.carnetFrontal) await this._documentoClienteRepository.putUpdate({ carnetFrontal: dataDoc.carnetFrontal }, dataDoc.rut_cliente);
        if (!doc.carnetTrasera) await this._documentoClienteRepository.putUpdate({ carnetTrasera: dataDoc.carnetTrasera }, dataDoc.rut_cliente);
        if (!doc.comprobanteDomicilio) await this._documentoClienteRepository.putUpdate({ comprobanteDomicilio: dataDoc.comprobanteDomicilio }, dataDoc.rut_cliente);
        return data;
    }

    async requisitoRemplazo(data, arriendo) {
        let dataDoc = {
            userAt: data.userAt,
            carnetFrontal: data.carnetFrontal_requisito,
            carnetTrasera: data.carnetTrasera_requisito,
            comprobanteDomicilio: data.comprobanteDomicilio_requisito,
            rut_cliente: arriendo.remplazo.cliente.rut_cliente
        }
        const [doc, created] = await this._documentoClienteRepository.postFindOrCreate(dataDoc, dataDoc.rut_cliente);
        // si los requisitos que llegan estan vacios , los reemplaza por lo que haya en la BD
        if (!data.carnetFrontal_requisito) data.carnetFrontal_requisito = doc.carnetFrontal;
        if (!data.carnetTrasera_requisito) data.carnetTrasera_requisito = doc.carnetTrasera;
        if (!data.comprobanteDomicilio_requisito) data.comprobanteDomicilio_requisito = doc.comprobanteDomicilio;
        //si no existe los documentos en la BD , los reemplaza por los que llegan.
        if (!doc.carnetFrontal) await this._documentoClienteRepository.putUpdate({ carnetFrontal: dataDoc.carnetFrontal }, dataDoc.rut_cliente);
        if (!doc.carnetTrasera) await this._documentoClienteRepository.putUpdate({ carnetTrasera: dataDoc.carnetTrasera }, dataDoc.rut_cliente);
        if (!doc.comprobanteDomicilio) await this._documentoClienteRepository.putUpdate({ comprobanteDomicilio: dataDoc.comprobanteDomicilio }, dataDoc.rut_cliente);
        return data;
    }

    async requisitoEmpresa(data, arriendo) {
        let dataDoc = {
            userAt: data.userAt,
            carnetFrontal: data.carnetFrontal_requisito,
            carnetTrasera: data.carnetTrasera_requisito,
            documentoEstatuto: data.documentoEstatuto_requisito,
            documentoRol: data.documentoRol_requisito,
            documentoVigencia: data.documentoVigencia_requisito,
            rut_empresa: arriendo.rut_empresa
        }
        const [doc, created] = await this._documentoEmpresaRepository.postFindOrCreate(dataDoc, dataDoc.rut_empresa);
        // si los requisitos que llegan estan vacios , los reemplaza por lo que haya en la BD
        if (!data.carnetFrontal_requisito) data.carnetFrontal_requisito = doc.carnetFrontal;
        if (!data.carnetTrasera_requisito) data.carnetTrasera_requisito = doc.carnetTrasera;
        if (!data.documentoEstatuto_requisito) data.documentoEstatuto_requisito = doc.documentoEstatuto;
        if (!data.documentoRol_requisito) data.documentoRol_requisito = doc.documentoRol;
        if (!data.documentoVigencia_requisito) data.documentoVigencia_requisito = doc.documentoVigencia;
        //si no existe los documentos en la BD , los reemplaza por los que llegan.
        if (!doc.carnetFrontal) await this._documentoEmpresaRepository.putUpdate({ carnetFrontal: dataDoc.carnetFrontal }, dataDoc.rut_empresa);
        if (!doc.carnetTrasera) await this._documentoEmpresaRepository.putUpdate({ carnetTrasera: dataDoc.carnetTrasera }, dataDoc.rut_empresa);
        if (!doc.documentoEstatuto) await this._documentoEmpresaRepository.putUpdate({ documentoEstatuto: dataDoc.documentoEstatuto }, dataDoc.rut_empresa);
        if (!doc.documentoRol) await this._documentoEmpresaRepository.putUpdate({ documentoRol: dataDoc.documentoRol }, dataDoc.rut_empresa);
        if (!doc.documentoVigencia) await this._documentoEmpresaRepository.putUpdate({ documentoVigencia: dataDoc.documentoVigencia }, dataDoc.rut_empresa);
        return data;
    }


    async createGarantia(garantia) {
        switch (garantia.id_modoPago) {
            case "EFECTIVO":
                garantia.id_modoPago = 1;
                garantia.numeroTarjeta_garantia = null;
                garantia.fechaTarjeta_garantia = null;
                garantia.codigoTarjeta_garantia = null;
                garantia.numeroCheque_garantia = null;
                garantia.codigoCheque_garantia = null;
                garantia.folioTarjeta_garantia = null;
                garantia.bancoCheque_garantia = null;
                break;
            case "CHEQUE":
                garantia.id_modoPago = 2;
                garantia.monto_garantia = null;
                garantia.numeroTarjeta_garantia = null;
                garantia.fechaTarjeta_garantia = null;
                garantia.codigoTarjeta_garantia = null;
                garantia.folioTarjeta_garantia = null;
                break;
            case "TARJETA":
                garantia.id_modoPago = 3;
                garantia.numeroCheque_garantia = null;
                garantia.codigoCheque_garantia = null;
                garantia.bancoCheque_garantia = null;
                break;
        }
        const garantiaRepo = await this._garantiaRepository.postCreate(garantia);
        return garantiaRepo;
    }


    async createExtencionArriendo(extencion) {
        const extencionRepo = await this._extencionRepository.postCreate(extencion);
        return extencionRepo;
    }


    async buscarExtencionesPorArriendo(id_arriendo) {
        const extenciones = await this._extencionRepository.getFindAllWithArrindo(id_arriendo);
        return extenciones;
    }


    async createContrato(id_arriendo, userAt, base64) {
        const arriendo = await this._arriendoRepository.getFindOne(id_arriendo);
        const nameFile = uuidv4();
        const pathFile = path.join(__dirname, `../${process.env.PATH_CONTRATO}/${nameFile}.pdf`)
        fs.writeFileSync(pathFile, base64, "base64", (err) => {
            return { success: false, msg: err };
        });
        //guarda el ultimo pago en el contrato
        const arrayPagos = ordenarArrayporFecha(arriendo.pagosArriendos);
        const fila = arrayPagos.length - 1;
        const dataContrato = {
            documento: nameFile + ".pdf",
            id_pagoArriendo: arrayPagos[fila].id_pagoArriendo,
            id_arriendo: arriendo.id_arriendo,
            userAt: userAt
        }
        const contrato = await this._contratoRepository.postCreate(dataContrato);
        return { success: true, data: contrato }
    }


    async createExtencionContrato(id_extencion, userAt, base64) {
        const extencion = await this._extencionRepository.findOne(id_extencion);
        const nameFile = uuidv4();
        const pathFile = path.join(__dirname, `../${process.env.PATH_CONTRATO}/${nameFile}.pdf`)
        fs.writeFileSync(pathFile, base64, "base64", (err) => {
            return { success: false, msg: err };
        });
        const data = {
            documento: nameFile + ".pdf",
            id_pagoArriendo: extencion.id_pagoArriendo,
            id_arriendo: extencion.id_arriendo,
            userAt: userAt,
        };
        const contrato = await this._contratoRepository.postCreate(data);
        await this._extencionRepository.putUpdateById({ id_contrato: contrato.id_contrato, estado_extencion: "FIRMADO" }, id_extencion);
        return { success: true, data: contrato };
    }


    async subirContrato(id_arriendo, documento, userAt) {
        const arriendo = await this._arriendoRepository.getFindOne(id_arriendo);
        const arrayPagos = ordenarArrayporFecha(arriendo.pagosArriendos);
        const fila = arrayPagos.length - 1;
        const data = {
            documento: documento,
            id_pagoArriendo: arrayPagos[fila].id_pagoArriendo,
            id_arriendo: id_arriendo,
            userAt: userAt,
        };
        const contratoRepo = await this._contratoRepository.postCreate(data);
        return contratoRepo;
    }


    async subirExtencionContrato(id_extencion, documento, userAt) {
        const extencion = await this._extencionRepository.findOne(id_extencion);
        if (extencion.estado_extencion == "FIRMADO") {
            return { success: false, msg: "este contrato ya esta firmada!" };
        }
        const dataContrato = {
            documento: documento,
            id_pagoArriendo: extencion.id_pagoArriendo,
            id_arriendo: extencion.id_arriendo,
            userAt: userAt,
        };
        const contrato = await this._contratoRepository.postCreate(dataContrato);
        const dataExtencion = {
            id_contrato: contrato.id_contrato,
            estado_extencion: "FIRMADO"
        };
        await this._extencionRepository.putUpdateById(dataExtencion, id_extencion);
        return { success: true, data: contrato };
    }


    async generatePDFContrato(payload) {
        const arriendo = await this._arriendoRepository.getFindOne(payload.id_arriendo);
        //si existen mas conductores los busca
        if (arriendo.rut_conductor2) payload.conductor2 = await this._conductorRepository.getFindByPK(arriendo.rut_conductor2);
        if (arriendo.rut_conductor3) payload.conductor3 = await this._conductorRepository.getFindByPK(arriendo.rut_conductor3);
        // si no hay garantia&archivos, se detiene
        if (!arriendo.requisito) {
            return { success: false, msg: "falta subir archivos requeridos!" }
        }
        //si no es uno de estos estados, se detiene
        if (arriendo.estado_arriendo != "CONFIRMADO" && arriendo.estado_arriendo != "E-CONFIRMADO") {
            return { success: false, msg: "el documento esta firmado!" };
        }
        // si el primer pago no esta pagado , se detiene
        if (arriendo.tipo_arriendo != "REEMPLAZO" && arriendo.estado_arriendo == "CONFIRMADO") {
            if (arriendo.pagosArriendos[0].pagos[0].estado_pago != "PAGADO") {
                return { success: false, msg: "se debe subir el comprobante de pago antes de firmar el contrato!" };
            }
        }
        payload.arriendo = arriendo;
        //se genera el documento
        const docDefinition = await contratoPlantilla(payload);
        const pdfDocGenerator = pdfMake.createPdf(docDefinition);
        return {
            success: true,
            pdfDocGenerator: pdfDocGenerator,
            firma1: payload.firmaClientePNG,
        };
    }


    async generatePDFExtencion(payload) {
        const extencion = await this._extencionRepository.findOne(payload.id_extencion);
        const arriendo = await this._arriendoRepository.getFindOne(extencion.id_arriendo);
        //si existen mas conductores los busca
        if (arriendo.rut_conductor2) payload.conductor2 = await this._conductorRepository.getFindByPK(arriendo.rut_conductor2);
        if (arriendo.rut_conductor3) payload.conductor3 = await this._conductorRepository.getFindByPK(arriendo.rut_conductor3);
        payload.arriendo = arriendo;
        payload.extencion = extencion;
        //se genera el documento
        const docDefinition = await extencionPlantilla(payload);
        const pdfDocGenerator = pdfMake.createPdf(docDefinition);
        return {
            success: true,
            pdfDocGenerator: pdfDocGenerator,
            firma1: payload.firmaClientePNG,
        };
    }


    async sendEmailContrato(id_arriendo) {
        const arriendo = await this._arriendoRepository.getFindOneMin(id_arriendo);
        const client = {};
        //funcion para ordenar el array de pagos por fecha de creacion y poner el mas nuevo al final
        const contratos = ordenarArrayporFecha(arriendo.contratos);
        switch (arriendo.tipo_arriendo) {
            case "PARTICULAR":
                client.name = arriendo.cliente.nombre_cliente;
                client.correo = arriendo.cliente.correo_cliente;
                break;
            case "REEMPLAZO":
                client.name = arriendo.remplazo.cliente.nombre_cliente;
                client.correo = arriendo.remplazo.cliente.correo_cliente;
                break;
            case "EMPRESA":
                client.name = arriendo.empresa.nombre_empresa;
                client.correo = arriendo.empresa.correo_empresa;
                break;
        }
        //datos del mensaje y su destinatario
        const mailOptions = {
            from: "'Rent A Car - Grupo Firma' <api.rentacarmaule@grupofirma.cl>",
            to: client.correo,
            bcc: process.env.CORREO_SUPERVISOR,
            subject: `COPIA DE CONTRATO ${arriendo.id_arriendo} RENT A CAR`,
            text: "Se adjunta copia del contrato Rent a Car",
            html: `
            <p>Sr.(a) ${client.name}:</p>
            <p>Por este medio envio su copia del contrato de arriendo de Rent a Car.</p>
            <br><br>
            <p>------------------------------------------------------------------------------------------------------------------------------</p>
            <p>Atentamente, Rent a Car Maule Ltda. </p>
            <p>Por favor no responder este correo.</p>
            <img src="data:image/jpeg;base64,${await base64(logo)}" width="200" height="50"  />
            `,
            attachments: [{
                filename: "CONTRATO.pdf",
                contentType: "pdf",
                path: path.join(__dirname, `../${process.env.PATH_CONTRATO}/${contratos[contratos.length - 1].documento}`)
            },],
        };
        const responseEmail = await nodemailerTransporter.sendMail(mailOptions);
        return responseEmail;
    }


    async sendEmailContratoExtencion(id_extencion) {
        const extencion = await this._extencionRepository.findOne(id_extencion);
        const arriendo = await this._arriendoRepository.getFindOneMin(extencion.id_arriendo);
        const client = {};
        //funcion para ordenar el array de pagos por fecha de creacion y poner el mas nuevo al final
        switch (arriendo.tipo_arriendo) {
            case "PARTICULAR":
                client.name = arriendo.cliente.nombre_cliente;
                client.correo = arriendo.cliente.correo_cliente;
                break;
            case "REEMPLAZO":
                client.name = arriendo.remplazo.cliente.nombre_cliente;
                client.correo = arriendo.remplazo.cliente.correo_cliente;
                break;
            case "EMPRESA":
                client.name = arriendo.empresa.nombre_empresa;
                client.correo = arriendo.empresa.correo_empresa;
                break;
        }
        //datos del mensaje y su destinatario
        const mailOptions = {
            from: "'Rent A Car - Grupo Firma' <api.rentacarmaule@grupofirma.cl>",
            to: client.correo,
            bcc: process.env.CORREO_SUPERVISOR,
            subject: `COPIA DE EXTENCION DE CONTRATO Nº ${arriendo.id_arriendo} RENT A CAR`,
            text: "Se adjunta copia de extencion del contrato Rent a Car",
            html: `
            <p>Sr.(a) ${client.name}:</p>
            <p>Por este medio envio su copia de la extencion del contrato de arriendo de Rent a Car.</p>
            <br><br>
            <p>------------------------------------------------------------------------------------------------------------------------------</p>
            <p>Atentamente, Rent a Car Maule Ltda. </p>
            <p>Por favor no responder este correo.</p>
            <img src="data:image/jpeg;base64,${await base64(logo)}" width="200" height="50"  />
            `,
            attachments: [{
                filename: "EXTENCION.pdf",
                contentType: "pdf",
                path: path.join(__dirname, `../${process.env.PATH_CONTRATO}/${extencion.contrato.documento}`)
            },],
        };
        const responseEmail = await nodemailerTransporter.sendMail(mailOptions);
        return responseEmail;
    }


    async createContacto(contacto) {
        const contactoRepo = await this._contactoRepository.postCreate(contacto);
        return contactoRepo;
    }


    async updateContacto(contacto, id_contacto) {
        await this._contactoRepository.putUpdate(contacto, id_contacto);
        return true;
    }


}




module.exports = ArriendoBusiness;