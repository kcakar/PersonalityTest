const models=require('../models');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const StatisticController={};

StatisticController.getAdminStats=function(req,res){
    if(req.user.role!=="admin"){
        res.sendStatus(401);
        return;
    }
    try{
        let waitingCredit,sales,companies,completedTests=0;
        models.creditRequest.sum(
            "amount",
            {where:{
                status:{
                    [Op.eq]:"waiting"
                    }
            }
        }).then(result=>{
            waitingCredit=result || 0;
            return models.user.count({where:{role:"company"}})
        }).then(result=>{
            companies=result || 0;
            return models.user.count(
                {
                    where:{
                        testEndDate:{
                            [Op.ne]:null
                            }
                        }
            })
        })
        .then(result=>{
            completedTests=result || 0;
            return models.creditRequest.sum(
                "amount",
                {where:{
                    status:{
                        [Op.eq]:"accepted"
                        }
                }
            })
        })
        .then(result=>{
            sales=result || 0;
            res.json({waitingCredit,sales,companies,completedTests});
        })
        .catch(err=>{
            res.status(400).json({error:err});
        });
    }
    catch(err){
        res.sendStatus(400);
    }
}

module.exports = StatisticController;