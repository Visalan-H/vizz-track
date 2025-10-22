const router= require('express').Router();
const { handleLogin, handleRegister, handleLogout, getMe } = require('../controllers/authController');
const { validateLogin, validateRegister } = require('../validations/authValidations');
const { decodeToken } = require('../middleware/authMiddleware');


router.post('/login', validateLogin, handleLogin);
router.post('/register', validateRegister, handleRegister);
router.post('/logout', handleLogout);
router.get('/me', decodeToken, getMe);

module.exports = router;