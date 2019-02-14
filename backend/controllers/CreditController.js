const models=require('../models');

const CreditController={};

CreditController.create=function(req,res){
    try{
        if(req.user.role!=="company"){
            res.sendStatus(401);
            return;
        }
        let {creditRequest}=req.body;
        if(!creditRequest){
            res.sendStatus(400);
        }
        else{
            creditRequest.status="waiting";
            models.creditRequest.create({...creditRequest})
            .then(creditRequest=>{
                res.json(creditRequest);
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



CreditController.getAll=function(req,res){
    if(req.user.role!=="admin"){
        res.sendStatus(401);
        return;
    }
    try{
        console.log("1")
        models.creditRequest.findAll().then(result=>{
            console.log("2")
            res.json(result);
        })
        .catch(err=>{
            console.log("3")
            res.status(400).json({error:err});
        });
    }
    catch(err){
        console.log(err)
        res.sendStatus(400);
    }
}

module.exports = CreditController;