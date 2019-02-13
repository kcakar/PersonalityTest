import urls from './URLs';

//functions
const createCompany = (company) => {
    return fetch(urls.api.company.create, {
        ...ApiHelper.ajaxSettings(),
        method: "POST",
        body: JSON.stringify({
            company
        }),
    })
}

const getAllCompanies = () => {
    return fetch(urls.api.companies.get, {
        method: "GET",
        ...ApiHelper.ajaxSettings(),
    })
}

const changeCompanyStatus = (id, status) => {
    return fetch(urls.api.company.changeStatus(id), {
        method: "POST",
        ...ApiHelper.ajaxSettings(),
        body: JSON.stringify({
            status
        }),
    })
}


//helper
let ApiHelper = {}

ApiHelper.token = "";

ApiHelper.functions = {
    company: {
        create: createCompany,
        changeStatus: changeCompanyStatus,
    },
    companies: {
        get: getAllCompanies
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