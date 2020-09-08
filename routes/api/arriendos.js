const router = require("express").Router();

const {
    Arriendo,
    Cliente,
    Conductor,
    Empresa,
    Accesorio,
} = require("../../db");

router.post("/registrarArriendo", async(req, res) => {
    const response = req.body;

    const dataArriendo = {
        estado_arriendo: "PENDIENTE",
        kilometrosEntrada_arriendo: response.kilometrosEntrada_arriendo,
        kilometrosSalida_arriendo: null,
        ciudadEntrega_arriendo: response.ciudadEntrega_arriendo,
        fechaEntrega_arriendo: response.fechaEntrega_arriendo,
        ciudadRecepcion_arriendo: response.ciudadRecepcion_arriendo,
        fechaRecepcion_arriendo: response.fechaRecepcion_arriendo,
        numerosDias_arriendo: response.numerosDias_arriendo,
        tipo_arriendo: response.tipo_arriendo,
        patente_vehiculo: response.patente_vehiculo,
        rut_conductor: response.rut_conductor,
        rut_cliente: null,
        rut_empresa: null,
    };

    const dataCliente = {
        rut_cliente: response.rut_cliente,
        nombre_cliente: response.nombre_cliente,
        direccion_cliente: response.direccion_cliente,
        ciudad_cliente: response.ciudad_cliente,
        telefono_cliente: response.telefono_cliente,
        correo_cliente: response.correo_cliente,
        fechaNacimiento_cliente: response.fechaNacimiento_cliente == "" ?
            null :
            response.fechaNacimiento_cliente,
    };
    const dataEmpresa = {
        rut_empresa: response.rut_empresa,
        nombre_empresa: response.nombre_empresa,
        rol_empresa: response.rol_empresa,
        vigencia_empresa: response.vigencia_empresa,
        direccion_empresa: response.direccion_empresa,
        ciudad_empresa: response.ciudad_empresa,
        telefono_empresa: response.telefono_empresa,
        correo_empresa: response.correo_empresa,
    };

    const dataConductor = {
        rut_conductor: response.rut_conductor,
        nombre_conductor: response.nombre_conductor,
        telefono_conductor: response.telefono_conductor,
        clase_conductor: response.clase_conductor,
        numero_conductor: response.numero_conductor,
        municipalidad_conductor: response.municipalidad_conductor,
        direccion_conductor: response.direccion_conductor,
        vcto_conductor: response.vcto_conductor == "" ? null : response.vcto_conductor,
    };

    //se crean deacuerdo al tipo de arriendo
    switch (response.tipo_arriendo) {
        case "1":
            const cliente1 = await Cliente.findOne({
                where: { rut_cliente: response.rut_cliente },
            });
            //si no existe cliente lo crea , sino lo actualiza
            if (!cliente1) {
                await Cliente.create(dataCliente);
            } else {
                await Cliente.update(dataCliente, {
                    where: { rut_cliente: response.rut_cliente },
                });
            }
            //guardas las id en el objeto arriendo
            dataArriendo.rut_cliente = response.rut_cliente;
            break;
        case "2":
            const cliente2 = await Cliente.findOne({
                where: { rut_cliente: response.rut_cliente },
            });
            //si no existe cliente lo crea , sino lo actualiza
            if (!cliente2) {
                await Cliente.create(dataCliente);
            } else {
                await Cliente.update(dataCliente, {
                    where: { rut_cliente: response.rut_cliente },
                });
            }
            const empresa2 = await Empresa.findOne({
                where: { rut_empresa: response.rut_empresa },
            });
            //si no existe empresa lo crea , sino lo actualiza
            if (!empresa2) {
                await Empresa.create(dataEmpresa);
            } else {
                await Empresa.update(dataEmpresa, {
                    where: { rut_empresa: response.rut_empresa },
                });
            }
            //guardas las id en el objeto arriendo
            dataArriendo.rut_cliente = response.rut_cliente;
            dataArriendo.rut_empresa = response.rut_empresa;
            break;
        case "3":
            const empresa3 = await Empresa.findOne({
                where: { rut_empresa: response.rut_empresa },
            });
            //si no existe empresa lo crea , sino lo actualiza
            if (!empresa3) {
                await Empresa.create(dataEmpresa);
            } else {
                await Empresa.update(dataEmpresa, {
                    where: { rut_empresa: response.rut_empresa },
                });
            }
            //guardas las id en el objeto arriendo
            dataArriendo.rut_empresa = response.rut_empresa;
            break;
        default:
            res.json({
                success: false,
                msg: "algo salio mal",
            });
            break;
    }

    const conductor = await Conductor.findOne({
        where: { rut_conductor: response.rut_conductor },
    });
    //si no existe conductor lo crea , sino lo actualiza
    if (!conductor) {
        await Conductor.create(dataConductor);
    } else {
        await Conductor.update(dataConductor, {
            where: { rut_conductor: response.rut_conductor },
        });
    }

    //se crea el arriendo
    const arriendo = await Arriendo.create(dataArriendo);

    // en caso de querer crear un accesorio
    if (response.inputOtros != "") {
        const accesorio = await Accesorio.create({
            nombre_accesorio: response.inputOtros,
        });
        await arriendo.addAccesorios(accesorio);
    }

    res.json({
        success: true,
        msg: "registro exitoso",
        data: arriendo.id_arriendo,
    });
});

router.post("/registrarArriendoAccesorio", async(req, res) => {
    const { ArrayChecks, id_arriendo } = req.body;

    const arriendo = await Arriendo.findOne({
        where: { id_arriendo: id_arriendo },
    });

    for (let i = 0; i < ArrayChecks.length; i++) {
        const accesorio = await Accesorio.findOne({
            where: { id_accesorio: ArrayChecks[i] },
        });
        //se registra en la tabla arriendos-accesorios
        await arriendo.addAccesorios(accesorio);
    }

    res.json({
        success: true,
        msg: "registro exitoso",
    });
});

module.exports = router;