
const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const base64 = require("image-to-base64");
const pdfMake = require('pdfmake/build/pdfmake.js');
const pdfFonts = require('pdfmake/build/vfs_fonts.js');
pdfMake.vfs = pdfFonts.pdfMake.vfs;
const { nodemailerTransporter } = require("../../../helpers/valueObject");
const fecha = require("../../../helpers/currentDate");
const hora = require("../../../helpers/currentTime");
const fechahorafirma = require("../../../helpers/dateTimeSignature");
const logo = require.resolve("../../../utils/images/logo2.png");
const actaRecepcionPlantilla = require("../../../utils/pdf_plantillas/actaRecepcion")
const actaEntregaPlantilla = require("../../../utils/pdf_plantillas/actaEntrega");
const formatter = new Intl.NumberFormat("CL");
const moment = require("moment");

class DespachoBusiness {

    constructor({ VehiculoRepository, DanioVehiculoRepository, DespachoRepository, BloqueoUsuarioRepository, FotoRecepcionRepository, FotoDespachoRepository, ArriendoRepository, ActaEntregaRepository, }) {
        this._danioVehiculoRepository = DanioVehiculoRepository;
        this._actaEntregaRepository = ActaEntregaRepository;
        this._arriendoRepository = ArriendoRepository;
        this._fotoDespachoRepository = FotoDespachoRepository;
        this._fotoRecepcionRepository = FotoRecepcionRepository;
        this._despachoRepository = DespachoRepository;
        this._bloqueoUsuarioRepository = BloqueoUsuarioRepository;
        this._vehiculoRepository = VehiculoRepository;
    }


    async createBloqueoUsuario(id_arriendo, id_usuario, tipo, userAt) {
        switch (tipo) {
            case "RECEPCION":
                const arriendo = await this._arriendoRepository.getFindOne(id_arriendo);
                const arriendoPublic = await this._arriendoRepository.getFindOnePublic(id_arriendo);
                let pagos_listos = true;
                let firmas_listas = true;
                arriendo.pagosArriendos.forEach(({ pagos, contrato }) => {
                    if (pagos[0].estado_pago == "PENDIENTE") {
                        pagos_listos = false;
                    }
                    if (!contrato) {
                        firmas_listas = false;
                    };
                });
                if (pagos_listos && firmas_listas) {
                    return null;
                } else {
                    const data = {
                        id_usuario: id_usuario,
                        id_arriendo: id_arriendo,
                        arriendo: arriendoPublic,
                        tipo_bloqueoUsuario: tipo,
                        userAt: userAt,
                    };
                    const bloqueoUsuario = await this._bloqueoUsuarioRepository.create(data);
                    return bloqueoUsuario;
                }
            case "PROCESO":
                const data = {
                    id_usuario: id_usuario,
                    id_arriendo: id_arriendo,
                    tipo_bloqueoUsuario: tipo,
                    userAt: userAt,
                };
                const bloqueoUsuario = await this._bloqueoUsuarioRepository.create(data);
                return bloqueoUsuario;
            default:
                return null;
        }
    }


