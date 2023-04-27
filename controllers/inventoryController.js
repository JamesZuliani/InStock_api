// knex configuration
const knexConfig = require("../knexfile");
const knex = require("knex");
const db = knex(knexConfig);
const { v4 } = require("uuid");

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
module.exports.fetchAll = (_req, res) => {
  db("warehouses")
    .join("inventories", "inventories.warehouse_id", "=", "warehouses.id")
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

// post new inventory item
module.exports.postInventory = async (req, res) => {
  const categories = [
    "Accessories",
    "Gear",
    "Electronics",
    "Health",
    "Apparel",
  ];
  const stock = ["In Stock", "Out of Stock"];
  // Check if we have sufficient body data
  if (Object.keys(req.body).length !== 6) {
    return res.status(400).json({ error: "insufficient parameters" });
    // if we have complete body data:
  } else {
    // loop through the object and check if its not empty
    for (key in req.body) {
      if (req.body[key] === "") {
        return res.status(400).json({ error: `${key} is empty` });
      }
      // check for valid category
      else if (key === "category" && !categories.includes(req.body[key])) {
        return res.status(400).json({
          error: `${key}: < '${req.body[key]}' > is not a valid category, please select one of: Accessories, Gear, Electronics, Health, or Apparel `,
        });
      }
      // check for valid status
      else if (key === "status" && !stock.includes(req.body[key])) {
        return res.status(400).json({
          error: `${key}: < '${req.body[key]}' > is not a valid status, please select 'In Stock', or 'Out of Stock'`,
        });
      }
      // if id is present its throw error
      else if (key === "id") {
        return res.status(400).json({
          error: "cannot set ID manually",
        });
      } else if (key === "quantity" && !Number.isInteger(+req.body[key])) {
        return res.status(400).json({
          error: `${key}: < '${req.body[key]}' > is not a valid number, please input a number (integer)`
        });
      }
    }
    // now destructure the request
    const { warehouse_id, item_name, description, category, status, quantity } =
      req.body;

    const insertedRow = await db("warehouses")
      .select("id")
      .where("id", warehouse_id);
    if (insertedRow.length === 0) {
      return res.status(400).json({
        error: "cannot find warehouse_id",
      });
    }

    try {
      // create a uuid for each row
      const newId = v4();
      // INSERT INTO warehouses
      await db("inventories").insert({
        id: newId,
        warehouse_id,
        item_name,
        description,
        category,
        status,
        quantity,
        created_at: db.fn.now(),
      });
      // Show the added row as the requested format
      const insertedRow = await db("inventories")
        .select(
          "id",
          "warehouse_id",
          "item_name",
          "description",
          "category",
          "status",
          "quantity"
        )
        .where("id", newId)
        .first();
      res.json(insertedRow);
    } catch (err) {
      // prefrred to not show the error message.
      res.status(500).json({error: `cannot post`});
    }
  }
};

//This is the SQL statement used to generate the above. Keep here for backup use and for use for other requests.
// SELECT inventories.id,warehouses.warehouse_name,inventories.item_name, inventories.description, inventories.category,inventories.status,inventories.quantity
// FROM instock.warehouses as warehouses
// JOIN instock.inventories as inventories on inventories.warehouse_id = warehouses.id;
