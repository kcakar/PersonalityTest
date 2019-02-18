const models=require('../models');

const UserController={};

UserController.signIn=(req,res)=>{
}

UserController.getAllUsers=function(req,res){
    res.send("NOT IMPLEMENTEDGET");
}

UserController.createuser=function(req,res){
    let user=models.user.build({
        mail:"kcakar",
        name:"Keremcan Çakar",
        password:"kerempass",
        title:"Web Developer",
        testDate:null,
        personalityType:"-1",
        wingType:"-1",
        role:"admin"
    });

    models.user.getHashPassword(user.password)
    .then(hashedPassword=>{
        user.password=hashedPassword;
        return user;
    })
    .then(user=>user.save())
    .then(test=>{
        res.send(test);
    }).catch(error=>{
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

UserController.checkUsername=function(req,res){
    try{
        if(req.user.role!=="company" || req.user.status!=="active"){
            res.sendStatus(401);
        }
        else{
           return models.user.count({ where: { mail: req.body.username } })
           .then(count => {
             if (count != 0) {
               res.json({exist:true})
             }
             else{
               res.json({exist:false})
             }
         });
        }
    }
    catch(err)
    {
        res.sendStatus(400);
    }
}
module.exports = UserController;