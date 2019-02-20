const models=require('../models');

const TestSessionController={};

TestSessionController.create=function(req,res){
    let {id}=req.params;
    let {testSession}=req.body;
    
    try{
        if(req.user.role!=="company" || req.user.status!=="active" || req.user.id!==parseInt(id)){
            res.sendStatus(401);
        }
        else if(req.user.credit<=0){
            res.status(412).json({message:"Hakkınız bitti."});
        }
        else{
            models.sequelize.transaction(t=>{
                return models.user.getHashPassword(testSession.password)
                .then(hashPassword=>{
                    return models.user.create({
                        name:testSession.name,
                        password:hashPassword,
                        status:"active",
                        mail:testSession.mail,
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
                .then(()=>{
                    return models.user.decrement({ credit: '1'}, { where: { id: req.user.id },transaction:t })
                })
                .then(affectedRows=>{
                    if(affectedRows<=0)
                    {
                        throw("Şirkete ulaşılamadı")
                    }
                    return models.user.findByPk(req.user.id,{transaction:t});
                })
                .then(user=>{
                    if(user.credit<0){
                        throw("Hakkınız bitti");
                    }
                    else{
                        return user;
                    }
                })
            })
            .then(r=>{
                res.sendStatus(200);
            })
            .catch(err=>{
                if(err==="Hakkınız bitti")
                {
                    res.status(412).json({message:err});
                }
                else{
                    let errors=[];
                    if(err.errors)
                    {
                        errors=err.errors;
                    }
                    else{
                        errors=[{message:err}];
                    }
                    res.status(400).json({errors:errors});
                }
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
    let {id}=req.params;
    let {testSession}=req.body;
    
    try{
        if(req.user.role!=="employee" || req.user.status!=="active" || req.user.id!==parseInt(id)){
            res.sendStatus(401);
        }
        else{
            models.testSession.update({...testSession},{
                where:{userId:req.user.id}
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

TestSessionController.createAnswer=function(req,res){
    let {id}=req.params;
    let {answer,nextQuestionId}=req.body;
    
    try{
        if(req.user.role!=="employee" || req.user.status!=="active" || req.user.id!==parseInt(id)){
            res.sendStatus(401);
        }
        else{
            models.sequelize.transaction(t=>{
                return models.userAnswer.destroy({where:{userId:req.user.id,questionId:answer.questionId}},{transaction:t})
                .then(r=>{
                    return models.userAnswer.create({...answer,userId:req.user.id},{transaction:t})
                })
                .then(answer=>{
                    return models.testSession.update({questionId:nextQuestionId},{
                        where:{userId:req.user.id}
                        ,transaction:t
                     })
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


module.exports = TestSessionController;