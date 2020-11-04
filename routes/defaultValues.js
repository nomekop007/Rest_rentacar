const router = require("express").Router();
const bcrypt = require("bcryptjs");
const xlsx = require("xlsx");
const plantillaExel = require.resolve("../utils/vehiculos.xlsx");

const {
    Usuario,
    Rol,
    Sucursal,
    Accesorio,
    ModoPago,
    Propietario,
    Vehiculo,
} = require("../database/db");

router.get("/", async(req, res) => {
    try {
        const sucursales = [
            { id_sucursal: 1, nombre_sucursal: "TALCA", userAt: "default" },
            { id_sucursal: 2, nombre_sucursal: "LINARES", userAt: "default" },
            { id_sucursal: 3, nombre_sucursal: "CURICO", userAt: "default" },
            { id_sucursal: 4, nombre_sucursal: "CONCEPCION", userAt: "default" },
        ];

        const roles = [
            { id_rol: 1, nombre_rol: "ADMINISTRADOR", userAt: "default" },
            { id_rol: 2, nombre_rol: "SUPERVISOR", userAt: "default" },
            { id_rol: 3, nombre_rol: "VENDEDOR", userAt: "default" },
        ];

        const propietarios = [{
                nombre_propietario: "Teresa Garrido Rojas E hijos Limitada",
                rut_propietario: "76.791.832-1",
                userAt: "default",
            },
            {
                nombre_propietario: "Hostal Plaza Maule Ltda",
                rut_propietario: "76.849.793-1",
                userAt: "default",
            },
            {
                nombre_propietario: "Sociedad Garrido Vargas",
                rut_propietario: "76.971.509-6",
                userAt: "default",
            },
            {
                nombre_propietario: "Miguel Vargas Espinoza",
                rut_propietario: "8.781.641-9",
                userAt: "default",
            },
            {
                nombre_propietario: "Miguel Vargas Garrido",
                rut_propietario: "17.886.328-2",
                userAt: "default",
            },
            {
                nombre_propietario: "Solanch Tejos Carrasco",
                rut_propietario: "19.105.142-4",
                userAt: "default",
            },
        ];

        const accesorios = [
            { id_accesorio: 1, nombre_accesorio: "TRASLADO", userAt: "default" },
            { id_accesorio: 2, nombre_accesorio: "DEDUCIBLE", userAt: "default" },
            { id_accesorio: 3, nombre_accesorio: "BENCINA", userAt: "default" },
            { id_accesorio: 4, nombre_accesorio: "ENGANCHE", userAt: "default" },
            {
                id_accesorio: 5,
                nombre_accesorio: "SILLA PARA BEBE",
                userAt: "default",
            },
            { id_accesorio: 6, nombre_accesorio: "PASE DIARIO", userAt: "default" },
            {
                id_accesorio: 7,
                nombre_accesorio: "RASTREO SATELITAL",
                userAt: "default",
            },
        ];

        const modoPagos = [
            { id_modoPago: 1, nombre_modoPago: "EFECTIVO", userAt: "default" },
            { id_modoPago: 2, nombre_modoPago: "CHEQUE", userAt: "default" },
            { id_modoPago: 3, nombre_modoPago: "TARJETA", userAt: "default" },
        ];

        for (let i = 0; i < sucursales.length; i++) {
            await Sucursal.create(sucursales[i]);
        }
        for (let i = 0; i < roles.length; i++) {
            await Rol.create(roles[i]);
        }
        for (let i = 0; i < propietarios.length; i++) {
            await Propietario.create(propietarios[i]);
        }
        for (let i = 0; i < accesorios.length; i++) {
            await Accesorio.create(accesorios[i]);
        }
        for (let i = 0; i < modoPagos.length; i++) {
            await ModoPago.create(modoPagos[i]);
        }

        const userAdmin = {
            id_usuario: 1,
            id_rol: process.env.USER_ROL,
            id_sucursal: process.env.USER_SUCURSAL,
            nombre_usuario: process.env.USER_NAME,
            email_usuario: process.env.USER_GMAIL,
            estado_usuario: process.env.USER_STATE,
            clave_usuario: bcrypt.hashSync(
                process.env.USER_PASSWORD,
                Number(process.env.NUM_BCRYPT)
            ),
            userAt: "default",
        };
        await Usuario.create(userAdmin);

        res.json({
            success: true,
            msg: "Valores creados correctamente exitosamente!",
        });
    } catch (error) {
        res.json({
            success: false,
            msg: "error: " + error,
        });
    }
});

router.get("/cargarVehiculos", async(req, res) => {
    try {
        //carga los vehiculos de un exel
        const excel = xlsx.readFile(plantillaExel);
        let nombreHoja = excel.SheetNames;
        let datos = xlsx.utils.sheet_to_json(excel.Sheets[nombreHoja[0]]);

        const vehiculos = [];
        //se corrigen las fechas
        for (let i = 0; i < datos.length; i++) {
            const dato = datos[i];
            vehiculos.push({
                ...dato,
                fechaCompra: new Date((dato.fechaCompra - (25567 + 2)) * 86400 * 1000),
            });
        }

        function getRandomInt(min, max) {
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }

        // se guarda los vehiculos en la base de datos
        for (let i = 0; i < vehiculos.length; i++) {
            let vehiculo = {
                rut_propietario: vehiculos[i].rut_propietario,
                patente_vehiculo: vehiculos[i].patente,
                marca_vehiculo: vehiculos[i].marca,
                modelo_vehiculo: vehiculos[i].modelo,
                año_vehiculo: vehiculos[i].edad,
                color_vehiculo: vehiculos[i].color,
                tipo_vehiculo: vehiculos[i].tipo,
                compra_vehiculo: vehiculos[i].compra,
                fechaCompra_vehiculo: vehiculos[i].fechaCompra,
                estado_vehiculo: "DISPONIBLE",
                kilometraje_vehiculo: 0,
                id_sucursal: 1,
                userAt: "default",
            };
            console.log(vehiculo);
            await Vehiculo.create(vehiculo);
        }

        res.json({
            success: true,
            msg: "vehiculos creados exitosamente",
        });
    } catch (error) {
        res.json({
            success: false,
            msg: "error: " + error,
        });
    }
});

module.exports = router;