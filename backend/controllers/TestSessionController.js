const models=require('../models');

const TestSessionController={};

TestSessionController.create=function(req,res){
    let {id}=req.params;
    let {testSession}=req.body;
    
    try{
        if(req.user.role!=="company" || req.user.status!=="active" || req.user.id!==parseInt(id)){
            res.sendStatus(401);
        }
        else{
            models.sequelize.transaction(t=>{
                return models.user.getHashPassword(testSession.password)
                .then(hashPassword=>{
                    return models.user.create({
                        name:testSession.name,
                        password:hashPassword,
                        status:"active",
                        mail:testSession.name,
                        title:testSession.title,
                        role:"employee",
                        companyId:req.user.id
                    },{transaction:t})
                })
                .then(dbUser=>{
                    return models.testSession.create({
                        userId:dbUser.id,
                        stage:"intro"
                    },{transaction:t})
                })
            })
            .then(r=>{
                res.sendStatus(200);
            })
            .catch(err=>{
                let errors=[];
                if(err.errors)
                {
                    errors=err.errors;
                }
                else{
                    errors=[{message:err}];
                }
                res.status(400).json({errors:errors});
            });
        }
    }
    catch(err)
    {
        res.sendStatus(400);
    }
}

TestSessionController.getOneTest=function(req,res){
    res.send("NOT IMPLEMENTEDGET");
}

TestSessionController.updateTest=function(req,res){
    res.send("NOT IMPLEMENTED");
}


module.exports = TestSessionController;