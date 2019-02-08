var express = require('express');
var router = express.Router();

const TestSessionController=require('../controllers/TestSessionController');
const UserController=require('../controllers/UserController');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Docs' });
});

router.route('/test')
    .post(TestSessionController.createTest);

router.route('/test/:testId')
    .get(TestSessionController.getOneTest)
    .put(TestSessionController.updateTest);


router.route('/user')
    .get(UserController.getAllUsers)
    .post(UserController.createuser);

router.route('/user/:usertId')
    .get(UserController.getOneUser)
    .put(UserController.updateUser)
    .delete(UserController.deleteUser);

module.exports = router;

module.exports = router;
