const express = require('express');
const router = express.Router();

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

module.exports = router;