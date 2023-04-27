
// knex configuration
const knexConfig = require("../knexfile");
const knex = require("knex");
const db = knex(knexConfig);

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
        res
          .status(404)
          .json({ error: `inventory id: {${req.params.inventoryId}} not found` });
      }
    } catch (error) {
      res.status(500).json({ error: "cannot fetch the selected inventory" });
    }
  };

//GET all inventories from all warehouses
module.exports.fetchAll = (req, res) => {
    db('warehouses')
        .join('inventories','inventories.warehouse_id', '=', 'warehouses.id')
        .select(
        "inventories.id",
        "warehouses.warehouse_name",
        "inventories.item_name",
        "inventories.description",
        "inventories.category",
        "inventories.status",
        "inventories.quantity"
      )
        .then((data) => {
          res.status(200).json(data);
        })
        .catch((err) =>
          res.status(400).send(`Error retrieving Inventories: ${err}`)
        );
    };

    //This is the SQL statement used to generate the above. Keep here for backup use and for use for other requests. 
    // SELECT inventories.id,warehouses.warehouse_name,inventories.item_name, inventories.description, inventories.category,inventories.status,inventories.quantity
    // FROM instock.warehouses as warehouses
    // JOIN instock.inventories as inventories on inventories.warehouse_id = warehouses.id;



   