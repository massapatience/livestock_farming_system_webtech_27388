const router = require('express').Router();
const { getAll, updateRole, remove } = require('../controllers/userController');
const { authenticate, authorize } = require('../middleware/auth');

router.use(authenticate, authorize('admin'));
router.get('/', getAll);
router.put('/:id/role', updateRole);
router.delete('/:id', remove);

module.exports = router;
