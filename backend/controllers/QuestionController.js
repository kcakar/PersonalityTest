const models=require('../models');
const Sequelize = require('sequelize');

const Op = Sequelize.Op;

const QuestionController={};


QuestionController.getAll=function(req,res){
    if(req.user.role!=="admin"){
        res.sendStatus(401);
        return;
    }
    try{
        models.question.findAll(
            {
                attributes:["id","text","order","personalityType","stage"],
                where:{
                    language:req.params.lang
                }
            }
        ).then(result=>{
            result=result.map(row=>{delete row.createdAt;return row;})
            res.json(result);
        })
        .catch(err=>{
            res.status(400).json({error:err});
        });
    }
    catch(err){
        res.sendStatus(400);
    }
}

QuestionController.getOne=function(req,res){
    if(req.user.role!=="admin"){
        res.sendStatus(401);
        return;
    }
    try{
        models.question.findByPk(req.params.id).then(result=>{
            res.json({result});
        })
        .catch(err=>{
            res.status(400);
        });
    }
    catch(err){
        res.sendStatus(400);
    }
}

QuestionController.getByOrder=function(req,res){
    if(req.user.role!=="admin"){
        res.sendStatus(401);
        return;
    }
    try{
        console.log(req.params)
        models.question.findOne(
            {
                where: {
                    order: req.params.order
                }
            })
            .then(result=>{
            res.json({result});
        })
        .catch(err=>{
            res.status(400);
        });
    }
    catch(err){
        res.sendStatus(400);
    }
}

QuestionController.createOrUpdate=function(req,res){
    try{
        if(req.user.role!=="admin"){
            res.sendStatus(401);
            return;
        }
        let {question}=req.body;
        if(!question){
            res.sendStatus(400);
        }
        else{
            models.question.findByPk(question.id)
            .then(dbQuestion=>{
                if(dbQuestion)
                {
                    //soru dili türkçe ise ve kişilik tipi değiştiyse tüm dillerde değişmeli
                    if(dbQuestion.language==="tr" && dbQuestion.personalityType!==question.personalityType){
                        return models.question.update({personalityType:question.personalityType},{
                            where:{
                                order:dbQuestion.order
                            }
                        }).then(count=>{
                            return dbQuestion.update({...question})
                        })
                    }//sadece soruyu update et
                    else{
                        return dbQuestion.update({...question})
                    }
                }
                else{//bu dilde bu soru yok, baştan yarat
                    return models.question.create({...question})
                }
            })
            .then(question=>{
                console.log("6")

                res.json(question);
            })
            .catch(err=>{
                console.log(err);
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


QuestionController.delete=function(req,res){
    res.send("NOT IMPLEMENTED");
}
module.exports = QuestionController;