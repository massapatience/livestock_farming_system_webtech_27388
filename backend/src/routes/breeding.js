const router = require('express').Router();
const { create, getAll, update } = require('../controllers/breedingController');
const { authenticate, authorize } = require('../middleware/auth');

router.use(authenticate);
router.post('/', authorize('admin', 'farmer'), create);
router.get('/', getAll);
router.put('/:id', authorize('admin', 'farmer'), update);

module.exports = router;
