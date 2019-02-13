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



//company
router.post('/company/',passport.authenticate('jwt', {session: false}),CompanyController.createCompany);
router.get('/company/:id',passport.authenticate('jwt', {session: false}),CompanyController.getOneCompany);
router.delete('/company/:id',passport.authenticate('jwt', {session: false}),CompanyController.deleteCompany);

router.post('/company/:id/status/',passport.authenticate('jwt', {session: false}),CompanyController.setStatus);

router.get('/companies/',passport.authenticate('jwt', {session: false}),CompanyController.getAllCompanies);



//auth
router.post('/auth/verify',passport.authenticate('jwt', {session: false}),(req, res)=>{
    return res.json({success:true});
});

router.post('/auth/login', function (req, res, next) {
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

module.exports = router;