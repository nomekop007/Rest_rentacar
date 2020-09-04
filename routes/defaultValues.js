const router = require("express").Router();
const bcrypt = require("bcryptjs");

const { Usuario, Rol, Sucursal } = require("../db");

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

module.exports = router;