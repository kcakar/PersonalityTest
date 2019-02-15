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
            requestData,
            decision
        }),
    }).then(response=>{
        if(response.ok)
        {
            
        }
        else{
            throw Object.assign(new Error("Test isteği ile ilgili bir hata oluştu."),{ code: 402 });
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