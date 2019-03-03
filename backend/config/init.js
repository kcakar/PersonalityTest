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
    mail: "aalcicek",
    name: "Abdullah Alçiçek",
    password: "Akademi&Tria5548",
    title: "",
    testDate: null,
    personalityType: "-1",
    wingType: "-1",
    role: "admin",
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

    let user3 = models.user.build({
      mail: "aalcicek",
      name: "Abdullah Alçiçek",
      password: "Akademi&Tria5548",
      title: "",
      testDate: null,
      personalityType: "-1",
      wingType: "-1",
      role: "admin",
      status:"active",
      credit:50
    });
    
    models.user
      .getHashPassword(user3.password)
      .then(hashedPassword => {
        user3.password = hashedPassword;
        return user3;
      })
      .then(user => user3.save())
      .catch(err => {
        console.log("couldntsavefirstuser");
      });
  

      let user4 = models.user.build({
        mail: "tbakgun",
        name: "Tuğba Akgün",
        password: "Akademi&Tria4855",
        title: "",
        testDate: null,
        personalityType: "-1",
        wingType: "-1",
        role: "admin",
        status:"active",
        credit:50
      });
      
      models.user
        .getHashPassword(user4.password)
        .then(hashedPassword => {
          user4.password = hashedPassword;
          return user4;
        })
        .then(user => user4.save())
        .catch(err => {
          console.log("couldntsavefirstuser");
        });

        let user5 = models.user.build({
          mail: "mozdemir",
          name: "Muhammet Özdemir",
          password: "Akademi&Tria5485",
          title: "",
          testDate: null,
          personalityType: "-1",
          wingType: "-1",
          role: "admin",
          status:"active",
          credit:50
        });
        
        models.user
          .getHashPassword(user5.password)
          .then(hashedPassword => {
            user5.password = hashedPassword;
            return user5;
          })
          .then(user => user5.save())
          .catch(err => {
            console.log("couldntsavefirstuser");
          });

          let user6 = models.user.build({
            mail: "acarkan",
            name: "İsmail Acarkan",
            password: "Akademi&Tria8554",
            title: "",
            testDate: null,
            personalityType: "-1",
            wingType: "-1",
            role: "admin",
            status:"active",
            credit:50
          });
          
          models.user
            .getHashPassword(user6.password)
            .then(hashedPassword => {
              user6.password = hashedPassword;
              return user6;
            })
            .then(user => user6.save())
            .catch(err => {
              console.log("couldntsavefirstuser");
            });
      
    
  