const { LogError } = require("../database/db");
const base64 = require("image-to-base64");
const logo = require.resolve("../utils/images/logo2.png");
const nodemailer = require("nodemailer");


const logRegisterError = async (req, error) => {
    try {
        const logError = await LogError.create({
            userAt_logError: req.body.userAt,
            body_logError: `
            body: ${JSON.stringify(req.body)} 
            params: ${JSON.stringify(req.params)}
            `,
            msg_logError: "" + error,
            accion_logError: req.originalUrl,
        });
        const nodemailerTransporter = nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port: process.env.EMAIL_PORT,
            secure: false,
            auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
            tls: { rejectUnauthorized: false },
        });
        await nodemailerTransporter.sendMail({
            from: "'Error Api Rest Rentacar - Grupo Firma' <api.rentacarmaule@grupofirma.cl>",
            to: 'api.rentacarmaule@grupofirma.cl',
            subject: `${logError.accion_logError}`,
            text: "Se alerta de error del en la api rest rentacar",
            html: `
             <br>
             <h4>Accion: ${logError.accion_logError}</h4>
             <h5>: ${logError.body_logError}</h5>
             <h5>mensaje : ${logError.msg_logError}</h5>
             <h6>registrado : ${new Date(logError.createdAt)}</h6>
             <br> <br>
             <p$>Por favor no responder este correo.</p$>
             <img src="data:image/jpeg;base64,${await base64(logo)}" width="200" height="50"  />
             `,
        });
    } catch (error) {
        console.log(error);
    }
};

module.exports = {
    logErrorRegister: logRegisterError,
};