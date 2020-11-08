const {
  Usuario,
  Arriendo,
  Cliente,
  Conductor,
  Empresa,
  Accesorio,
  Vehiculo,
  Sucursal,
  Contrato,
  Remplazo,
  Garantia,
  Pago,
  ModoPago,
  PagoAccesorio,
  Facturacion,
} = require("../database/db");
const { sendError, fontsPDF } = require("../helpers/components");
const fs = require("fs");
const path = require("path");
const { v5: uuidv5 } = require("uuid");
const nodemailer = require("nodemailer");
const logo = require.resolve("../utils/images/logo2.png");
const base64 = require("image-to-base64");
const PdfPrinter = require("pdfmake");
const contratoPlantilla = require("../utils/pdf_plantillas/contratoArriendo");

class contrato_controller {
  async createContrato(req, res) {
    try {
      const response = req.body;
      const contrato = await Contrato.create(response);
      res.json({
        success: true,
        data: contrato,
      });
    } catch (error) {
      sendError(error, res);
    }
  }

  async generatePDFContrato(req, res) {
    try {
      const response = req.body;
      const arriendo = await Arriendo.findOne({
        where: { id_arriendo: response.id_arriendo },
        include: [
          { model: Cliente },
          { model: Empresa },
          { model: Vehiculo },
          { model: Accesorio },
          { model: Conductor },
          { model: Sucursal },
          {
            model: Pago,
            include: [
              {
                model: Facturacion,
                include: {
                  model: ModoPago,
                },
              },
              { model: PagoAccesorio },
            ],
          },
          {
            model: Remplazo,
            include: [{ model: Cliente }],
          },
          {
            model: Garantia,
            include: [{ model: ModoPago }],
          },
          { model: Usuario, attributes: ["nombre_usuario"] },
        ],
      });

      response.arriendo = arriendo;
      //se genera el documento
      const docDefinition = await contratoPlantilla(response);

      const nameFile = uuidv5(
        "contrato-" + arriendo.fechaEntrega_arriendo + arriendo.id_arriendo,
        uuidv5.URL
      );
      const printer = new PdfPrinter(fontsPDF);
      const pdfDoc = printer.createPdfKitDocument(docDefinition);

      //se guarda el pdf en una ruta predeterminada
      pdfDoc.pipe(
        fs.createWriteStream(
          path.join(
            __dirname,
            "../uploads/documentos/contratos/" + nameFile + ".pdf"
          )
        )
      );
      pdfDoc.end();

      setTimeout(() => {
        res.json({
          success: true,
          data: {
            nombre_documento: nameFile,
            firma: response.firmaPNG,
          },
        });
      }, 2000);
    } catch (error) {
      sendError(error, res);
    }
  }

  async sendEmailContrato(req, res) {
    try {
      const response = req.body;
      const arriendo = await Arriendo.findOne({
        where: { id_arriendo: response.id_arriendo },
        include: [
          { model: Cliente, attributes: ["correo_cliente", "nombre_cliente"] },
          { model: Empresa, attributes: ["correo_empresa", "nombre_empresa"] },
          { model: Contrato },
          {
            model: Remplazo,
            include: [{ model: Cliente }],
          },
        ],
      });
      const client = {};
      switch (arriendo.tipo_arriendo) {
        case "PARTICULAR":
          client.name = arriendo.cliente.nombre_cliente;
          client.correo = arriendo.cliente.correo_cliente;
          break;
        case "REMPLAZO":
          client.name = arriendo.remplazo.cliente.nombre_cliente;
          client.correo = arriendo.remplazo.cliente.correo_cliente;
          break;
        case "EMPRESA":
          client.name = arriendo.empresa.nombre_empresa;
          client.correo = arriendo.empresa.correo_empresa;
          break;
      }

      //datos del email hosting
      const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        secure: false,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
        tls: {
          rejectUnauthorized: false,
        },
      });

      //datos del mensaje y su destinatario
      const mailOptions = {
        from: "'Rent A Car - Grupo Firma' <api.rentacarmaule@grupofirma.cl>",
        to: client.correo,
        subject: "COPIA DE CONTRATO RENT A CAR",
        text: "Se adjunta copia del contrato Rent a Car",
        html: `
                <p>Sr.(a) ${client.name}:</p>
                <p>Por este medio envio su copia del contrato de arriendo de Rent a Car.</p>
                <br><br>
                <p>------------------------------------------------------------------------------------------------------------------------------</p>
                <p>Atentamente, Rent a Car Maule Ltda. </p>
                <img src="data:image/jpeg;base64,${await base64(
                  logo
                )}" width="200" height="50"  />
                `,
        attachments: [
          {
            filename: "CONSTRATO.pdf",
            contentType: "pdf",
            path: path.join(
              __dirname,
              "../uploads/documentos/contratos/" +
                arriendo.contratos[0].documento +
                ".pdf"
            ),
          },
        ],
      };
      const resp = await transporter.sendMail(mailOptions);
      res.json({
        success: true,
        msg: resp,
      });
    } catch (error) {
      sendError(error, res);
    }
  }
}

module.exports = contrato_controller;
