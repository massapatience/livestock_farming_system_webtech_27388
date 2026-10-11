const router = require('express').Router();
const { create, getAll, update, remove } = require('../controllers/feedController');
const { authenticate, authorize } = require('../middleware/auth');

router.use(authenticate);
router.post('/', authorize('admin', 'farmer'), create);
router.get('/', getAll);
router.put('/:id', authorize('admin', 'farmer'), update);
router.delete('/:id', authorize('admin', 'farmer'), remove);

module.exports = router;
