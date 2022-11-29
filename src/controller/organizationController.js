import organizationModel  from "../models/organizationModel";

async function registerOrganization(req , res){
    try{
    let {name , email , password} = req.body
    if (!name) {
        return res.status(400).send({ status: false, msg: "please enter fname" })
    }

    if (!/^[a-zA-Z ,.]*$/.test(name.trim())) {
        return res.status(400).send({ status: false, msg: "enter a valid name" })

    }
    if (!email) {
        return res.status(400).send({ status: false, msg: " please enter email" })
    }

    if (!/^([0-9a-z]([-_\\.]*[0-9a-z]+)*)@([a-z]([-_\\.]*[a-z]+)*)[\\.]([a-z]{2,9})+$/.test(email)) {
        return res.status(400).send({ status: false, message: "Entered email is invalid" });
    }

    let existemail = await userModel.findOne({ email: email })
    if (existemail) {
        return res.status(400).send({ status: false, msg: "this email is already resister in our Database" })
    }
    if (!password) {
        return res.status(400).send({ status: false, msg: " please enter password" })

    }
    if(password.trim().length < 8 || password.trim().length > 20){
        return res.status(400).send({ status: false, msg: " password length must be 8-20 character long" })
    }

    let organz = await organizationModel.create({name : name , email : email , password : password})
    return res.status(201).send({status : true , msg : organz})
    }
    catch(err){
        return res.status(500).send({status: false , msg : err.message})
    }
}