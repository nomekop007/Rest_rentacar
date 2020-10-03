const router = require("express").Router();
const bcrypt = require("bcryptjs");

const { Usuario, Rol, Sucursal, Accesorio, ModoPago } = require("../db");

router.get("/", async (req, res) => {
  const sucursales = [
    { nombre_sucursal: "TALCA" },
    { nombre_sucursal: "LINARES" },
    { nombre_sucursal: "CURICO" },
    { nombre_sucursal: "CONCEPCION" },
  ];

  const roles = [
    { nombre_rol: "ADMINISTRADOR" },
    { nombre_rol: "SUPERVISOR" },
    { nombre_rol: "VENDEDOR" },
  ];

  const accesorios = [
    { nombre_accesorio: "TRASLADO" },
    { nombre_accesorio: "DEDUCIBLE" },
    { nombre_accesorio: "BENCINA" },
    { nombre_accesorio: "ENGANCHE" },
    { nombre_accesorio: "SILLA PARA BEBE" },
    { nombre_accesorio: "PASE DIARIO" },
    { nombre_accesorio: "RASTREO SATELITAL" },
  ];

  const modoPagos = [
    { nombre_modoPago: "EFECTIVO" },
    { nombre_modoPago: "CHEQUE" },
    { nombre_modoPago: "TARJETA" },
  ];

  for (let i = 0; i < sucursales.length; i++) {
    await Sucursal.create(sucursales[i]);
  }
  for (let i = 0; i < roles.length; i++) {
    await Rol.create(roles[i]);
  }
  for (let i = 0; i < accesorios.length; i++) {
    await Accesorio.create(accesorios[i]);
  }
  for (let i = 0; i < modoPagos.length; i++) {
    await ModoPago.create(modoPagos[i]);
  }

  const userAdmin = {
    id_rol: process.env.USER_ROL,
    id_sucursal: process.env.USER_SUCURSAL,
    nombre_usuario: process.env.USER_NAME,
    email_usuario: process.env.USER_GMAIL,
    estado_usuario: process.env.USER_STATE,
    clave_usuario: await bcrypt.hashSync(
      process.env.USER_PASSWORD,
      Number(process.env.NUM_BCRYPT)
    ),
  };

  userAdmin.clave_usuario = await Usuario.create(userAdmin);

  res.json({
    success: true,
    msg: "Valores creados correctamente exitosamente!",
  });
});

module.exports = router;
