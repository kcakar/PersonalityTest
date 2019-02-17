const models=require('../models');

const TestSessionController={};

TestSessionController.createTest=function(req,res){
    let {companyId}=req.params.companyId;
    let {testSession}=req.body;

    CreditController.create=function(req,res){
        try{
            if(req.user.role!=="company" || req.user.status!=="active"){
                res.sendStatus(401);
                return;
            }
            if(!testSession){
                res.sendStatus(400);
            }
            else{
                
            }
        }
        catch(err)
        {
            res.sendStatus(400);
        }
    }
}

TestSessionController.getOneTest=function(req,res){
    res.send("NOT IMPLEMENTEDGET");
}

TestSessionController.updateTest=function(req,res){
    res.send("NOT IMPLEMENTED");
}


module.exports = TestSessionController;