const router = require("express").Router();
const inventoryController = require("../controllers/inventoryController");

//Back-End: API to GET all inventories from all warehouses
router.get("/", inventoryController.fetchAll);

// Back-End: API to GET a Single Inventory Item
router.get("/:inventoryId", inventoryController.fetchSingle);

// Back end: API to POST a new inventory item
router.post("/", inventoryController.postInventory);

//Back-End:API to DELETE a inventory item
router.delete("/:inventoryID", inventoryController.deleteInventoryItem);

// Back end: API to EDIT an inventory item
router.put("/:inventoryId", inventoryController.putInventory);



module.exports = router;
