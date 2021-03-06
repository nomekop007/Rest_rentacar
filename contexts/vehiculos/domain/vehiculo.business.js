const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const pdfMake = require("pdfmake/build/pdfmake.js");
const pdfFonts = require("pdfmake/build/vfs_fonts.js");
pdfMake.vfs = pdfFonts.pdfMake.vfs;
const actaRecepcionPlantilla = require("../../../utils/pdf_plantillas/actaRecepcion")
const fecha = require("../../../helpers/currentDate");
const hora = require("../../../helpers/currentTime");

class VehiculoBusiness {

    constructor({ VehiculoRepository, ArriendoRepository, DanioVehiculoRepository, TarifaVehiculoRepository, ExtencionRepository }) {
        this._vehiculoRepository = VehiculoRepository;
        this._arriendoRepository = ArriendoRepository;
        this._danioVehiculoRepository = DanioVehiculoRepository;
        this._tarifaVehiculoRepository = TarifaVehiculoRepository;
        this._extencionRepository = ExtencionRepository;
    }


    async getVehiculos() {
        const vehiculos = await this._vehiculoRepository.getFindAll();
        return vehiculos;
    }


    async getVehiculosDisponibles() {
        const vehiculos = await this._vehiculoRepository.getFindAllByDisponible();
        return vehiculos;
    }

    async getVehiculosArrendados() {
        const vehiculos = await this._vehiculoRepository.getFindAllArrendados();
        return vehiculos;
    }


    async getVehiculosDisponiblesBySucursal(id_sucursal) {
        const vehiculos = await this._vehiculoRepository.getFindAllBySucursalDispoinble(id_sucursal);
        return vehiculos;
    }


    async getVehiculosArrendadosBySucursal(id_sucursal) {
        const vehiculos = await this._vehiculoRepository.getFindAllBySucursalArrendado(id_sucursal);
        return vehiculos;
    }


    async findVehiculo(patente) {
        const vehiculo = await this._vehiculoRepository.getFindOne(patente);
        return vehiculo;
    }



    async createVehiculo(vehiculo) {
        let payload = {};
        vehiculo.id_vehiculo = uuidv4();
        if (vehiculo.patente_vehiculo.length < 3) {
            payload = { success: false, msg: "patente invalida!!" };
        } else {
            const [v, created] = await this._vehiculoRepository.postFindOrCreate(vehiculo, vehiculo.patente_vehiculo);
            if (created) {
                payload = { success: true, msg: " Vehiculo registrado exitosamente", }
            } else {
                payload = { success: false, msg: " Vehiculo ya existe", }
            }
        }
        return payload;
    }



    async updateStateVehiculo(vehiculo, patente) {
        if (vehiculo.kilometrosMantencion_vehiculo == null) delete vehiculo.kilometrosMantencion_vehiculo;
        const vehiculoRepo = await this._vehiculoRepository.putUpdateByPatente(vehiculo, patente);
        return vehiculoRepo;
    }



    async deleteVehiculo(patente) {
        await this._vehiculoRepository.deleteDestroy(patente);
        let payload = {
            success: true,
            msg: " Vehiculo borrado exitosamente",
            data: patente,
        }
        return payload;
    }



    async updateImageVehiculo(name_file, patente) {
        const data = { foto_vehiculo: name_file };
        await this._vehiculoRepository.putUpdateByPatente(data, patente);
        let payload = {
            success: true,
            msg: " imagen guardada",
        }
        return payload;
    }



