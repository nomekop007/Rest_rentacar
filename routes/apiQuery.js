const router = require("express").Router();
const { sendError, } = require("../helpers/components");
const { Arriendo, Requisito, Sucursal, Usuario, Cliente, Empresa, Vehiculo, PagoArriendo, PagoAccesorio, Pago, Facturacion, ModoPago, EmpresaRemplazo, Remplazo, Contrato } = require("../database/db");


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


router.get("/buscarRequisitoArriendoFinanzas/:id", async (req, res) => {
    try {

        const requisito = await Requisito.findOne({
            where: { id_arriendo: req.params.id }
        });

        const paths = {};

        if (requisito.carnetFrontal_requisito) {
            paths.carnetFrontal = path.join(__dirname, `../uploads/documentos/requisitosArriendo/${requisito.carnetFrontal_requisito}`);
        }
        if (requisito.carnetTrasera_requisito) {
            paths.carnetTrasera = path.join(__dirname, `../uploads/documentos/requisitosArriendo/${requisito.carnetTrasera_requisito}`);
        }
        if (requisito.licenciaConducirFrontal_requisito) {
            paths.licenciaConducirFrontal = path.join(__dirname, `../uploads/documentos/requisitosArriendo/${requisito.licenciaConducirFrontal_requisito}`);
        }
        if (requisito.licenciaConducirTrasera_requisito) {
            paths.licenciaConducirTrasera = path.join(__dirname, `../uploads/documentos/requisitosArriendo/${requisito.licenciaConducirTrasera_requisito}`);
        }
        if (requisito.tarjetaCredito_requisito) {
            paths.tarjetaCredito = path.join(__dirname, `../uploads/documentos/requisitosArriendo/${requisito.tarjetaCredito_requisito}`);
        }
        if (requisito.chequeGarantia_requisito) {
            paths.chequeGarantia = path.join(__dirname, `../uploads/documentos/requisitosArriendo/${requisito.chequeGarantia_requisito}`);
        }

        if (requisito.comprobanteDomicilio_requisito) {
            paths.comprobanteDomicilio = path.join(__dirname, `../uploads/documentos/requisitosArriendo/${requisito.comprobanteDomicilio_requisito}`);
        }

        if (requisito.cartaRemplazo_requisito) {
            paths.cartaRemplazo = path.join(__dirname, `../uploads/documentos/requisitosArriendo/${requisito.cartaRemplazo_requisito}`);

        }
        if (requisito.boletaEfectivo_requisito) {
            paths.boletaEfectivo = path.join(__dirname, `../uploads/documentos/requisitosArriendo/${requisito.boletaEfectivo_requisito}`);
        }


        res.json({
            success: true,
            data: {
                requisito: requisito,
                paths: paths
            },
        });
    } catch (error) {
        sendError(error, res);
    }
}
)


module.exports = router;