const {
  Usuario,
  Arriendo,
  Cliente,
  Conductor,
  Empresa,
  Accesorio,
  Vehiculo,
} = require("../db");

class ArriendoController {
  async getArriendos(req, res) {
    const arriendos = await Arriendo.findAll({
      include: [{ model: Usuario, attributes: ["nombre_usuario"] }],
      attributes: [
        "id_arriendo",
        "createdAt",
        "tipo_arriendo",
        "estado_arriendo",
      ],
    });

    res.json({
      success: true,
      data: arriendos,
    });
  }

  async findArriendo(req, res) {
    const arriendo = await Arriendo.findAll({
      where: { id_arriendo: req.params.id },
      include: [
        { model: Cliente, attributes: ["nombre_cliente"] },
        { model: Empresa, attributes: ["nombre_empresa"] },
        { model: Vehiculo, attributes: ["patente_vehiculo"] },
        {
          model: Accesorio,
          attributes: ["nombre_accesorio", "precio_accesorio"],
        },
      ],
      attributes: ["id_arriendo", "tipo_arriendo", "numerosDias_arriendo"],
    });

    if (arriendo) {
      res.json({
        success: true,
        data: arriendo,
      });
    } else {
      res.json({
        success: false,
        msg: "sin datos",
      });
    }
  }

  async createArriendo(req, res) {
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
      id_sucursal: response.id_sucursal,
      patente_vehiculo: response.patente_vehiculo,
      rut_conductor: response.rut_conductor,
      id_usuario: response.id_usuario,
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
      fechaNacimiento_cliente:
        response.fechaNacimiento_cliente == ""
          ? null
          : response.fechaNacimiento_cliente,
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
      vcto_conductor:
        response.vcto_conductor == "" ? null : response.vcto_conductor,
    };

    //se crean deacuerdo al tipo de arriendo
    switch (response.tipo_arriendo) {
      case "1":
        const [cliente, created] = await Cliente.findOrCreate({
          where: { rut_cliente: response.rut_cliente },
          defaults: dataCliente,
        });
        if (!created) {
          await Cliente.update(dataCliente, {
            where: { rut_cliente: cliente.rut_cliente },
          });
        }
        //guardas las id en el objeto arriendo
        dataArriendo.rut_cliente = cliente.rut_cliente;
        dataArriendo.tipo_arriendo = "PARTICULAR";
        break;
      case "2":
        const [cliente2, created2c] = await Cliente.findOrCreate({
          where: { rut_cliente: response.rut_cliente },
          defaults: dataCliente,
        });
        const [empresa2, created2e] = await Empresa.findOrCreate({
          where: { rut_empresa: response.rut_empresa },
          defaults: dataEmpresa,
        });

        if (!created2c) {
          await Cliente.update(dataCliente, {
            where: { rut_cliente: cliente2.rut_cliente },
          });
        }
        if (!created2e) {
          await Empresa.update(dataEmpresa, {
            where: { rut_empresa: empresa2.rut_empresa },
          });
        }
        //guardas las id en el objeto arriendo
        dataArriendo.rut_cliente = cliente2.rut_cliente;
        dataArriendo.rut_empresa = empresa2.rut_empresa;
        dataArriendo.tipo_arriendo = "REMPLAZO";
        break;
      case "3":
        const [empresa3, created3e] = await Empresa.findOrCreate({
          where: { rut_empresa: response.rut_empresa },
          defaults: dataEmpresa,
        });
        if (!created3e) {
          await Empresa.update(dataEmpresa, {
            where: { rut_empresa: empresa3.rut_empresa },
          });
        }

        //guardas las id en el objeto arriendo
        dataArriendo.rut_empresa = empresa3.rut_empresa;
        dataArriendo.tipo_arriendo = "EMPRESA";
        break;
      default:
        res.json({
          success: false,
          msg: "algo salio mal",
        });
        break;
    }

    const [conductor, createdZ] = await Conductor.findOrCreate({
      where: { rut_conductor: response.rut_conductor },
      defaults: dataConductor,
    });
    //si existe conductor lo actualiza
    if (!createdZ) {
      await Conductor.update(dataConductor, {
        where: { rut_conductor: conductor.rut_conductor },
      });
    }

    //se crea el arriendo
    const a = await Arriendo.create(dataArriendo);

    const arriendo = await Arriendo.findAll({
      include: [{ model: Usuario, attributes: ["nombre_usuario"] }],
      where: { id_arriendo: a.id_arriendo },
      attributes: [
        "id_arriendo",
        "createdAt",
        "tipo_arriendo",
        "estado_arriendo",
      ],
    });

    // en caso de querer crear un accesorio
    if (response.inputOtros != "") {
      const accesorio = await Accesorio.create({
        nombre_accesorio: response.inputOtros,
      });
      //se registra en la tabla arriendos-accesorios
      await a.addAccesorios(accesorio);
    }

    res.json({
      success: true,
      msg: "registro exitoso",
      data: arriendo,
    });
  }

  async createArriendoAccesorio(req, res) {
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
  }
}

module.exports = ArriendoController;