const router = require("express").Router();
const inventoryController = require("../controllers/inventoryController");

// Back-End: API to GET a Single Inventory Item
router.get("/inventoryId", inventoryController.fetchSingle);


module.exports = router;
