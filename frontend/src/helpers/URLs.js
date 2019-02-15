const server="http://localhost:3001/api/v1";

const urls={
    homepage:"/enneagram",
    intro:"/enneagram/Test",
    test:"/enneagram/Test/Start",
    results:"/enneagram/Test/Results",
    customerPanel:(id="")=>`/enneagram/Management/${id}`,
    adminPanel:"/enneagram/Admin",
    login:"/enneagram/login",
    api:{
        auth:{
            login:server+"/auth/login",
            verifyToken:server+"/auth/verify"
        },
        company:{
            create:server+"/company/",
            changeStatus:(id)=>`${server}/company/${id}/status`
        },
        companies:{
            get:server+"/companies/"
        },
        question:{
            get:(id)=>`${server}/question/${id}`,
            create:()=>`${server}/question`,
            update:(id)=>`${server}/question/${id}`,
        },
        questions:{
            getByLanguage:(lang)=>`${server}/questions/${lang}`,
            getByLanguageAndOrder:(lang,order)=>`${server}/${lang}/${order}`,
        },
        creditRequest:{
            create:()=>`${server}/credit-request/`,
            getAll:()=>`${server}/credit-request/`,
            approveReject:(id)=>`${server}/credit-request/${id}/`
        }
    },

}

module.exports=urls;