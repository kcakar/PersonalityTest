import urls from './URLs';

//functions
const createCompany = (company) => {
    return fetch(urls.api.company.create, {
        ...ApiHelper.ajaxSettings(),
        method: "POST",
        body: JSON.stringify({
            company
        }),
    }).then(response=>{
        return response.json();
    })
    .catch(err=>{
        throw Object.assign(new Error("Şirket eklenemedi"),{ code: 402 });
    })
}

const updateCompany=(company,isNewPass,newPass)=>{
    return fetch(urls.api.company.update(company.id), {
        ...ApiHelper.ajaxSettings(),
        method: "POST",
        body: JSON.stringify({
            company,
            isNewPass,
            newPass
        }),
    })
    .then(response=>{
        return response.ok?response:response.json()
    })
    .catch(err=>{
        throw Object.assign(new Error("Şirket düzenlenemedi"),{ code: 402 });
    })
}

const getAllCompanies = () => {
    return fetch(urls.api.companies.get, {
        method: "GET",
        ...ApiHelper.ajaxSettings(),
    }).then(response=>{
        if(response.ok)
        {
            return response.json();
        }
        else{
            throw Object.assign(new Error("Şirketlere ulaşılamadı"),{ code: 402 });
        }
    })
}

const changeCompanyStatus = (id, status) => {
    return fetch(urls.api.company.changeStatus(id), {
        method: "POST",
        ...ApiHelper.ajaxSettings(),
        body: JSON.stringify({
            status
        }),
    }).then(response=>{
        if(!response.ok)
        {
            throw Object.assign(new Error("Şirket durumu değiştirilemedi"),{ code: 402 });
        }
    })
}

const getQuestion = (id) =>{
    return fetch(urls.api.question.get(id), {
        ...ApiHelper.ajaxSettings(),
        method: "GET",
    }).then(response=>{
        if(response.ok)
        {
            return response.json();
        }
        else{
            throw Object.assign(new Error("Soruya ulaşılamadı"),{ code: 402 });
        }
    })
}

const getAllByLanguageQuestion = (lang) =>{
    return fetch(urls.api.questions.getByLanguage(lang), {
        ...ApiHelper.ajaxSettings(),
        method: "GET",
    }).then(response=>{
        if(response.ok)
        {
            return response.json();
        }
        else{
            throw Object.assign(new Error("Sorulara ulaşılamadı"),{ code: 402 });
        }
    })
}

const getByLanguageAndOrderQuestion = (lang,order) =>{
    return fetch(urls.api.questions.getByLanguageAndOrder(lang,order), {
        ...ApiHelper.ajaxSettings(),
        method: "GET",
    }).then(response=>{
        if(response.ok)
        {
            return response.json();
        }
        else{
            throw Object.assign(new Error("Soruya ulaşılamadı"),{ code: 402 });
        }
    })
}

const createOrUpdateQuestion = (question) =>{
    return fetch(urls.api.question.create(question), {
        method: "POST",
        ...ApiHelper.ajaxSettings(),
        body: JSON.stringify({
         question   
        }),
    }).then(response=>{
        if(response.ok)
        {
            return response.json();
        }
        else{
            throw Object.assign(new Error("Soru düzenlenemedi"),{ code: 402 });
        }
    })
}

const createCreditRequest=(creditRequest)=>{
    return fetch(urls.api.creditRequest.create(), {
        method: "POST",
        ...ApiHelper.ajaxSettings(),
        body: JSON.stringify({
            creditRequest:creditRequest   
        }),
    }).then(response=>{
        if(response.ok)
        {
            return response.json();
        }
        else{
            throw Object.assign(new Error("Test hakkı isteği başarısız oldu."),{ code: 402 });
        }
    })
}

const getAllCreditRequests=()=>{
    return fetch(urls.api.creditRequest.getAll(), {
        method: "GET",
        ...ApiHelper.ajaxSettings()
    }).then(response=>{
        if(response.ok)
        {
            return response.json();
        }
        else{
            throw Object.assign(new Error("Test isteklerine ulaşılamadı."),{ code: 402 });
        }
    })
}

const approveRejectCreditRequest=(requestData,decision)=>{
        return fetch(urls.api.creditRequest.approveReject(requestData.id), {
        method: "POST",
        ...ApiHelper.ajaxSettings(),
        body: JSON.stringify({
            decision
        }),
    }).then(response=>{
        if(!response.ok)
        {
            throw Object.assign(new Error("Test isteği ile ilgili bir hata oluştu."),{ code: 402 });
        }
    })
}

