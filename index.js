const express = require("express");
const bodyParser = require("body-parser");
const apiRouter = require("./routes/route");

const app = express();

require("./db");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/rentacar", apiRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Servidor arrancado! Puerto ", PORT);
});
