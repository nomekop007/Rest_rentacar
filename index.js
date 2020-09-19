const express = require("express");
const bodyParser = require("body-parser");
const apiRouter = require("./routes/route");
const morgan = require("morgan");

const app = express();

require("./db");

app.use(bodyParser.json());
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/rentacar", apiRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Servidor arrancado! Puerto ", PORT);
});
