const models=require('../models');
const Sequelize = require('sequelize');

const Op = Sequelize.Op;

const SettingsController={};


SettingsController.getOptionsByLanguage=function(req,res){
    if(req.user.role!=="admin"){
        res.sendStatus(401);
        return;
    }
    try{
        models.testOption.findAll(
            {
                attributes:["id","language","option1","option2","option3","option4","option5"],
                where:{
                    language:{[Op.eq]:req.params.language}
                }
            }
        ).then(result=>{
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

SettingsController.updateCreateOptions=function(req,res){
    if(req.user.role!=="admin"){
        res.sendStatus(401);
        return;
    }
    try{
        const {options} = req.body;

        models.testOption.findOne({where:{language:options.language}})
        .then(dbOption=>{
            if(!dbOption){
                
                return models.testOption.create({...options}).then();
            }
            else{
                return dbOption.update({...options},{where:{language:options.languge}});
            }
        })
        .then(r=>{
            res.sendStatus(200);
        })
        .catch(err=>{
            res.status(400).json({error:err});
        });
    }
    catch(err){
        res.sendStatus(400);
    }
}

module.exports = SettingsController;