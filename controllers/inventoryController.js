const { v4 } = require("uuid");

// knex configuration
const knexConfig = require("../knexfile");
const knex = require("knex");
const db = knex(knexConfig);
//////////////////////////////////

// GET Single warehouses
module.exports.fetchSingle = (req, res) => {

}