
// knex configuration
const knexConfig = require("../knexfile");
const knex = require("knex");
const db = knex(knexConfig);

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