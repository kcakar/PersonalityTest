const models=require('../models');

const UserController={};

UserController.getAllUsers=function(req,res){
    res.send("NOT IMPLEMENTEDGET");
}

UserController.createuser=function(req,res){
    models.user.build({
        username:"kcakar",
        password:"12345",
        title:"Web Developer",
        testDate:null,
        personalityType:"-1",
        wingType:"-1",
        role:"admin"
    }).save().then(test=>{
        console.log(test);
        res.send(test);
    }).catch(error=>{
        console.log(error);
        res.send(error);
    });
}

UserController.getOneUser=function(req,res){
    res.send("NOT IMPLEMENTED");
}

UserController.updateUser=function(req,res){
    res.send("NOT IMPLEMENTED");
}

UserController.deleteUser=function(req,res){
    res.send("NOT IMPLEMENTED");
}
module.exports = UserController;