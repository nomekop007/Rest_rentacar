const { Remplazo } = require("../db");

class RemplazoController {
  async createRemplazo(req, res) {
    try {
      const response = req.body;
      const remplazo = await Remplazo.create(response);
      res.json({
        success: true,
        id_remplazo: remplazo.id_remplazo,
      });
    } catch (error) {
      res.json({
        success: false,
        msg: "error: " + error,
      });
    }
  }
}

module.exports = RemplazoController;
