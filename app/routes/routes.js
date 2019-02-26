const express = require('express');
const router = express.Router();
const __isAuth = require('../middlewares/isAuth');
/* -- -- -- -- Auth Starts -- -- -- -- */
const AuthController = require('../controllers/AuthController');
router.get(['/login', '/signin'], AuthController.login)
router.post('/login', AuthController.loginPost)
router.get(['/register', '/signup'], AuthController.register)
router.post('/register', AuthController.registerPost)
router.post('/logout', __isAuth, AuthController.logout)
/* -- -- -- -- Auth Ends -- -- -- -- */

/* -- -- -- -- Category Starts --- -- -- -- */
const CategoriesController = require('../controllers/CategoriesController');
router.get(['/categories', '/category/all'], CategoriesController.index);
router.get('/category/create', __isAuth, CategoriesController.create);
router.post('/category/create', __isAuth, CategoriesController.store);
/* -- -- -- -- Category Ends --- -- -- -- */

/* -- -- -- -- Home Starts --- -- -- -- */
const HomeController = require('../controllers/HomeController');
router.get('/', __isAuth, (req, res, next) => {
    res.render('index', {
        pageTitle: "Home Page | الرئيسية"
    });
})
router.get('/home', __isAuth, HomeController.index);
/* -- -- -- -- Home Ends --- -- -- -- */

module.exports = router;