const { v4: uuidv4 } = require("uuid");
class VehiculoBusiness {

    constructor({ VehiculoRepository, ArriendoRepository, DanioVehiculoRepository, TarifaVehiculoRepository, ExtencionRepository, }) {
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



    async getAllVehiculos() {
        const vehiculos = await this._vehiculoRepository.getFindAll();
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
        const vehiculoRepo = await this._vehiculoRepository.putUpdate(vehiculo, patente);
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
        await this._vehiculoRepository.putUpdate(data, patente);
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




}

module.exports = VehiculoBusiness;