const getAdminStatistics=()=>{
    return fetch(urls.api.statistics.getAdmin(), {
        method: "GET",
        ...ApiHelper.ajaxSettings()
    }).then(response=>{
        if(response.ok)
        {
            return response.json();
        }
        else{
            throw Object.assign(new Error("İstatistiklere ulaşılamadı."),{ code: 402 });
        }
    })
}

const getCustomerStatistics=(companyId)=>{
    return fetch(urls.api.statistics.getCustomer(companyId), {
        method: "GET",
        ...ApiHelper.ajaxSettings()
    }).then(response=>{
        if(response.ok)
        {
            return response.json();
        }
        else{
            throw Object.assign(new Error("İstatistiklere ulaşılamadı."),{ code: 402 });
        }
    })
}

const getTestOptions=(language)=>{
    return fetch(urls.api.settings.getTestOptionsByLanguage(language), {
        method: "GET",
        ...ApiHelper.ajaxSettings()
    }).then(response=>{
        if(response.ok)
        {
            return response.json();
        }
        else{
            throw Object.assign(new Error("Şıklara ulaşılamadı."),{ code: 402 });
        }
    })
}

const updateCreateTestOptions=(options)=>{
    return fetch(urls.api.settings.updateCreateOptions(options), {
        method: "POST",
        ...ApiHelper.ajaxSettings(),
        body: JSON.stringify({
            options
        }),
    }).then(response=>{
        if(!response.ok)
        {
            throw Object.assign(new Error("Şıklar güncellenemedi."),{ code: 402 });
        }
    })
}

const getCompanyEmployees=()=>{
    return fetch(urls.api.employee.getEmployees(ApiHelper.user.id), {
        method: "GET",
        ...ApiHelper.ajaxSettings()
    }).then(response=>{
        if(response.ok)
        {
            return response.json();
        }
        else{
            throw Object.assign(new Error("Çalışanlara ulaşılamadı."),{ code: 402 });
        }
    })
}

const getCompanyEmployeesAdmin=(companyId)=>{
    return fetch(urls.api.employee.getEmployees(companyId), {
        method: "GET",
        ...ApiHelper.ajaxSettings()
    }).then(response=>{
        if(response.ok)
        {
            return response.json();
        }
        else{
            throw Object.assign(new Error("Çalışanlara ulaşılamadı."),{ code: 402 });
        }
    })
}

const sendTest=(companyId,testSession)=>{
    return fetch(urls.api.test.create(companyId), {
        method: "POST",
        ...ApiHelper.ajaxSettings(),
        body: JSON.stringify({
            testSession
        }),
    }).then(response=>{
        if(!response.ok)
        {
            if(response.status===412)
            {
                return response.json().then(data=>{
                    throw Object.assign(new Error(data.message),{ code: 402 });
                })
            }else{
                throw Object.assign(new Error("Test isteği ile ilgili bir hata oluştu."),{ code: 402 });
            }
        }
    })
}

const updateTest=(testSession)=>{
    return fetch(urls.api.test.update(ApiHelper.user.id), {
        method: "POST",
        ...ApiHelper.ajaxSettings(),
        body: JSON.stringify({
            testSession
        }),
    }).then(response=>{
        if(!response.ok)
        {
            if(response.status===412)
            {
                return response.json().then(data=>{
                    throw Object.assign(new Error(data.message),{ code: 402 });
                })
            }else{
                throw Object.assign(new Error("Test ile ilgili bir hata oluştu."),{ code: 402 });
            }
        }
    })
}

const saveWingType=(testSession,option)=>{
    return fetch(urls.api.test.saveWingType(ApiHelper.user.id), {
        method: "POST",
        ...ApiHelper.ajaxSettings(),
        body: JSON.stringify({
            testSession,
            option
        }),
    }).then(response=>{
        if(!response.ok)
        {
            if(response.status===412)
            {
                return response.json().then(data=>{
                    throw Object.assign(new Error(data.message),{ code: 402 });
                })
            }else{
                throw Object.assign(new Error("Test ile ilgili bir hata oluştu."),{ code: 402 });
            }
        }
    })
}

const saveStage4Answer=(option)=>{
    return fetch(urls.api.test.saveStage4Answer(ApiHelper.user.id), {
        method: "POST",
        ...ApiHelper.ajaxSettings(),
        body: JSON.stringify({
            option
        }),
    }).then(response=>{
        if(!response.ok)
        {
            if(response.status===412)
            {
                return response.json().then(data=>{
                    throw Object.assign(new Error(data.message),{ code: 402 });
                })
            }else{
                throw Object.assign(new Error("Test ile ilgili bir hata oluştu."),{ code: 402 });
            }
        }
    })
}

