const server="http://localhost:3001/api/v1";

const urls={
    homepage:"/enneagram",
    intro:"/enneagram/Test",
    test:"/enneagram/Test/Start",
    results:"/enneagram/Test/Results",
    customerPanel:(id="")=>`/enneagram/Management/${id}`,
    adminPanel:()=>"/enneagram/Admin",
    login:"/enneagram/login",
    api:{
        auth:{
            login:server+"/auth/login",
            verifyToken:server+"/auth/verify"
        },
        company:{
            create:server+"/company/",
            changeStatus:(id)=>`${server}/company/${id}/status`,
            update:(id)=>`${server}/company/${id}/`
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
        },
        statistics:{
            getAdmin:()=>`${server}/admin-statistics/`,
            getCustomer:(companyId)=>`${server}/customer-statistics/${companyId}`,
        },
        settings:{
            getTestOptionsByLanguage:(language)=>`${server}/settings/test-options/${language}`,
            updateCreateOptions:()=>`${server}/settings/test-options/`
        },
        employee:{
            getEmployees:(companyId)=>`${server}/company/${companyId}/employees/`
        },
        test:{
            create:(companyId)=>`${server}/company/${companyId}/test/`
        }
    },

}

module.exports=urls;