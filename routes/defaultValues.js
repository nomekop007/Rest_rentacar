const router = require("express").Router();
const bcrypt = require("bcryptjs");

const { Usuario, Rol, Sucursal, Vehiculo } = require("../db");

router.get("/", async(req, res) => {
    const sucursales = [
        { nombre_sucursal: "TALCA" },
        { nombre_sucursal: "LINARES" },
        { nombre_sucursal: "CURICO" },
    ];

    const roles = [
        { nombre_rol: "ADMINISTRADOR" },
        { nombre_rol: "SUPERVISOR" },
        { nombre_rol: "VENDEDOR" },
    ];

    const sucursalTalca = await Sucursal.create(sucursales[0]);
    const sucursalLinares = await Sucursal.create(sucursales[1]);
    const sucursalCurico = await Sucursal.create(sucursales[2]);

    const rolAdministrador = await Rol.create(roles[0]);
    const rolSupervisor = await Rol.create(roles[1]);
    const rolVendedor = await Rol.create(roles[2]);

    const userAdmin = {
        id_rol: rolAdministrador.id_rol,
        id_sucursal: sucursalTalca.id_sucursal,
        nombre_usuario: "Administrador de sistemas",
        clave_usuario: "admin123",
        email_usuario: "admin@grupofirma.cl",
    };

    //encripta la password
    userAdmin.clave_usuario = bcrypt.hashSync(userAdmin.clave_usuario, 10);
    //crea usuario
    const usuario = await Usuario.create(userAdmin);
    res.json({
        success: true,
        msg: "Valores creados correctamente!",
        dataDefault: {
            roles: [
                rolAdministrador.nombre_rol,
                rolSupervisor.nombre_rol,
                rolVendedor.nombre_rol,
            ],
            sucursales: [
                sucursalTalca.nombre_sucursal,
                sucursalLinares.nombre_sucursal,
                sucursalCurico.nombre_sucursal,
            ],
            usuarios: {
                nombre: usuario.nombre_usuario,
            },
        },
    });
});

router.get("/vehiculos", async(req, res) => {
    const vehiculos = [{
            patente_vehiculo: "KKK-FF3",
            modelo_vehiculo: "toyota",
            tipo_vehiculo: "automovil",
            color_vehiculo: "verde",
            precio_vehiculo: 1500000,
            propietario_vehiculo: "Tomas Rojas",
            compra_vehiculo: "Automotora X",
            fechaCompra_vehiculo: "2020-08-03",
            año_vehiculo: 2019,
            id_sucursal: 1,
        },
        {
            patente_vehiculo: "F5ZK-F3",
            modelo_vehiculo: "toyota",
            tipo_vehiculo: "camioneta",
            color_vehiculo: "Rojo",
            precio_vehiculo: 1900000,
            propietario_vehiculo: "Diego Rojas",
            compra_vehiculo: "Automotora X",
            fechaCompra_vehiculo: "2020-08-03",
            año_vehiculo: 2001,
            id_sucursal: 2,
        },
        {
            patente_vehiculo: "ZJJ-FF",
            modelo_vehiculo: "toyota",
            tipo_vehiculo: "vehiculo",
            color_vehiculo: "Amarillo",
            precio_vehiculo: 2000000,
            propietario_vehiculo: "Tomas Rojas",
            compra_vehiculo: "Automotora X",
            fechaCompra_vehiculo: "2020-08-03",
            año_vehiculo: 2020,
            id_sucursal: 1,
        },
        {
            patente_vehiculo: "ZLMK-DD",
            modelo_vehiculo: "toyota",
            tipo_vehiculo: "fulgor",
            color_vehiculo: "Amarillo",
            precio_vehiculo: 1700000,
            propietario_vehiculo: "Diego Rojas",
            compra_vehiculo: "Automotora X",
            fechaCompra_vehiculo: "2020-08-03",
            año_vehiculo: 1997,
            id_sucursal: 3,
        },
    ];

    const vehiculo1 = await Vehiculo.create(vehiculos[0]);
    const vehiculo2 = await Vehiculo.create(vehiculos[1]);
    const vehiculo3 = await Vehiculo.create(vehiculos[2]);
    const vehiculo4 = await Vehiculo.create(vehiculos[3]);

    res.json({
        success: true,
        msg: "Vehiculos creados  correctamente!",
    });
});

module.exports = router;