const models=require('../models');
const Sequelize = require('sequelize');

const Op = Sequelize.Op;

const CompanyController={};


CompanyController.getAllCompanies=function(req,res){
    if(req.user.role!=="admin"){
        res.sendStatus(401);
        return;
    }
    try{
        models.user.findAll({
            where:{role:"company"},
            attributes:["id","name","mail","credit","phone","status"]
        }).then(result=>{
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

CompanyController.createCompany=function(req,res){
    try{
        if(req.user.role!=="admin"){
            res.sendStatus(401);
            return;
        }
        let {company}=req.body;
        if(!company){
            res.sendStatus(400);
        }
        else{
            models.sequelize.transaction(t=>{
                return models.user.getHashPassword(company.password)
                .then(hashedPassword=>{
                    return models.user.build({
                                status:"active",
                                mail:company.mail,
                                phone:company.phone,
                                password:hashedPassword,
                                name:company.name,
                                role:"company",
                                credit:company.credit
                            }).save({transaction:t});
                })
                .then(companyUser=>{
                    return companyUser.update({companyId:companyUser.id},{transaction:t})
                })
                .then((companyUser)=>{
                    res.json(companyUser);
                })
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

CompanyController.updateCompany=function(req,res){
    try{
        if(req.user.role!=="admin"){
            res.sendStatus(401);
            return;
        }
        let {company,isNewPass,newPass}=req.body;
        if(!company){
            res.sendStatus(400);
        }
        else{
            models.sequelize.transaction(t=>{
                return models.user.findByPk(company.id,{transaction:t})
                        .then(dbCompany=>{
                            if(isNewPass){
                                return models.user.getHashPassword(newPass)
                                        .then(hashedPass=>{
                                            dbCompany.password=hashedPass;
                                            return dbCompany;
                                        })
                            }
                            else{
                                return dbCompany;
                            }
                        })
                        .then(dbCompany=>{
                            return dbCompany.update({name:company.name,mail:company.mail,phone:company.phone,credit:company.credit,password:dbCompany.password},{transaction:t})
                        })
                        .then(affectedRows=>{
                            if(affectedRows===0)
                            {
                                throw new Error();
                            }
                        })
            })
            .then(()=>{
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
    }
    catch(err)
    {
        res.sendStatus(400);
    }
}

CompanyController.getOneCompany=function(req,res){
    if(req.user.role!=="admin"){
        res.sendStatus(401);
        return;
    }
    try{
        models.user.findByPk(req.params.id).then(result=>{
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

CompanyController.deleteCompany=function(req,res){
    if(req.user.role!=="admin"){
        res.sendStatus(401);
        return;
    }
    try{
        models.user.findByPk(req.params.id).then(company=>{
            if(company){
                company.update({status:"passive"})
                .then(result=>{
                    res.sendStatus(200);
                    return;
                })
            }
            else{
                res.sendStatus(400);
                return;
            }
        })
        .catch(err=>{
            res.sendStatus(400);
        });
    }
    catch(err){
        res.sendStatus(400);
    }
}

CompanyController.setStatus=(req,res)=>{
    const {id}=req.params;
    const {status}=req.body;
    if(!status)
    {
        res.sendStatus(400);   
    }
    models.user.update({
        status,
        }, {
        where: {
            id: {[Op.eq]: id}
        }
    }).then(result=>{
        if(result>0){
            res.sendStatus(200);
        }
        else{
            res.sendStatus(400);
        }
    })
    .catch(err=>{
        res.sendStatus(400);
    });
}

CompanyController.getEmployees=function(req,res){
    if(req.user.role==="admin" || (req.user.role==="company" && req.user.id===parseInt(req.params.id) && req.user.status==="active")){
        let companyId=req.user.id;
        if(req.user.role==="admin"){
            companyId=req.params.id;//this is the company id
        }
        try{
            models.user.findAll(
                {
                    where:{
                        role:"employee",
                        companyId:companyId
                    },
                    include: [{
                        model: models.testSession,
                        attributes: ["personalityType", "wingType", "altType","stage"]
                    }],
                }).then(result=>{
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
    else{
        res.sendStatus(401);
        return;
    }
}




module.exports = CompanyController;