    async updateVehiculo(vehiculo, patente) {
        /* IMPORTANTE !!!!  SI EL VEHICULO TIENE UNA NUEVA ASOCIACION CON OTRA TABLA , SE TIENE 
                QUE AGREGAR LOS SCRIPT CORRESPONDIENTES A LOS METODOS borrarDatosAsociados() y agregarDatosAsociados() */
        const vehiculoRepo = await this._vehiculoRepository.getFindOneById(patente);
        if (vehiculo.patente_vehiculo.length < 3) return { success: false, msg: "patente invalida!!" };
        if (vehiculoRepo.patente_vehiculo != vehiculo.patente_vehiculo) {
            await this.borrarDatosAsociados(vehiculoRepo);
            try {
                await this._vehiculoRepository.putUpdateById(vehiculo, patente);
            } catch (error) {
                console.log("error")
                await this.agregarDatosAsociados(vehiculoRepo, vehiculoRepo.patente_vehiculo);
                return { success: false, msg: "puede que la patente ya exista!" };
            }
            await this.agregarDatosAsociados(vehiculoRepo, vehiculo.patente_vehiculo);
        } else {
            await this._vehiculoRepository.putUpdateById(vehiculo, patente);
        }
        return { success: true, msg: "Vehiculo modificado exitosamente" };
    }

    async borrarDatosAsociados(vehiculo) {
        if (vehiculo.tarifasVehiculo) await this._tarifaVehiculoRepository.putUpdateById({ patente_vehiculo: null }, vehiculo.tarifasVehiculo.id_tarifaVehiculo);
        if (vehiculo.arriendos.length > 0) await vehiculo.arriendos.map(async ({ id_arriendo }) => await this._arriendoRepository.putUpdate({ patente_vehiculo: null }, id_arriendo));
        if (vehiculo.danioVehiculos.length > 0) await vehiculo.danioVehiculos.map(async ({ id_danioVehiculo }) => await this._danioVehiculoRepository.putUpdate({ patente_vehiculo: null }, id_danioVehiculo));
        if (vehiculo.extenciones.length > 0) await vehiculo.extenciones.map(async ({ id_extencion }) => await this._extencionRepository.putUpdateById({ patente_vehiculo: null }, id_extencion));
    }

    async agregarDatosAsociados(vehiculo, newPatente) {
        if (vehiculo.tarifasVehiculo) await this._tarifaVehiculoRepository.putUpdateById({ patente_vehiculo: newPatente }, vehiculo.tarifasVehiculo.id_tarifaVehiculo);
        if (vehiculo.arriendos.length > 0) await vehiculo.arriendos.map(async ({ id_arriendo }) => await this._arriendoRepository.putUpdate({ patente_vehiculo: newPatente }, id_arriendo));
        if (vehiculo.danioVehiculos.length > 0) await vehiculo.danioVehiculos.map(async ({ id_danioVehiculo }) => await this._danioVehiculoRepository.putUpdate({ patente_vehiculo: newPatente }, id_danioVehiculo));
        if (vehiculo.extenciones.length > 0) await vehiculo.extenciones.map(async ({ id_extencion }) => await this._extencionRepository.putUpdateById({ patente_vehiculo: newPatente }, id_extencion));
    }




    async createDanioVehiculo(id_arriendo, descripcion_danio, arrayImages, userAt) {
        const arriendo = await this._arriendoRepository.getFindOne(id_arriendo);


        const dataPlantilla = {};
        dataPlantilla.id_arriendo = id_arriendo;
        dataPlantilla.vehiculo = arriendo.vehiculo;
        dataPlantilla.descripcion_danio = descripcion_danio;
        dataPlantilla.arrayImages = arrayImages;
        dataPlantilla.id_despacho = arriendo.id_arriendo;
        dataPlantilla.userAt = userAt;
        dataPlantilla.fecha = fecha();
        dataPlantilla.hora = hora();
        const docDefinition = await actaRecepcionPlantilla(dataPlantilla);
        const nameFile = uuidv4();
        const pdfDocGenerator = pdfMake.createPdf(docDefinition);
        const pathFile = path.join(__dirname, `../${process.env.PATH_DANIO_VEHICULO}/${nameFile}.pdf`)
        pdfDocGenerator.getBase64((base64) => {
            fs.writeFileSync(pathFile, base64, "base64", (err) => {
                return false;
            })
        });
        const data = {
            descripcion_danioVehiculo: descripcion_danio,
            documento_danioVehiculo: nameFile + ".pdf",
            id_arriendo: arriendo.id_arriendo,
            patente_vehiculo: arriendo.patente_vehiculo,
            estado_danioVehiculo: "PENDIENTE",
            userAt: userAt
        }
        await this._danioVehiculoRepository.postCreate(data);
        return true;
    }



