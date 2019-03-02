const models = require("../models");
const defaultQuestions=require("./questions");
console.log("INITTTT");
console.log("INITTTT");
console.log("INITTTT");
console.log("INITTTT");
console.log("INITTTT");
console.log("INITTTT");
console.log("INITTTT");
console.log("INITTTT");
console.log("INITTTT");
console.log("INITTTT");
console.log("INITTTT");
console.log("INITTTT");
console.log("INITTTT");
console.log("INITTTT");
console.log("INITTTT");
console.log("INITTTT");
console.log("INITTTT");
console.log("INITTTT");
console.log("INITTTT");


models.testOption.count().then(c => {
  if (c <= 0) {
    models.testOption
      .create({
        language: "tr",
        option1: "Kesinlikle katılmıyorum",
        option2: "Katılmıyorum",
        option3: "Kararsızım",
        option4: "Katılıyorum",
        option5: "Kesinlikle katılıyorum"
      })
      .then(r => {
        console.log("options created");
      })
      .catch(err => {
        console.log("options creation failure");
      });
  } else {
    console.log("options already there");
  }
});

models.question.count().then(c => {
  if (c <= 0) {
    models.question
      .bulkCreate(defaultQuestions.questions)
      .then(r => {
        console.log("questions created");
      })
      .catch(err => {
        console.log(err);
        console.log("question creation failure");
      });
  } else {
    console.log("question already there");
  }
});

let user = models.user.build({
  mail: "kcakar",
  name: "Keremcan Çakar",
  password: "kerempass",
  title: "Web Developer",
  testDate: null,
  personalityType: "-1",
  wingType: "-1",
  role: "admin",
  status:"active"
});

models.user
  .getHashPassword(user.password)
  .then(hashedPassword => {
    user.password = hashedPassword;
    return user;
  })
  .then(user => user.save())
  .catch(err => {
    console.log("couldntsavefirstuser");
  });

  let user2 = models.user.build({
    mail: "Hogarth",
    name: "Hogarth",
    password: "123456",
    title: "",
    testDate: null,
    personalityType: "-1",
    wingType: "-1",
    role: "company",
    status:"active",
    credit:50
  });
  
  models.user
    .getHashPassword(user2.password)
    .then(hashedPassword => {
      user2.password = hashedPassword;
      return user2;
    })
    .then(user => user2.save())
    .catch(err => {
      console.log("couldntsavefirstuser");
    });

    // let dbusers=[];
    // let dbanswers=[];
    // let dbsessions=[];
    // let dbcredit=[];

    // for(let i=0;i<1000;i++){
    //   dbusers.push({
    //     mail:"qwerqwerqwerqwerqwernqwerweqrqew"+i,
    //     name:"nqwerqwerqwerqwerqwerqwerqwerqwer"+i,
    //     title: "nqwerqwerqwerqwerqwerqwerqwerqwer",
    //     password:"jklşkjlşkjlşjk$2a$08$AMIRbtytue456cLQXJF9uOnUyn2kPtT8m3VqFibRJAtREfSno5Lmisdfgdsfgdsfgsdfg"+i,
    //     role: "employee",
    //     status:"active",
    //     credit:50,
    //     phone:"123412341234"
    //   })
    //     for(let j=0;j<100;j++)
    //     {
    //       dbanswers.push({
    //         selectedOption:"-2",
    //         userId:999,
    //         questionId:10,
    //       })
    //     }

    //     dbsessions.push({
    //       startDate:new Date(),
    //       stage:"4-2",
    //       personalityType:"9",
    //       wingType:"9",
    //       altType:"SOC",
    //       userId:1000,
    //       question:63
    //     })
    
    //     dbcredit.push({
    //       amount:1000,
    //       userId:1
    //     })
    // }

    // models.user.bulkCreate(dbusers)
    // .then(r=>models.userAnswer.create(dbanswers[0]))
    // .then(r=>models.userAnswer.bulkCreate(dbanswers.splice(0,100)))
    // .then(r=>models.userAnswer.bulkCreate(dbanswers.splice(0,100)))
    // .then(r=>models.userAnswer.bulkCreate(dbanswers.splice(0,100)))
    // .then(r=>models.userAnswer.bulkCreate(dbanswers.splice(0,100)))
    // .then(r=>models.userAnswer.bulkCreate(dbanswers.splice(0,100)))
    // .then(r=>models.userAnswer.bulkCreate(dbanswers.splice(0,100)))
    // .then(r=>models.userAnswer.bulkCreate(dbanswers.splice(0,100)))
    // .then(r=>models.userAnswer.bulkCreate(dbanswers.splice(0,100)))
    // .then(r=>models.userAnswer.bulkCreate(dbanswers.splice(0,100)))
    // .then(r=>models.userAnswer.bulkCreate(dbanswers.splice(0,100)))
    // .then(r=>models.testSession.bulkCreate(dbsessions))
    // .then(r=>models.creditRequest.bulkCreate(dbcredit))
    // .catch(e=>{
    //   console.log(e)
    // });


    console.log("all done");



