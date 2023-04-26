const router = require("express").Router();
const inventoryController = require("../controllers/inventoryController");

//Back-End: API to GET all inventories from all warehouses
router.get("/", inventoryController.fetchAll);

module.exports = router;