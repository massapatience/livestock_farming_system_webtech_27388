const router = require('express').Router();
const passport = require('passport');
const { register, login, googleCallback, getMe } = require('../controllers/authController');
const { authenticate } = require('../middleware/auth');

router.post('/register', register);
router.post('/login', login);
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'], session: false }));
router.get('/google/callback', passport.authenticate('google', { session: false, failureRedirect: '/login' }), googleCallback);
router.get('/me', authenticate, getMe);

module.exports = router;
