const express = require('express');
const router = express.Router();
const __isAuth = require('../middlewares/isAuth');
/* -- -- -- -- Auth Starts -- -- -- -- */
const AuthController = require('../controllers/AuthController');
router.get(['/login', '/signin'], AuthController.login)
router.get(['/register', '/signup'], AuthController.register)
router.post('/register', AuthController.registerPost)
/* -- -- -- -- Auth Ends -- -- -- -- */

/* -- -- -- -- Category Starts --- -- -- -- */
const CategoriesController = require('../controllers/CategoriesController');
router.get(['/categories', '/category/all'], CategoriesController.index);
/* -- -- -- -- Category Ends --- -- -- -- */

/* -- -- -- -- Home Starts --- -- -- -- */
const HomeController = require('../controllers/HoneController');
router.get('/home', __isAuth, HomeController.index);
/* -- -- -- -- Home Ends --- -- -- -- */

module.exports = router;