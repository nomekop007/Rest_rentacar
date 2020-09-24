const express = require("express");
const bodyParser = require("body-parser");
const apiRouter = require("./routes/route");
const morgan = require("morgan");
const path = require("path");
const app = express();

require("./db");

app.use(morgan("dev"));
app.use(bodyParser.json({ limit: "20mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "20mb", extended: true }));

//static files
app.use(express.static(path.join(__dirname, "uploads")));

app.use("/rentacar", apiRouter);

//start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log("Servidor arrancado! Puerto ", PORT);
});