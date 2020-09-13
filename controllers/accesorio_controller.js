const { Accesorio } = require("../db");

class AccesorioController {
  async getAccesorios(req, res) {
    const accesorio = await Accesorio.findAll();
    res.json({
      success: true,
      data: accesorio,
    });
  }
}

module.exports = AccesorioController;
