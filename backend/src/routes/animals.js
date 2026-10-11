const router = require('express').Router();
const { create, getAll, getOne, update, remove } = require('../controllers/animalController');
const { authenticate, authorize } = require('../middleware/auth');

router.use(authenticate);
router.post('/', authorize('admin', 'farmer'), create);
router.get('/', getAll);
router.get('/:id', getOne);
router.put('/:id', authorize('admin', 'farmer'), update);
router.delete('/:id', authorize('admin', 'farmer'), remove);

module.exports = router;
