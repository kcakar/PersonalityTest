const models=require('../models');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const CreditController={};

CreditController.create=function(req,res){
    try{
        if(req.user.role!=="company" || req.user.status!=="active"){
            res.sendStatus(401);
            return;
        }
        let {creditRequest}=req.body;
        if(!creditRequest){
            res.sendStatus(400);
        }
        else{
            creditRequest.status="waiting";
            models.creditRequest.create({...creditRequest ,userId:req.user.id})
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
        models.creditRequest.findAll({
            include: [{
                model: models.user
            }],
            where:{
                status:{
                    [Op.eq]:"waiting"
                    }
            }
        }).then(result=>{
            const clientRows=result.map(creditRequest=>
            {
               return   { 
                id:creditRequest.id,
                companyId:creditRequest.companyId,
                status:creditRequest.status,
                createdAt:creditRequest.createdAt,
                companyName:creditRequest.user.name,
                companyCurrentCredit:creditRequest.user.credit,
                phone:creditRequest.user.phone,
                mail:creditRequest.user.mail,
                amount:creditRequest.amount
               }
            })
            res.json(clientRows);
        })
        .catch(err=>{
            res.status(400).json({error:err});
        });
    }
    catch(err){
        res.sendStatus(400);
    }
}

CreditController.acceptReject=function(req,res){
    if(req.user.role!=="admin"){
        res.sendStatus(401);
        return;
    }
    try{
        let {decision}=req.body;
        let {id}=req.params;
        const status=decision?"accepted":"rejected";
        let userId,amount;

        models.sequelize.transaction(t=>{
            return models.creditRequest.findByPk(id,{transaction:t})
                    .then(creditRequest=>{
                        if(creditRequest.status!=="waiting"){
                            throw new Error("Bu istek zaten cevaplanmış");
                        }
                        userId=creditRequest.userId;
                        amount=creditRequest.amount;
                        return creditRequest.update({status},{where:{id},transaction:t})
                    })
                    .then(affectedRows=>{
                        if(affectedRows===0)
                        {
                            throw new Error();
                        }
                        return decision ? models.user.findByPk(userId,{transaction:t})
                                .then(company=>{
                                    const newCreditAmount=company.credit+amount;
                                    return company.update({credit:newCreditAmount},{transaction:t})
                                }) : Promise.resolve();
                    })
        })
        .then(company=>{
            res.sendStatus(200);
        })
        .catch(err=>{
            let errors=[];
            if(err.errors)
            {
                errors=err.errors;
            }
            else{
                errors=[{message:err.message}];
            }
            res.status(400).json({errors:errors});
        }); 
    }
    catch(err){
        res.sendStatus(400);
    }
}

module.exports = CreditController;