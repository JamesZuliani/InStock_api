
const router = require("express").Router();
const warehouseController = require ('../controllers/warehouseController');

router.get('/',warehouseController.fetchAll);

module.exports = router;