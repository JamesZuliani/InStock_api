const router = require("express").Router();
const warehouseController = require("../controllers/warehouseController");

//Back-End: API to GET all warehouses
router.get("/", warehouseController.fetchAll);

// Back-End: API to POST/CREATE a New Warehouse
router.post("/", warehouseController.postWarehouse);

//PUT / Edit warehouse
router.put("/:warehouseId", warehouseController.putWarehouse);


module.exports = router;