    async revisarBloqueoUsuario(id_usuario) {
        const listBloqueo = await this._bloqueoUsuarioRepository.getFindAllByUsuario(id_usuario);
        const bloqueoUsuario = listBloqueo[listBloqueo.length - 1];
        if (!bloqueoUsuario) {
            return null;
        }
        const arriendo = await this._arriendoRepository.getFindOne(bloqueoUsuario.id_arriendo);
        const arriendoPublic = await this._arriendoRepository.getFindOnePublic(bloqueoUsuario.id_arriendo);

        switch (bloqueoUsuario.tipo_bloqueoUsuario) {
            case "RECEPCION":
                let faltante = [];
                let pagos_listos = true;
                let firmas_listas = true;
                let i = 1;
                arriendo.pagosArriendos.forEach(({ pagos, contrato }) => {
                    if (pagos[0].estado_pago == "PENDIENTE") {
                        pagos_listos = false;
                        if (arriendo.tipo_arriendo === "REEMPLAZO") {
                            faltante.push({ msg: "subir comprobante correspondiente al pago total del arriendo." });
                        }
                        if (arriendo.tipo_arriendo != "REEMPLAZO") {
                            faltante.push({ msg: "subir comprobante correspondiente al monto de $ " + formatter.format(pagos[0].total_pago) + "." });
                        }
                    }
                    if (!contrato) {
                        firmas_listas = false;
                        faltante.push({ msg: `Firmar contrato de la extencion Nº${i} !.` })
                        i++;
                    };
                });
                if (pagos_listos && firmas_listas) {
                    await this._bloqueoUsuarioRepository.deleteDestroy(bloqueoUsuario.id_bloqueoUsuario);
                    return null;
                } else {
                    return { id_arriendo: arriendo.id_arriendo, arriendo: arriendoPublic, falta: faltante, pagos: pagos_listos, firmas: firmas_listas, tipo: bloqueoUsuario.tipo_bloqueoUsuario };
                }
            case "PROCESO":
                if (arriendo.estado_arriendo != "PENDIENTE" && arriendo.estado_arriendo != "CONFIRMADO" && arriendo.estado_arriendo != "FIRMADO") {
                    await this._bloqueoUsuarioRepository.deleteDestroy(bloqueoUsuario.id_bloqueoUsuario);
                    return null;
                }
                let horaLimite = -86400000; // 24 horas
                const countDownDate = moment(arriendo.createdAt);
                let time = countDownDate.diff(moment());
                // si el tiempo de atraso supera las 24 horas limites
                if (time < horaLimite) {
                    return { id_arriendo: arriendo.id_arriendo, arriendo: arriendoPublic, tipo: bloqueoUsuario.tipo_bloqueoUsuario };
                }
                return null;
            default:
                return null;
        }
    }


    async createDespacho(despacho) {
        const despachoRepo = await this._despachoRepository.create(despacho);
        return despachoRepo;
    }


    async addRevision(id_despacho, arrayImages, userAt) {
        const dataPlantilla = {
            arrayImages: arrayImages,
            id_despacho: id_despacho,
            userAt: userAt,
            fecha: fecha(),
            hora: hora()
        };
        const docDefinition = await actaRecepcionPlantilla(dataPlantilla);
        const nameFile = uuidv4();
        const pdfDocGenerator = pdfMake.createPdf(docDefinition);
        const pathFile = path.join(__dirname, `../${process.env.PATH_RECEPCIONES}/${nameFile}.pdf`)
        pdfDocGenerator.getBase64((base64) => {
            fs.writeFileSync(pathFile, base64, "base64", (err) => {
                return { success: false, msg: err }
            })
        });
        const data = { revision_recepcion: `${nameFile}.pdf` };
        await this._despachoRepository.putUpdate(data, id_despacho);
        return { success: true, msg: "revision existosa" }
    }


    async createActaEntrega(id_despacho, userAt, base64) {
        const nameFile = uuidv4();
        const pathFile = path.join(__dirname, `../${process.env.PATH_ACTA_ENTREGA}/${nameFile}.pdf`)
        fs.writeFileSync(pathFile, base64, "base64", (err) => {
            return { success: false, msg: err };
        });
        const dataActa = {
            documento: nameFile + ".pdf",
            userAt: userAt,
            id_despacho: id_despacho
        };
        const actaEntrega = await this._actaEntregaRepository.create(dataActa);
        return { success: true, data: actaEntrega };
    }


    async generatePDFactaEntrega(payload) {
        const arriendo = await this._arriendoRepository.getFindOne(payload.id_arriendo);
        const ArrayImages = await this._fotoDespachoRepository.getFindAllByArriendo(arriendo.id_arriendo);
        payload.arrayImages = ArrayImages;
        payload.vehiculo = arriendo.vehiculo;
        payload.kilometraje = arriendo.kilometrosEntrada_arriendo;
        payload.id_arriendo = arriendo.id_arriendo;
        payload.fecha = fecha();
        payload.hora = hora();
        payload.fechaHoraFirma = fechahorafirma();
        if (arriendo.estado_arriendo === "FIRMADO" && arriendo.despacho == null) {
            const docDefinition = await actaEntregaPlantilla(payload);
            const pdfDocGenerator = pdfMake.createPdf(docDefinition);
            return {
                success: true,
                pdfDocGenerator: pdfDocGenerator,
                firma1PNG: payload.firma1PNG,
                firma2PNG: payload.firma2PNG,
            };
        } else {
            return {
                success: false,
                msg: "el arriendo ya esta despachado o no esta firmado!",
            };
        }
    }


