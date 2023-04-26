const router = require("express").Router();
const warehouseController = require("../controllers/warehouseController");

//Back-End: API to GET all warehouses
router.get("/", warehouseController.fetchAll);

// Back-End: API to POST/CREATE a New Warehouse
router.post("/", warehouseController.postWarehouse);

module.exports = router;
