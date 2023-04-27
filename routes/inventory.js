const router = require("express").Router();
const inventoryController = require("../controllers/inventoryController");

//Back-End: API to GET all inventories from all warehouses
router.get("/", inventoryController.fetchAll);

// Back-End: API to GET a Single Inventory Item
router.get("/:inventoryId", inventoryController.fetchSingle);

// Back end: API to POST a new inventory item
router.post ("/", inventoryController.postInventory);


module.exports = router;

