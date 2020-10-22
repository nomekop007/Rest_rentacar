//variables de entorno
require("dotenv").config();

require("./db");
const express = require("express");
const bodyParser = require("body-parser");
const apiRouter = require("./routes/route");
const morgan = require("morgan");
const path = require("path");
const app = express();

app.use(morgan("dev"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

//static files (hace publica la carpeta uploads)
app.use(express.static(path.join(__dirname, "uploads")));

app.use("/rentacar", apiRouter);

//start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log("Servidor arrancado! Puerto ", PORT);
});