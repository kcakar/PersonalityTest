const express = require('express');
const router = express.Router();
const passport = require('passport');
const models=require('../models');
const auth=require('./auth');

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


router.get('/user',auth.required,UserController.getAllUsers)


router.post('/login', function (req, res, next) {
    passport.authenticate('local', {session: false}, (err, user, info) => {
        if (err || !user) {
            return res.status(400).json({
                message: info,
                user   : user
            });
        }
       req.login(user, {session: false}, (err) => {
           if (err) {
               res.send(err);
           }
           const token=models.user.generateJWT(user);
           return res.json({token});
        });
    })(req, res);
});

router.route('/user/')
    .all((req,res,next)=>{
        next();
    })
    .post(UserController.createuser);

router.route('/user/:usertId')
    .all((req,res,next)=>{
        next();
    })
    .get(UserController.getOneUser)
    .put(UserController.updateUser)
    .delete(UserController.deleteUser);

module.exports = router;
