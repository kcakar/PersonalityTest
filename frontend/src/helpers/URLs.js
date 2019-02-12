const server="http://localhost:3001/api/v1";

const urls={
    homepage:"/enneagram",
    intro:"/enneagram/Test",
    test:"/enneagram/Test/Start",
    results:"/enneagram/Test/Results",
    customerPanel:"/enneagram/Management",
    adminPanel:"/enneagram/Admin",
    login:"/enneagram/login",
    api:{
        auth:{
            login:server+"/auth/login",
            verifyToken:server+"/auth/verify"
        },
        company:{
            create:server+"/company/"
        }
    },

}

module.exports=urls;