const checkUsername=(username)=>{
    return fetch(urls.api.employee.checkUsername(), {
        method: "POST",
        ...ApiHelper.ajaxSettings(),
        body: JSON.stringify({
            username
        }),
    }).then(response=>{
        if(!response.ok)
        {
            throw Object.assign(new Error("Kullanıcı adı kontrol edilemedi."),{ code: 402 });
        }
        else{
            return response.json();
        }
    })
}

const saveAnswer=(answer,nextQuestionId)=>{
    return fetch(urls.api.test.saveTestAnswer(ApiHelper.user.id), {
        ...ApiHelper.ajaxSettings(),
        method: "POST",
        body: JSON.stringify({
            answer,
            nextQuestionId
        }),
    }).then(response=>{
        if(!response.ok)
            throw Object.assign(new Error("Cevap kaydedilemedi"),{ code: 402 });
    })
}

const saveAnswerOnly=(option)=>{
    return fetch(urls.api.test.saveTestAnswerOnly(ApiHelper.user.id), {
        ...ApiHelper.ajaxSettings(),
        method: "POST",
        body: JSON.stringify({
            option
        }),
    }).then(response=>{
        if(!response.ok)
            throw Object.assign(new Error("Cevap kaydedilemedi"),{ code: 402 });
    })
}

const getStage=(lang,deniedOptions)=>{
    return fetch(urls.api.test.getStage(ApiHelper.user.id,lang), {
        ...ApiHelper.ajaxSettings(),
        method: "POST",
        body: JSON.stringify({
            deniedOptions
        }),
    }).then(response=>{
        if(response.ok)
        {
            return response.json();
        }
        else{
            throw Object.assign(new Error("Sorulara ulaşılamadı"),{ code: 402 });
        }
    })
}

const getResults=(empoyeeId)=>{
    return fetch(urls.api.test.getResults(ApiHelper.user.id), {
        ...ApiHelper.ajaxSettings(),
        method: "POST",
    }).then(response=>{
        if(response.ok)
        {
            return response.json();
        }
        else{
            throw Object.assign(new Error("Sonuçlara ulaşılamadı"),{ code: 402 });
        }
    })
}

const getEmployeeAnswers=(employeeId)=>{
    return fetch(urls.api.employee.getAnswers(employeeId), {
        ...ApiHelper.ajaxSettings(),
        method: "POST",
    }).then(response=>{
        if(response.ok)
        {
            return response.json();
        }
        else{
            throw Object.assign(new Error("Sonuçlara ulaşılamadı"),{ code: 402 });
        }
    })
}

//helper
let ApiHelper = {}

ApiHelper.token = "";

ApiHelper.user={};

ApiHelper.functions = {
    company: {
        create: createCompany,
        changeStatus: changeCompanyStatus,
        update:updateCompany,
        employees:getCompanyEmployees,
        employeesAdmin:getCompanyEmployeesAdmin
    },
    companies: {
        get: getAllCompanies
    },
    question:{
        get:getQuestion,
        getAllByLanguage:getAllByLanguageQuestion,
        getByLanguageAndOrder:getByLanguageAndOrderQuestion,
        createOrUpdate:createOrUpdateQuestion,
    },
    creditRequest:{
        create:createCreditRequest,
        get:getAllCreditRequests,
        approveReject:approveRejectCreditRequest,
    },
    statistics:{
        getAdmin:getAdminStatistics,
        getCustomer:getCustomerStatistics
    },
    settings:{
        getTestOptions:getTestOptions,
        updateCreateTestOptions:updateCreateTestOptions
    },
    test:{
        send:sendTest,
        saveAnswer:saveAnswer,
        update:updateTest,
        getStage:getStage,
        getResults:getResults,
        saveAnswerOnly:saveAnswerOnly,
        saveWingType:saveWingType,
        saveStage4Answer:saveStage4Answer
    },
    employee:{
        checkUsername:checkUsername,
        getAnswers:getEmployeeAnswers
    }
}

ApiHelper.ajaxSettings = () => ({
    mode: "cors", // no-cors, cors, *same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "same-origin", // include, *same-origin, omit
    headers: {
        "Content-Type": "application/json",
        'Authorization': 'Bearer ' + ApiHelper.token,
        // "Content-Type": "application/x-www-form-urlencoded",
    },
    redirect: "follow", // manual, *follow, error
    referrer: "no-referrer", // no-referrer, *client,
})



export default ApiHelper;