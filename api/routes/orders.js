const express= require('express');
const router = express.Router();

const checkAuth=require('../middleware/check-auth');

const OrdesController=require('../controllers/orders_controller');
router.get('/',checkAuth,OrdesController.orders_get_all);

router.post('/', checkAuth,OrdesController.orders_create_order);

router.get('/:orderId',checkAuth,OrdesController.orders_get_order);

router.delete('/:orderId',checkAuth, OrdesController.orders_delete_order);

module.exports = router;