const server="http://localhost:3001/api/v1";

const api={
    auth:{
        login:server+"/auth/login",
        verifyToken:server+"/auth/verify"
    }
}

module.exports=api;