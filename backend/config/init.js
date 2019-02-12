const models=require('../models');

console.log("INITTTT")
console.log("INITTTT")
console.log("INITTTT")
console.log("INITTTT")
console.log("INITTTT")
console.log("INITTTT")
console.log("INITTTT")
console.log("INITTTT")
console.log("INITTTT")
console.log("INITTTT")
console.log("INITTTT")
console.log("INITTTT")
console.log("INITTTT")
console.log("INITTTT")
console.log("INITTTT")
console.log("INITTTT")
console.log("INITTTT")
console.log("INITTTT")
console.log("INITTTT")
let user=models.user.build({
    email:"kcakar",
    name:"Keremcan Çakar",
    password:"kerempass",
    title:"Web Developer",
    testDate:null,
    personalityType:"-1",
    wingType:"-1",
    role:"admin"
});

models.user.getHashPassword(user.password)
.then(hashedPassword=>{
    user.password=hashedPassword;
    return user;
})
.then(user=>user.save())
.catch(err=>{console.log("couldntsavefirstuser")});