<<<<<<< HEAD
=======
const router = require("express").Router();
const warehouseController = require('../controllers/warehouseController');
>>>>>>> develop

const router = require("express").Router();
const warehouseController = require ('../controllers/warehouseController');

router.get('/',warehouseController.fetchAll);

// Back-End: API to POST/CREATE a New Warehouse
router.post("/", warehouseController.postWarehouse);

module.exports = router;