    async generatePDFactaRecepcion(payload) {
        const arriendo = await this._arriendoRepository.getFindOne(payload.id_arriendo);
        const ArrayImages = await this._fotoRecepcionRepository.getFindAllByArriendo(arriendo.id_arriendo);
        payload.arrayImages = ArrayImages;
        payload.vehiculo = arriendo.vehiculo;
        payload.fecha = fecha();
        payload.hora = hora();
        payload.fechaHoraFirma = fechahorafirma();
        if (arriendo.estado_arriendo === "ACTIVO") {
            const docDefinition = await actaRecepcionPlantilla(payload);
            const pdfDocGenerator = pdfMake.createPdf(docDefinition);
            return {
                success: true,
                pdfDocGenerator: pdfDocGenerator,
                firma1PNG: payload.firma1PNG,
                firma2PNG: payload.firma2PNG,
            };
        } else {
            return {
                success: false,
                msg: "el arriendo ya esta despachado o no esta firmado!",
            };
        }
    }


    async sendEmailActaEntrega(id_arriendo) {
        const arriendo = await this._arriendoRepository.getFindOne(id_arriendo);
        const arrayImages = await this._fotoDespachoRepository.getFindAllByArriendo(id_arriendo);
        const client = {};
        const files = [];
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
        files.push({
            filename: "ACTA-DE-ENTREGA.pdf",
            contentType: "pdf",
            path: path.join(__dirname, `../${process.env.PATH_ACTA_ENTREGA}/${arriendo.despacho.actasEntrega.documento}`),
        });
        //datos del mensaje y su destinatario
        const mailOptions = {
            from: "'Rent A Car - Grupo Firma' <api.rentacarmaule@grupofirma.cl>",
            to: client.correo,
            bcc: process.env.CORREO_SUPERVISOR,
            subject: "COPIA DE ACTA DE ENTREGA RENT A CAR",
            text: "Se adjunta copia del Acta de entrega de Rent a Car",
            html: `
            <p>Sr.(a) ${client.name}:</p>
            <p>Por este medio envio su copia del Acta de entrega de Rent a Car.</p>
            <br>
            Link de fotos
            <br>
            ${arrayImages.map(({ url_fotoDespacho }) => {
                const link = `${process.env.PATH_SERVER}/${url_fotoDespacho}`;
                return `<li><a href="${link}">${url_fotoDespacho}</a></li>`;
            })}
            <br><br>
            <p>------------------------------------------------------------------------------------------------------------------------------</p>
            <p>Atentamente, Rent a Car Maule Ltda. </p>
            <p>Por favor no responder este correo.</p>
            <img src="data:image/jpeg;base64,${await base64(logo)}" width="200" height="50"  />
            `,
            attachments: files,
        };
        const responseEmail = await nodemailerTransporter.sendMail(mailOptions);
        return responseEmail;
    }


    async guardarFotosVehiculos(id_arriendo, userAt, arrayFiles) {
        await this._fotoDespachoRepository.deleteByIdArriendo(id_arriendo);
        for (const property in arrayFiles) {
            this._fotoDespachoRepository.create({
                userAt: userAt,
                id_arriendo: id_arriendo,
                url_fotoDespacho: arrayFiles[property][0].filename
            })
        }
        return true;
    }


    async guardarFotoRecepcion(id_arriendo, userAt, nombre_foto) {
        const data = {
            id_arriendo: id_arriendo,
            userAt: userAt,
            url_fotoRecepcion: nombre_foto
        }
        const fotoRecepcionRepo = await this._fotoRecepcionRepository.create(data);
        if (fotoRecepcionRepo) {
            return { success: true, msg: "guardado!" }
        } else {
            return { success: false, msg: "ocurrio un error al guardar una foto!" }
        }
    }


    async findActaEntrega(id_despacho) {
        const actaEntrega = await this._actaEntregaRepository.getFindOneByIDdespacho(id_despacho);
        const pathFile = path.join(__dirname, `../${process.env.PATH_ACTA_ENTREGA}/${actaEntrega.documento}`)
        const base64 = fs.readFileSync(pathFile, { encoding: 'base64' });
        return { actaEntrega: actaEntrega, base64: base64, url: process.env.PATH_SERVER }
    }


