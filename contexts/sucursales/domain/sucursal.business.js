var moment = require('moment');
const path = require("path");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");
const base64 = require("image-to-base64");
const pdfMake = require('pdfmake/build/pdfmake.js');
const pdfFonts = require('pdfmake/build/vfs_fonts.js');
const actaTrasladoOrigenPlantilla = require("../../../utils/pdf_plantillas/actaTrasladoOrigen");
const actaTrasladoDestinoPlantilla = require("../../../utils/pdf_plantillas/actaTrasladoDestino");


class SucursalBusiness {

    constructor({ SucursalRepository, RegionRepository,VehiculoRepository, TrasladoRepository }) {
        this._sucursalRepository = SucursalRepository;
        this._regionRepository = RegionRepository;
        this._vehiculoRepository = VehiculoRepository;
        this._trasladoRepository = TrasladoRepository;
    }

    async getSucursales() {
        const sucursales = await this._sucursalRepository.getFindAll();
        return sucursales;
    }

    async findSucursalById(id_sucursal) {
        const sucursal = await this._sucursalRepository.getFindOne(id_sucursal);
        return sucursal;
    }

    async createSucursal(sucursal) {
        const CreateSucursal = await this._sucursalRepository.postCreate(sucursal);
        return CreateSucursal;
    }

    async updateSucursal(id_sucursal, sucursal) {
        await this._sucursalRepository.putUpdate(id_sucursal, sucursal);
        return true;
    }

    async getFindArriendoBySucursal() {
        const sucursal = await this._sucursalRepository.getArriendoBySucursal();
        return sucursal;
    }

    async getRegiones() {
        const regiones = await this._regionRepository.getFindAll();
        return regiones;
    }

    async guardarFotosTrasladoOrigen(ID, arrayFiles) {

        let ImagenesOrigen="";
        let separador="/";

        for (const property in arrayFiles) {
            ImagenesOrigen+=arrayFiles[property][0].filename+"/";
        }

        ImagenesOrigen = ImagenesOrigen.substring(0, ImagenesOrigen.length - 1);
        const DATA2={arrayimagenesOrigen: ImagenesOrigen};


        await this._trasladoRepository.putUpdateEstado(ID, DATA2);
         return { success: true, msg: "guardado!" }
    }

    async guardarFotosTrasladoDestino(ID, arrayFiles) {

        let ImagenesDestino="";

        for (const property in arrayFiles) {
            ImagenesDestino+=arrayFiles[property][0].filename+"/";
        }

        ImagenesDestino = ImagenesDestino.substring(0, ImagenesDestino.length - 1);

        console.log(ImagenesDestino);
        const DATA2={arrayimagenDestino: ImagenesDestino};



        await this._trasladoRepository.putUpdateEstado(ID, DATA2);
         return { success: true, msg: "guardado!" }
    }


