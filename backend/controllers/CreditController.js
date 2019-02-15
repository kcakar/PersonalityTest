const models=require('../models');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
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
        models.creditRequest.findAll({
            include: [{
                model: models.company
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
                companyName:creditRequest.company.name,
                companyCurrentCredit:creditRequest.company.credit,
                phone:creditRequest.company.phone,
                mail:creditRequest.company.mail,
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
        let {requestData,decision}=req.body;
        let {id}=req.params;
        let {companyId,amount} = requestData;
        const status=decision?"accepted":"rejected";

        models.sequelize.transaction(t=>{
            return models.creditRequest.findByPk(id,{transaction:t})
                    .then(creditRequest=>{
                        if(creditRequest.status!=="waiting"){
                            throw new Error("Bu istek zaten cevaplanmış");
                        }
                        return creditRequest.update({status},{where:{id},transaction:t})
                    })
                    .then(affectedRows=>{
                        if(affectedRows===0)
                        {
                            throw new Error();
                        }
                        return decision ? models.company.findByPk(companyId,{transaction:t})
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