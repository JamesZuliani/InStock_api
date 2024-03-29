require("dotenv").config();
const knexConfig = require("./knexfile");
const knex = require("knex")(knexConfig);

const express = require("express");
const cors = require("cors");
const app = express();
const { PORT } = process.env;

app.use(cors());
app.use(express.json());

const warehouseRoute = require("./routes/warehouse.js");
const inventoryRoute = require("./routes/inventory.js");

app.use("/api/warehouses", warehouseRoute);
app.use("/api/inventories", inventoryRoute);

app.listen(8080, function () {
  console.log("here is the server on port " + PORT);
});
