const server="https://personality-test-kcakar.herokuapp.com/api/v1";
// const server="http://localhost:3001/api/v1";
const webpage="https://triaakademi.com/";

const urls={
    webpage,
    server,
    homepage:"/",
    test:"/Test",
    results:"/Test/Results",
    customerPanel:(id="")=>`/Management/${id}`,
    adminPanel:()=>"/Admin",
    login:"/login",
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
            getEmployees:(companyId)=>`${server}/company/${companyId}/employees/`,
            checkUsername:()=>`${server}/user/username/`
        },
        test:{
            create:(companyId)=>`${server}/company/${companyId}/test/`,
            update:(employeeId)=>`${server}/employee/${employeeId}/test/`,
            saveTestAnswer:(employeeId)=>`${server}/employee/${employeeId}/answer/`,
            getStage:(employeeId,lang)=>`${server}/employee/${employeeId}/stage/${lang}`,
            getResults:(employeeId)=>`${server}/employee/${employeeId}/results/`
        }
    },

}

module.exports=urls;