var moment = require('moment');
const path = require("path");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");
const base64 = require("image-to-base64");
const pdfMake = require('pdfmake/build/pdfmake.js');
const pdfFonts = require('pdfmake/build/vfs_fonts.js');
const actaTrasladoOrigenPlantilla = require("../../../utils/pdf_plantillas/actaTrasladoOrigen");


class SucursalBusiness {

    constructor({ SucursalRepository, RegionRepository }) {
        this._sucursalRepository = SucursalRepository;
        this._regionRepository = RegionRepository;
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

    async createTrasladoOrigen(DATA){

        console.log("llegue el busiines");
        // let patente = DATA.patente;
        // let sucursalOrigen =DATA.sucursalOrigen;
        // let nombreSucursalOrigen=DATA.nombreSucursalOrigen;
        // let sucursalDestino = DATA.sucursalDestino;
        // let nombreSucursalDestino = DATA.nombreSucursalDestino;
        // let conductor = DATA.conductor;
        // let rutConductor = DATA.rutConductor;
        // let arrayimagenesOrigen = DATA.arrayimagenesOrigen;

        var now = moment();
        var hora=moment().format('HH:mm:ss');
        var fecha=moment().format('MMM-DD-YYYY');

        console.log(now);
        let arrayJson={
            "patente" :DATA.patente,
            "sucursalOrigen" : DATA.sucursalOrigen,
            "nombreSucursalOrigen" : DATA.nombreSucursalOrigen,
            "sucursalDestino" : DATA.sucursalOrigen,
            "nombreSucursalDestino" : DATA.nombreSucursalDestino,
            "conductor" : DATA.conductor,
            "rutConductor" : DATA.rutConductor,
            "estado" : "EN CAMINO",
            "arrayimagenesOrigen":DATA.arrayimagenesOrigen,
            "arrayimagenesDestino" : null,
            "actaTrasladoOrigen": null, 
            "actaTrasladoDestino":null,
            "fechaTrasladoOrigen":now,
            
            "fechaTrasladoDestino":null,
            "userAt" :DATA.userAt,
        };

        const dataPlantilla = {
            userAt: DATA.userAt,
            fecha: fecha,
            hora: hora
        };

        const sucursal = await this._sucursalRepository.getFindOne(DATA.sucursalOrigen);
        console.log(sucursal);
        
        const docDefinition = await actaTrasladoOrigenPlantilla(dataPlantilla);
        const nameFile = uuidv4();
        const pdfDocGenerator = pdfMake.createPdf(docDefinition);
        const pathFile = path.join(__dirname, `../${process.env.PATH_ACTA_TRASLADO_ORIGEN}/${nameFile}.pdf`)
        pdfDocGenerator.getBase64((base64) => {
            fs.writeFileSync(pathFile, base64, "base64", (err) => {
                return { success: false, msg: err }
            })
        });

         const data = { ActaTrasladoOrigen: `${nameFile}.pdf` };

        console.log(arrayJson);
        console.log(data);
    }

}

module.exports = SucursalBusiness;