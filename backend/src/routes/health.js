const router = require('express').Router();
const { create, getByAnimal, getAll } = require('../controllers/healthController');
const { authenticate, authorize } = require('../middleware/auth');

router.use(authenticate);
router.post('/', authorize('admin', 'vet'), create);
router.get('/', authorize('admin', 'vet'), getAll);
router.get('/animal/:animalId', getByAnimal);

module.exports = router;
