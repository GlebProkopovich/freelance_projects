const Router = require('express').Router;
const UserController = require('../controllers/user-controller');
const { body } = require('express-validator');
const authMiddleware = require('../middlewares/auth-middleware');
const breakfastsController = require('../controllers/breakfasts-controller');
const mainDishesController = require('../controllers/mainDishes-controller');
const sweetwafflesController = require('../controllers/sweetwaffles-controller');
const croissantsController = require('../controllers/croissants-controller');
const wafflesandwichesController = require('../controllers/wafflesandwiches-controller');
const allDishesController = require('../controllers/allDishes-controller');

const router = new Router();

router.post(
  '/registration',
  body('email').isEmail(),
  body('password').isLength({ min: 3, max: 32 }),
  UserController.registration
);
router.post('/login', UserController.login);
router.post('/logout', UserController.logout);
router.get('/activate/:link', UserController.activate);
router.get('/refresh', UserController.refresh);
router.get('/users', authMiddleware, UserController.getUsers);
router.get('/breakfasts', breakfastsController.getBreakfasts);
router.get('/maindishes', mainDishesController.getMainDishes);
router.get('/sweetwaffles', sweetwafflesController.getSweetWaffles);
router.get('/croissants', croissantsController.getCroissants);
router.get('/wafflesandwiches', wafflesandwichesController.getWaffleSandwiches);
router.get('/alldishes', allDishesController.getAllDishes);

module.exports = router;
