const express = require('express');
const router = express.Router();
const passport = require('passport');
const models=require('../models');
const auth=require('./auth');

const TestSessionController=require('../controllers/TestSessionController');
const UserController=require('../controllers/UserController');
const CompanyController=require('../controllers/CompanyController');

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

router.route('/user/')
    .all((req,res,next)=>{
        next();
    })
    .post(UserController.createuser);

router.route('/user/:userId')
    .all((req,res,next)=>{
        next();
    })
    .get(UserController.getOneUser)
    .put(UserController.updateUser)
    .delete(UserController.deleteUser);

router.post('/auth/verify',passport.authenticate('jwt', {session: false}),(req, res)=>{
    return res.json({success:true});
});

router.post('/auth/login', function (req, res, next) {
    passport.authenticate('local', {session: false}, (err, user, info) => {
        console.log(info)
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
           const clientUser={
               name:user.name,
               email:user.email,
               id:user.id,
               role:user.role,
               title:user.title,
               jwt:token
           }
           return res.json({user:clientUser});
        });
    })(req, res);
});


router.post('/company/',passport.authenticate('jwt', {session: false}),CompanyController.createCompany);


module.exports = router;
