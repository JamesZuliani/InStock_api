
const router = require("express").Router();
const warehouseController = require ('../controllers/warehouseController')

router.route('/').get(warehouseController.getAll);

module.exports = router;
