const router = require("express").Router();
const inventoryController = require("../controllers/inventoryController");

//Back-End: API to GET all inventories from all warehouses
router.get("/", inventoryController.fetchAll);

// Back-End: API to GET a Single Inventory Item
router.get("/:inventoryId", inventoryController.fetchSingle);

//Back-End:API to DELETE a inventory item
router.delete("/:inventoryID", inventoryController.deleteInventoryItem);

module.exports = router;
