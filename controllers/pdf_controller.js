const pdf = require("html-pdf");
const fs = require("fs");
const tj = require("templatesjs");

class PDFController {
  async createContratoArriendoPDF(req, res) {
    //se cactura el file html
    const html = await fs.readFileSync(
      require.resolve("../uploads/plantillas/contrato_arriendo.html"),
      "utf8"
    );

    //HTML se tranforma a template
    tj.setSync(html);
    //variables
    const list = {
      username: "diego rios rios",
      carrera: "ingenieria en informatica",
    };

    //se agregan las variables
    const dataHTML = await tj.renderAllSync(list);

    //tranformar a pdf
    const options = { format: "Letter" };
    await pdf
      .create(dataHTML, options)
      .toFile("./uploads/documentos/contratoArriendo.pdf", (err, res) => {
        if (err) {
          console.log(err);
        } else {
          console.log(res);
        }
      });

    res.json(dataHTML);

    /*res.write(dataHTML);
    res.end(); */
  }
}

module.exports = PDFController;
