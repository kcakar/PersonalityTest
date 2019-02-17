const models=require('../models');

const TestSessionController={};

TestSessionController.createTest=function(req,res){
    models.testSession.build({
        startDate:new Date(),
        userId:1234,
    }).save().then(test=>{
        res.send(test);
    }).catch(error=>{
        res.send(error);
    });
}

TestSessionController.getOneTest=function(req,res){
    res.send("NOT IMPLEMENTEDGET");
}

TestSessionController.updateTest=function(req,res){
    res.send("NOT IMPLEMENTED");
}


module.exports = TestSessionController;