const router = require('express').Router();
const { create, getAll, getSummary } = require('../controllers/saleController');
const { authenticate, authorize } = require('../middleware/auth');

router.use(authenticate);
router.post('/', authorize('admin', 'farmer'), create);
router.get('/', getAll);
router.get('/summary', getSummary);

module.exports = router;