    async eliminarFotosRecepcion(id_arriendo) {
        // eliminar tambien las fotos del servidor?
        await this._fotoRecepcionRepository.deleteByIdArriendo(id_arriendo);
        return { success: true, msg: "fotos eliminadas con exito!" };
    }


    async eliminarFotosDespacho(id_arriendo) {
        // eliminar tambien las fotos del servidor?
        await this._fotoDespachoRepository.deleteByIdArriendo(id_arriendo);
        return { success: true, msg: "fotos eliminadas con exito!" }
    }


    async confirmarRecepcionArriendo(id_arriendo, base64, tieneDanio, descripcion_danio, kilomentraje_salida, userAt) {

        if (id_arriendo === null || kilomentraje_salida === null || base64 === null) {
            return { success: false, msg: "algo paso intente nuevamente!" };
        }

        const arriendo = await this._arriendoRepository.getFindOneMin(id_arriendo);

        //guardar file
        const nameFile = uuidv4();
        const pathFile = path.join(__dirname, `../${process.env.PATH_RECEPCIONES}/${nameFile}.pdf`)
        fs.writeFileSync(pathFile, base64, "base64", (err) => {
            return { success: false, msg: err };
        });

        //agregar acta recepcion al despacho
        const data = { revision_recepcion: `${nameFile}.pdf` };
        await this._despachoRepository.putUpdate(data, arriendo.despacho.id_despacho);

        //cambiar estado vehiculo
        const dataVehiculo = { estado_vehiculo: "DISPONIBLE" };
        await this._vehiculoRepository.putUpdateByPatente(dataVehiculo, arriendo.patente_vehiculo);

        const dataArriendo = { estado_arriendo: "RECEPCIONADO", kilometrosSalida_arriendo: kilomentraje_salida };
        await this._arriendoRepository.putUpdate(dataArriendo, id_arriendo);

        // si tiene daño se agrega
        if (tieneDanio === 'true') {
            const pathFile = path.join(__dirname, `../${process.env.PATH_DANIO_VEHICULO}/${nameFile}.pdf`)
            fs.writeFileSync(pathFile, base64, "base64", (err) => {
                return { success: false, msg: err };
            })

            const data = {
                descripcion_danioVehiculo: descripcion_danio,
                documento_danioVehiculo: nameFile + ".pdf",
                id_arriendo: arriendo.id_arriendo,
                patente_vehiculo: arriendo.patente_vehiculo,
                estado_danioVehiculo: "PENDIENTE",
                userAt: userAt
            }
            await this._danioVehiculoRepository.postCreate(data);
        }

        // enviar correo
        //PENDIENTE

        return { success: true, msg: "confirmar" };
    }



    async confirmarDespachoArriendo(id_arriendo, id_despacho, observaciones_despacho, nombreRecibidor_despacho, nombreDespachador_despacho, kilometraje_vehiculo, base64, userAt) {

        if (id_arriendo === null || id_despacho === null || kilometraje_vehiculo === null || base64 === null) {
            return { success: false, msg: "algo paso intente nuevamente!" };
        }

        const arriendo = await this._arriendoRepository.getFindOneMin(id_arriendo);

        //crear despacho
        const despacho = { id_arriendo, id_despacho, observaciones_despacho, nombreRecibidor_despacho, nombreDespachador_despacho, userAt: userAt }
        const responseDespacho = await this.createDespacho(despacho);
        if (!responseDespacho) {
            return { success: false, msg: "algo paso intente nuevamente!" };
        }
        //registrar acta despacho
        const responseActa = await this.createActaEntrega(id_despacho, userAt, base64);
        if (!responseActa.success) {
            return { success: false, msg: "algo paso intente nuevamente!" };
        }

        //cambiar estado arriendo
        const dataArriendo = { estado_arriendo: "ACTIVO", kilometrosEntrada_arriendo: kilometraje_vehiculo };
        await this._arriendoRepository.putUpdate(dataArriendo, id_arriendo);

        //cambiar estado vehiculo
        const dataVehiculo = { estado_vehiculo: "ARRENDADO" };
        await this._vehiculoRepository.putUpdateByPatente(dataVehiculo, arriendo.patente_vehiculo);

        // si todo sale ok
        return { success: true, msg: "datos okey" };
    }


}

module.exports = DespachoBusiness;