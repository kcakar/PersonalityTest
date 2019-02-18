const express = require('express');
const router = express.Router();
const passport = require('passport');
const models=require('../models');
const auth=require('./auth');

const TestSessionController=require('../controllers/TestSessionController');
const UserController=require('../controllers/UserController');
const CompanyController=require('../controllers/CompanyController');
const QuestionController=require('../controllers/QuestionController');
const CreditController=require('../controllers/CreditController');
const StatisticController=require('../controllers/StatisticController');
const SettingsController=require('../controllers/SettingsController');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Docs' });
});

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
           let clientUser={
               name:user.name,
               mail:user.mail,
               id:user.id,
               role:user.role,
               companyId:user.companyId,
               jwt:token,
               status:user.status
           }
           if(user.role==="company")
           {
               clientUser.credit=user.credit;
           }

           if(user.role==="employee")
           {
               clientUser.title=user.title;
           }
           return res.json({user:clientUser});
        });
    })(req, res);
});

//user
router.post('/user/username/',passport.authenticate('jwt', {session: false}),UserController.checkUsername);


//stats
router.get('/admin-statistics/',passport.authenticate('jwt', {session: false}),StatisticController.getAdminStats);
router.get('/customer-statistics/:companyId',passport.authenticate('jwt', {session: false}),StatisticController.getCustomerStats);

//Settings
router.get('/settings/test-options/:language',passport.authenticate('jwt', {session: false}),SettingsController.getOptionsByLanguage);
router.post('/settings/test-options/',passport.authenticate('jwt', {session: false}),SettingsController.updateCreateOptions);

//credit-request
router.post('/credit-request/',passport.authenticate('jwt', {session: false}),CreditController.create);
router.get('/credit-request/',passport.authenticate('jwt', {session: false}),CreditController.getAll);
router.post('/credit-request/:id/',passport.authenticate('jwt', {session: false}),CreditController.acceptReject);

//question
router.post('/question/',passport.authenticate('jwt', {session: false}),QuestionController.createOrUpdate);
router.get('/question/:id',passport.authenticate('jwt', {session: false}),QuestionController.getOne);

router.get('/questions/:lang/',passport.authenticate('jwt', {session: false}),QuestionController.getAll);
router.get('/questions/:lang/:order/',passport.authenticate('jwt', {session: false}),QuestionController.getByOrder);
router.get('/employee/:id/stage/:stage/question/:language',passport.authenticate('jwt', {session: false}),QuestionController.getAllByUserByStage);

//company
router.post('/company/',passport.authenticate('jwt', {session: false}),CompanyController.createCompany);
router.get('/company/:id',passport.authenticate('jwt', {session: false}),CompanyController.getOneCompany);
router.post('/company/:id',passport.authenticate('jwt', {session: false}),CompanyController.updateCompany);
router.delete('/company/:id',passport.authenticate('jwt', {session: false}),CompanyController.deleteCompany);

router.get('/company/:id/employees/',passport.authenticate('jwt', {session: false}),CompanyController.getEmployees);
router.post('/company/:id/status/',passport.authenticate('jwt', {session: false}),CompanyController.setStatus);
router.get('/companies/',passport.authenticate('jwt', {session: false}),CompanyController.getAllCompanies);

//test
router.post('/company/:id/test',passport.authenticate('jwt', {session: false}),TestSessionController.create);



module.exports = router;