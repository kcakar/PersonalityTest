const models=require('../models');

const CompanyController={};


CompanyController.getAllCompanies=function(req,res){
    res.send("NOT IMPLEMENTEDGET");
}

CompanyController.createCompany=function(req,res){
    console.log(req)

}

CompanyController.getOneCompany=function(req,res){
    res.send("NOT IMPLEMENTED");
}

CompanyController.updateCompany=function(req,res){
    res.send("NOT IMPLEMENTED");
}

CompanyController.deleteCompany=function(req,res){
    res.send("NOT IMPLEMENTED");
}
module.exports = CompanyController;