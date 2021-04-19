const sendError = require('../../helpers/sendError');

class SucursalController {

    constructor({ SucursalService }) {
        this._sucursalService = SucursalService;
    }


    async getSucursales(req, res) {
        try {
            const sucursales = await this._sucursalService.getSucursales();
            res.json({
                success: true,
                data: sucursales,
            });
        } catch (error) {
            sendError(error, req, res);
        }
    }

    async findSucursalById(req, res) {
        try {
            const { id } = req.params;
            const sucursal = await this._sucursalService.findSucursalById(id);
            res.json({ success: true, data: sucursal })
        } catch (error) {
            sendError(error, req, res);
        }
    }

    async createSucursal(req, res, next) {
        try {
            const sucursal = req.body;
            const sucursalCreate = await this._sucursalService.createSucursal(sucursal);
            res.json({ success: true, data: sucursalCreate })
            next();
        } catch (error) {
            sendError(error, req, res);;
        }
    }

    async updateSucursal(req, res, next) {
        try {
            const sucursal = req.body;
            const { id } = req.params;
            await this._sucursalService.updateSucursal(id, sucursal);
            res.json({ success: true, msg: "sucursal modificada" });
            next();
        } catch (error) {
            sendError(error, req, res);;
        }
    }

    async getFindArriendoBySucursal(req, res) {
        try {
            const sucursal = await this._sucursalService.getFindArriendoBySucursal();
            res.json({ success: true, data: sucursal })
        } catch (error) {
            sendError(error, req, res);;
        }
    }

    async getRegiones(req, res) {
        try {
            const regiones = await this._sucursalService.getRegiones();
            res.json({
                success: true,
                data: regiones
            })
        } catch (error) {
            sendError(error, req, res);
        }
    }

    async guardarFotosTrasladoOrigen(req, res) {
        try {

            const files = req.files;
            const { id } = req.params;
            const Fotos_ = await this._sucursalService.guardarFotosTrasladoOrigen(id,files);
            res.json({
                success: true,
                data: Fotos_
            })
        } catch (error) {
            sendError(error, req, res);
        }
    }

    async guardarFotosTrasladoDestino(req, res) {
        try {

            const files = req.files;
            const { id } = req.params;
            const Fotos_ = await this._sucursalService.guardarFotosTrasladoDestino(id,files);
            res.json({
                success: true,
                data: Fotos_
            })
        } catch (error) {
            sendError(error, req, res);
        }
    }



    



    async createTrasladoOrigen(req, res,next){
        try {
            const DATA = req.body;
            const Traslado = await this._sucursalService.createTrasladoOrigen(DATA);
            res.json({success: true,msg: "registro exitoso",data:Traslado});
            next();
        } catch (error) {
            sendError(error, req, res);
        }
    }


    async getTraslado(req,res){
        try {
            const {id} = req.params;

            const traslado = await  this._sucursalService.getTraslado(id);
            res.json({ success: true, data: traslado })
        } catch (error) {
            sendError(error, req, res);
        }
    }

    async deleteTraslado(req,res){
        try {
            const {id} = req.params;
            const deleteTraslado = await  this._sucursalService.deleteTraslado(id);
            res.json(deleteTraslado);
        } catch (error) {
            sendError(error, req, res);
        }
    }

    async getAllTraslado(req,res){
        try {
            const Traslados = await this._sucursalService.getAllTraslado();
            res.json({ success: true, data: Traslados });
        } catch (error) {
            sendError(error, req, res);
        }
    }

    async updateTrasladoEstado(req, res, next) {
        try {
            const { id } = req.params;
            const DATA = req.body;
            await this._sucursalService.updateTrasladoEstado(id, DATA);
            res.json({ success: true, msg: "traslado modificado" });
            next();
        } catch (error) {
            sendError(error, req, res);;
        }
    }


    


}

module.exports = SucursalController;

