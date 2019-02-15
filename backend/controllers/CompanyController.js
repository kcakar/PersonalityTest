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
        models.company.findAll().then(result=>{
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

//create a company and a user for the company
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
            company.status="active";
            let companyUser=models.user.build({
                email:company.mail,
                password:company.password,
                name:company.name,
                role:"company",
                companyId:null
            })

            models.company.create({...company}).then((savedCompany)=>{
                companyUser.companyId=savedCompany.id;

                models.user.getHashPassword(companyUser.password)
                .then(hashedPassword=>{
                    companyUser.password=hashedPassword;
                    return companyUser;
                })
                .then(companyUser=>companyUser.save())
                .then(test=>{
                    res.send(test);
                }).catch(error=>{
                    models.company.destroy({
                        where:{
                            id:savedCompany.id
                        }
                    });
                    res.send(error);
                });
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

CompanyController.getOneCompany=function(req,res){
    if(req.user.role!=="admin"){
        res.sendStatus(401);
        return;
    }
    try{
        models.company.findByPk(req.params.id).then(result=>{
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

CompanyController.updateCompany=function(req,res){
    res.send("NOT IMPLEMENTED");
}

CompanyController.deleteCompany=function(req,res){
    if(req.user.role!=="admin"){
        res.sendStatus(401);
        return;
    }
    try{
        models.company.findByPk(req.params.id).then(company=>{
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
    models.company.update({
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

module.exports = CompanyController;