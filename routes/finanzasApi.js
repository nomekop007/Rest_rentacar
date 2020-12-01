const router = require("express").Router();
const { sendError } = require("../helpers/components");
const path = require("path");
const { Arriendo, Conductor, Garantia, Despacho, ActaEntrega, Accesorio, Requisito, Sucursal, Usuario, Cliente, Empresa, Vehiculo, PagoArriendo, PagoAccesorio, Pago, Facturacion, ModoPago, EmpresaRemplazo, Remplazo, Contrato, Contacto } = require("../database/db");


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
                        { model: PagoAccesorio, include: [{ model: Accesorio }] },
                        {
                            model: Pago,
                            include: [{
                                model: Facturacion,
                                include: [
                                    { model: ModoPago }
                                ],
                            }],
                        }
                    ],
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


router.get("/buscarArriendoFinanzas/:id", async (req, res) => {
    try {
        const arriendo = await Arriendo.findOne({
            where: { id_arriendo: req.params.id },
            include: [
                { model: Conductor },
                { model: Requisito },
                { model: Garantia },
                { model: Sucursal },
                { model: Contrato },
                { model: Despacho, include: [{ model: ActaEntrega }] },
                { model: Vehiculo },
                { model: Usuario, attributes: ["nombre_usuario"] },
                { model: Cliente },
                { model: Contacto },
                { model: Empresa },
                { model: Remplazo, include: [{ model: Cliente }, { model: EmpresaRemplazo }], },
                {
                    model: PagoArriendo,
                    include: [
                        { model: Contrato },
                        { model: PagoAccesorio, include: [{ model: Accesorio }] },
                        {
                            model: Pago,
                            include: [{
                                model: Facturacion,
                                include: [
                                    { model: ModoPago }
                                ],
                            }],
                        }
                    ],
                },
            ],
        });
        if (arriendo) {
            res.json({
                success: true,
                data: arriendo,
            });
        } else {
            res.json({
                success: false,
                msg: "error: " + "arriendo no encontrado",
            });
        }
    } catch (error) {
        sendError(error, res);
    }
});


router.post("/buscarDocumentosArriendoFinanzas/", async (req, res) => {
    try {
        const { documento, tipo } = req.body;

        switch (tipo) {
            case "contrato":
                paths = path.join(__dirname, `${process.env.PATH_CONTRATO}/${documento}`);
                break;
            case "acta":
                paths = path.join(__dirname, `${process.env.PATH_ACTA_ENTREGA}/${documento}`);
                break;
            case "requisito":
                paths = path.join(__dirname, `${process.env.PATH_REQUISITO_ARRIENDO}/${documento}`);
                break;
            case "facturacion":
                paths = path.join(__dirname, `${process.env.PATH_FACTURACIONES}/${documento}`);
                break;
            case "recepcion":
                paths = path.join(__dirname, `${process.env.PATH_RECEPCIONES}/${documento}`);
                break;
            case "fotosDañoVehiculo":
                paths = path.join(__dirname, `${process.env.PATH_DANIO_VEHICULO}/${documento}`);
                break;
            case "fotoVehiculo":
                paths = path.join(__dirname, `${process.env.PATH_FOTO_VEHICULO}/${documento}`);
                break;
            default:
                res.json({
                    success: false,
                    msg: "tipo no encontrado"
                });
                return;
        }

        res.json({
            success: true,
            data: {
                nombre: documento,
                tipo: tipo,
                paths: paths
            },
        });

    } catch (error) {
        sendError(error, res);
    }


});




module.exports = router;