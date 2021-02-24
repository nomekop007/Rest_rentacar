class PagoAccesorioController {

    constructor({ PagoAccesorioRepository, sendError }) {
        this._servicioPagoAccesorio = PagoAccesorioRepository;
        this.sendError = sendError;
    }


    async createPagoAccesorios(req, res, next) {
        try {
            const response = req.body;
            for (let i = 0; i < response.matrizAccesorios[0].length; i++) {
                const id_accesorio = response.matrizAccesorios[0][i];
                const precioVenta = response.matrizAccesorios[1][i];
                const data = {
                    precioVenta_pagoAccesorio: Number(precioVenta),
                    id_accesorio: id_accesorio,
                    id_pagoArriendo: response.id_pagoArriendo,
                    userAt: response.userAt,
                };
                await this._servicioPagoAccesorio.postCreate(data);
            }
            res.json({
                success: true,
                msg: "registro exitoso",
            });
            next();
        } catch (error) {
            this.sendError(error, req, res);
        }
    }


}

module.exports = PagoAccesorioController;