    async consultarDanioVehiculo(id_arriendo) {
        const arriendo = await this._arriendoRepository.getFindOne(id_arriendo);
        if (!arriendo.danioVehiculos) {
            return false;
        }
        if (arriendo.danioVehiculos.length > 0) {
            return true;
        } else {
            return false;
        }
    }


    async getDanioVehiculo(id_sucursal) {
        if (id_sucursal === "0") {
            const danios = await this._danioVehiculoRepository.getFindAll();
            return danios;
        } else {
            const danios = await this._danioVehiculoRepository.getFindAllById(id_sucursal);
            return danios;
        }
    }

    async updateDanioVehiculo(danio, id_danio) {
        await this._danioVehiculoRepository.putUpdate(danio, id_danio);
        await this._danioVehiculoRepository.getFindByPk(id_danio);
        return true;
    }


    async createTarifaVehiculo(arrayTarifasVehiculos, userAt) {
        arrayTarifasVehiculos.forEach(async vehiculo => {
            vehiculo.userAt = userAt;
            const [tarifaVehiculo, created] = await this._tarifaVehiculoRepository.postFindOrCreate(vehiculo, vehiculo.patente_vehiculo);
            if (!created) await this._tarifaVehiculoRepository.putUpdateByPatente(vehiculo, vehiculo.patente_vehiculo);
        });
        return true;
    }



    async getTarifaVehiculo() {
        const tarifasVehiculos = await this._tarifaVehiculoRepository.getFindAll();
        return tarifasVehiculos;
    }


    async findTarifaVehiculoByDias(patente, dias) {
        const tarifaVehiculo = await this._tarifaVehiculoRepository.getFindOne(patente);
        let valorDia = 0;
        let valorNeto = 0;
        if (tarifaVehiculo) {
            if (Number(dias) < 7) {
                valorDia = tarifaVehiculo.valor_neto_diario;
            }
            if (Number(dias) >= 7) {
                valorDia = tarifaVehiculo.valor_neto_semanal / 7;
            }
            if (Number(dias) >= 15) {
                valorDia = tarifaVehiculo.valor_neto_quincenal / 15;
            }
            if (Number(dias) >= 30) {
                valorDia = tarifaVehiculo.valor_neto_mensual / 30;
            }
            valorNeto = valorDia * Number(dias);
        }
        return { valorDia, valorNeto }
    }

    // creadas por esteban mallea

    async deleteDanioVehiculo_new(DATA) {

        console.log(DATA);
        var id = DATA.id_arriendo;
        var estado = { estado_danioVehiculo: DATA.descripcion_danio }

        await this._danioVehiculoRepository.putUpdate(estado, id);
        let payload = {
            success: true,
            msg: " Daño borrado exitosamente",
        }
        return payload;
    }

    async createDanioVehiculo_new(DATA) {

        const arriendo = await this._arriendoRepository.getFindOne(DATA.id_danio);
        console.log(arriendo.despacho.revision_recepcion);
        const data = {
            documento_danioVehiculo: arriendo.despacho.revision_recepcion,
            descripcion_danioVehiculo: DATA.descripcion_danio,
            id_arriendo: arriendo.id_arriendo,
            patente_vehiculo: arriendo.patente_vehiculo,
            estado_danioVehiculo: "PENDIENTE",
            userAt: DATA.userAt
        }
        await this._danioVehiculoRepository.postCreate_unico(data);
        return true;
    }
}

module.exports = VehiculoBusiness;