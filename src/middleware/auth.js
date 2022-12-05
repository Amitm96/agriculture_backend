const jwt = require("jsonwebtoken");

async function auth(req , res , next){
    try{
    let token = req.headers.token
    if(!token){
        return res.status(401).send({status : false , msg : "please provide token in  header"})
    }
    jwt.verify(token , "agricultureassignmentorganization" , (err , decodedtoken) => {
        if(err){
            return res.status(401).send({status : false , msg : err.message})
        }
        req.orgid = decodedtoken.organzId
        next()
    })
    }
    catch(err){
        return res.status(500).send({status : false , msg : err.message})
    }
}

module.exports = {auth}