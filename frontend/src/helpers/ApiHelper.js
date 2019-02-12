import urls from './URLs';

const ajaxSettings= (token)=> 
 ({
    // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, cors, *same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "same-origin", // include, *same-origin, omit
    headers: {
        "Content-Type": "application/json",
        'Authorization': 'Bearer '+token,
        // "Content-Type": "application/x-www-form-urlencoded",
    },
    redirect: "follow", // manual, *follow, error
    referrer: "no-referrer", // no-referrer, *client,
});

const createCompany=(company,token)=>{
    return fetch(urls.api.company.create,
    {
        ...ajaxSettings(token),
        method: "POST",
        body: JSON.stringify({company}), 
    })
}

const getAllCompanies=(token)=>{
    return fetch(urls.api.companies.get,
        {
            method: "GET",
            ...ajaxSettings(token),
        })
}

const ApiHelper={
    company:{
        create:createCompany
    },
    companies:{
        get:getAllCompanies
    }
}

export default ApiHelper;