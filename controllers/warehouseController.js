const { v4 } = require("uuid");

// knex configuration
const knexConfig = require("../knexfile");
const knex = require("knex");
const db = knex(knexConfig);
//////////////////////////////////

//GET all warehouses
module.exports.fetchAll = (_req, res) => {
  db.select(
    "id",
    "warehouse_name",
    "address",
    "city",
    "country",
    "contact_name",
    "contact_position",
    "contact_phone",
    "contact_email"
  )
    .from("warehouses")
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) =>
      res.status(400).send(`Error retrieving Warehouses: ${err}`)
    );
};

//Get the single warehouse
module.exports.fetchId = (req, res) => {
  db("warehouses")
    .select(
      "id",
      "warehouse_name",
      "address",
      "city",
      "country",
      "contact_name",
      "contact_position",
      "contact_phone",
      "contact_email"
    )
    .where({ id: req.params.warehouseId })
    .then((warehouse) => {
      if (warehouse.length === 0) {
        return res
          .status(404)
          .json({ message: `Error ${req.params.warehouseId} not found` });
      }
      return res.status(200).json(warehouse[0]);
    })
    .catch(() => {
      return res.status(500).json({
        message: `Error getting warehouse detail ${req.params.warehouseId}`,
      });
    });
};

// POST
module.exports.postWarehouse = async (req, res) => {
  // Check if we have sufficient body data
  if (Object.keys(req.body).length !== 8) {
    return res.status(400).json({ error: "insufficient prameter" });
    // if we have complete body data:
  } else {
    // loop through the object and check if its not empty
    for (key in req.body) {
      if (req.body[key] === "") {
        return res.status(400).json({ error: `${key} is empty` });
      }
      //   check for valid Phone number
      else if (
        key === "contact_phone" &&
        req.body[key].search(/^\+\d{1,3}\ \(\d{3}\) \d{3}-\d{4}$/) !== 0
      ) {
        return res.status(400).json({
          error: `${key}: < '${req.body[key]}' > has incorrect format`,
        });
      }
      //   check for valid Email address
      else if (
        key === "contact_email" &&
        req.body[key].search(
          /^[a-zA-Z0-9._%+]+@[a-zA-Z0-9.]+\.[a-zA-Z]{2,}$/
        ) !== 0
      ) {
        return res.status(400).json({
          error: `${key}: < '${req.body[key]}' > has incorrect format`,
        });
      }
      // if id is present its throw error
      else if (key === "id") {
        return res.status(400).json({
          error: "cannot set ID manually",
        });
      }
    }

    // now destructure the request
    const {
      warehouse_name,
      address,
      city,
      country,
      contact_name,
      contact_position,
      contact_phone,
      contact_email,
    } = req.body;

    try {
      // create a uuid for each row
      const newId = v4();
      // INSERT INTO warehouses
      await db("warehouses").insert({
        id: newId,
        warehouse_name,
        address,
        city,
        country,
        contact_name,
        contact_position,
        contact_phone,
        contact_email,
        created_at: db.fn.now(),
      });
      // Show the added row as the requested format
      const insertedRow = await db("warehouses")
        .select(
          "id",
          "warehouse_name",
          "address",
          "city",
          "country",
          "contact_name",
          "contact_position",
          "contact_phone",
          "contact_email"
        )
        .where("id", newId)
        .first();
      res.json(insertedRow);
    } catch (err) {
      // prefrred to not show the error message.
      res.status(400).json({ error: "Failed to create the warehouse entry." });
    }
  }
};

//DELETE a warehouse

module.exports.deleteWarehouse = async (req, res) => {
  const id = req.params.warehouseID;

  try {
    const warehouses = await db("warehouses").where({ id }).del();

    if (warehouses > 0) {
      res.sendStatus(204);
    } else {
      res
        .status(404)
        .send(`Error: warehouse with id ${req.params.warehouseID} not found`);
    }
  } catch (e) {
    res.status(500).json(e);
  }
};
// PUT-Edit
module.exports.putWarehouse = async (req, res) => {
  if (Object.keys(req.body).length !== 8) {
    return res.status(400).json({ error: "insufficient prameter" });
    // if we have complete body data:
  } else {
    // loop through the object and check if its not empty
    for (key in req.body) {
      if (req.body[key] === "") {
        return res.status(400).json({ error: `${key} is empty` });
      }

      //   check for valid Phone number
      else if (
        key === "contact_phone" &&
        req.body[key].search(/^\+\d{1,3}\ \(\d{3}\) \d{3}-\d{4}$/) !== 0
      ) {
        return res.status(400).json({
          error: `${key}: < '${req.body[key]}' > has incorrect format`,
        });
      }
      //   check for valid Email address
      else if (
        key === "contact_email" &&
        req.body[key].search(
          /^[a-zA-Z0-9._%+]+@[a-zA-Z0-9.]+\.[a-zA-Z]{2,}$/
        ) !== 0
      ) {
        return res.status(400).json({
          error: `${key}: < '${req.body[key]}' > has incorrect format`,
        });
      }
      // if id is present its throw error
      else if (key === "id") {
        return res.status(400).json({
          error: "cannot change ID",
        });
      }
    }
  }

  // now destructure the request
  const {
    warehouse_name,
    address,
    city,
    country,
    contact_name,
    contact_position,
    contact_phone,
    contact_email,
  } = req.body;
  const targetId = req.params.warehouseId;

  // check for ID field in db
  try {
    const targetRow = await db("warehouses").where("id", targetId).first();
    if (targetRow) {
      await db("warehouses").where("id", targetId).update({
        warehouse_name,
        address,
        city,
        country,
        contact_name,
        contact_position,
        contact_phone,
        contact_email,
        updated_at: db.fn.now(),
      });
      const alteredRow = await db("warehouses")
        .select(
          "id",
          "warehouse_name",
          "address",
          "city",
          "country",
          "contact_name",
          "contact_position",
          "contact_phone",
          "contact_email"
        )
        .where("id", targetId)
        .first();
      res.json(alteredRow);
    } else {
      return res.status(400).json({ error: "ID not found" });
    }
  } catch (err) {
    res.status(400).json({ error: "Failed to put the warehouse entry." });
  }
};
