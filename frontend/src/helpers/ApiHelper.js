import urls from './URLs';

const createCompany=(company,token)=>{
    return fetch(urls.api.company.create,
    {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
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
        body: JSON.stringify({company}), // body data type must match "Content-Type" header
    })
}

const ApiHelper={
    company:{
        create:createCompany
    }
}

export default ApiHelper;