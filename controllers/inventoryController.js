const { v4 } = require("uuid");

// knex configuration
const knexConfig = require("../knexfile");
const knex = require("knex");
const db = knex(knexConfig);
//////////////////////////////////

// GET Single warehouses
module.exports.fetchSingle = async (req, res) => {
  try {
    const foundRow = await db("inventories")
      .join("warehouses", "inventories.warehouse_id", "=", "warehouses.id")
      .where({ "inventories.id": req.params.inventoryId })
      .select(
        "inventories.id",
        "warehouse_name",
        "item_name",
        "description",
        "category",
        "status",
        "quantity"
      )
      .first();
    if (foundRow) {
      res.json(foundRow);
    } else {
        res.status(404).json({error: `inventory id: {${req.params.inventoryId}} not found`});

    }
  } catch (error) {
    res.status(500).json({ error: "cannot fetch the selected inventory" });
  }
};
