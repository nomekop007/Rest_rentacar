const router = require("express").Router();
const { sendError, } = require("../helpers/components");
const { Arriendo, Sucursal, Usuario, Cliente, Empresa, Vehiculo, PagoArriendo, PagoAccesorio, Pago, Facturacion, ModoPago, EmpresaRemplazo, Requisito, Remplazo, Contrato } = require("../database/db");


router.get("/mostrarArriendoFinanzas", async (req, res) => {
    try {
        const arriendos = await Arriendo.findAll({
            include: [
                { model: Usuario, attributes: ["nombre_usuario"] },
                { model: Sucursal },
                { model: Vehiculo },
                { model: Cliente },
                { model: Empresa },
                { model: Requisito },
                {
                    model: Remplazo,
                    include: [{ model: EmpresaRemplazo }, { model: Cliente }],
                },
                {
                    model: PagoArriendo,
                    include: [
                        { model: Contrato },
                        { model: PagoAccesorio },
                        {
                            model: Pago,
                            include: [
                                {
                                    model: Facturacion,
                                    include: [
                                        { model: ModoPago }],
                                }],
                        }],
                },

            ],
        });

        res.json({
            success: true,
            data: arriendos,
        });
    } catch (error) {
        sendError(error, res);
    }
});

module.exports = router;