    async updateTrasladoEstado(id_traslado,DATA){

        const nameFile = uuidv4();

        var FechaDestino = moment();
        var hora=moment().format('HH:mm:ss');
        var fecha=moment().format('MMM-DD-YYYY');

        const traslado_ = await this._trasladoRepository.getFindOne(id_traslado);
        let traslado = traslado_;
        var patente = traslado.patente_vehiculo;

        const vehiculo_ = await this._vehiculoRepository.getFindOne(traslado.patente_vehiculo);
        let vehiculo =vehiculo_;

        //     CREACION DEL PDF DE ACTA RECEPCION TRASLADO

        const dataPlantilla = {
            id_traslado: traslado.id_traslado,
            userAt: DATA.userAt,
            patente: traslado.patente_vehiculo,
            modelo: vehiculo.modelo_vehiculo,
            tipo: vehiculo.tipo_vehiculo,
            marca: vehiculo.marca_vehiculo,
            conductor: traslado.conductor,
            rutConductor: traslado.rutConductor,
            origen: traslado.nombreSucursalOrigen,
            destino: traslado.nombreSucursalDestino,
            observacion: traslado.observacion,
            fecha: fecha,
            hora: hora
        };

        const docDefinition = await actaTrasladoDestinoPlantilla(dataPlantilla);
        const pdfDocGenerator = pdfMake.createPdf(docDefinition);
        const pathFile = path.join(__dirname, `../${process.env.PATH_ACTA_TRASLADO_DESTINO}/${nameFile}.pdf`)
        pdfDocGenerator.getBase64((base64) => {
            fs.writeFileSync(pathFile, base64, "base64", (err) => {
                return { success: false, msg: err }
            })
        });

        var arrayImagenDestino=DATA.arrayimagenDestino;

        let TrasladoUpdate ={
            estado: "FINALIZADO",
            arrayimagenDestino:arrayImagenDestino,
            fechaTrasladoDestino: FechaDestino,
            actaTrasladoDestino:nameFile+".pdf"
        }
        let VehiculoUpdate={
            id_sucursal:traslado.sucursalDestino,
            kilometraje_vehiculo: vehiculo.kilometraje_vehiculo,
            estado_vehiculo: "DISPONIBLE"
        }
        // Actualizar tabla de traslado


        const UpdateTraslado_ = await this._trasladoRepository.putUpdateEstado(id_traslado,TrasladoUpdate);


        const UpdateVehiculo_ = await this._vehiculoRepository.putUpdateByPatente(VehiculoUpdate,patente);
        return { success: true, msg: "Traslado recepcionado con exito!" };
    }

    async getTraslado(ID){

        const traslado_ = await this._trasladoRepository.getFindOne(ID);
        return traslado_;
    }
    async deleteTraslado(ID){

        console.log("Traslado busiines delete");

        const DATA2={estado: "ANULADO"};
        const traslado_ = await this._trasladoRepository.putUpdateEstado(ID, DATA2);
        return { success: true, msg: "Traslado anulado con exito!" }

    }

    async getAllTraslado(){

        const traslados = await this._trasladoRepository.getFindAll();
        return traslados;

    }

    async createTrasladoOrigen(DATA){

        const vehiculo = await this._vehiculoRepository.getFindOne(DATA.patente_vehiculo);
        const nameFile = uuidv4();
        
        var now = moment();
        var hora=moment().format('HH:mm:ss');
        var fecha=moment().format('MMM-DD-YYYY');

        DATA.fechaTrasladoDestino=new Date();
        DATA.arrayimagenesOrigen=""
        //para no dejar el campo vacio // Se actualiza en recepcion de vehiculo
        
        const DATA2={
            estado_vehiculo: "EN TRASLADO",
        }

        const CreateTraslado = await this._trasladoRepository.postCreate(DATA);
        const CambiarEstadoVehiculo = await this._vehiculoRepository.putUpdateByPatente(DATA2,vehiculo.patente_vehiculo);

        const dataPlantilla = {
            id_traslado: CreateTraslado.id_traslado,
            userAt: DATA.userAt,
            patente: DATA.patente_vehiculo,
            modelo: vehiculo.modelo_vehiculo,
            tipo: vehiculo.tipo_vehiculo,
            marca: vehiculo.marca_vehiculo,
            conductor: DATA.conductor,
            rutConductor: DATA.rutConductor,
            origen: DATA.nombreSucursalOrigen,
            destino: DATA.nombreSucursalDestino,
            observacion: DATA.observacion,
            fecha: fecha,
            hora: hora
        };
        
        const docDefinition = await actaTrasladoOrigenPlantilla(dataPlantilla);
        const pdfDocGenerator = pdfMake.createPdf(docDefinition);
        const pathFile = path.join(__dirname, `../${process.env.PATH_ACTA_TRASLADO_ORIGEN}/${nameFile}.pdf`)
        pdfDocGenerator.getBase64((base64) => {
            fs.writeFileSync(pathFile, base64, "base64", (err) => {
                return { success: false, msg: err }
            })
        });



        let TrasladoUpdate ={
            actaTrasladoOrigen:nameFile+".pdf"
        }

        const UpdateTraslado_ = await this._trasladoRepository.putUpdateEstado(CreateTraslado.id_traslado,TrasladoUpdate);






        return CreateTraslado;

    }

}

module.exports = SucursalBusiness;