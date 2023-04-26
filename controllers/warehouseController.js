const knexConfig = require ('../knexfile');
const knex = require('knex');
const db = knex(knexConfig);

module.exports.getAll = (_req,res) => {

    // db.select("id","warehouse_name","address","city","country","contact_name","contact_position","contact_phone","contact_email").from('warehouses');
    db('warehouses')
    .then((data) => {
        res.status(200).json(data);
    })
    .catch((err) => 
    res.status(400).send(`Error retrieving Warehouses: ${err}`)
    );
}