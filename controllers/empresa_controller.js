const { Empresa } = require("../db");

class EmpresaController {
  async getEmpresas(req, res) {
    const empresas = await Empresa.findAll({
      attributes: [
        "rut_empresa",
        "nombre_empresa",
        "rol_empresa",
        "correo_empresa",
      ],
    });
    res.json({
      success: true,
      data: empresas,
    });
  }

  async findEmpresa(req, res) {
    const empresa = await Empresa.findByPk(req.params.id);

    if (empresa) {
      res.json({
        success: true,
        data: empresa,
      });
    } else {
      res.json({
        success: false,
        msg: "sin datos",
      });
    }
  }
}

module.exports = EmpresaController;
