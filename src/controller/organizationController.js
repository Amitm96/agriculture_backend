const organizationModel = require("../models/organizationModel");
const jwt = require("jsonwebtoken")

async function registerOrganization(req, res) {
    try {
        let { name, email, password } = req.body
        if (!name) {
            return res.status(400).send({ status: false, msg: "please enter name" })
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

        let existemail = await organizationModel.findOne({ email: email })
        if (existemail) {
            return res.status(400).send({ status: false, msg: "this email is already resister in our Database" })
        }
        if (!password) {
            return res.status(400).send({ status: false, msg: " please enter password" })

        }
        if (password.trim().length < 8 || password.trim().length > 20) {
            return res.status(400).send({ status: false, msg: " password length must be 8-20 character long" })
        }

        let organz = await organizationModel.create({ name: name, email: email, password: password })
        return res.status(201).send({ status: true, msg: organz })
    }
    catch (err) {
        return res.status(500).send({ status: false, msg: err.message })
    }
}

async function login(req, res) {
    try {
        let { email, password } = req.body
        if (!email.trim()) {
            return res.status(400).send({ status: false, msg: " please enter email" })
        }
        if (!password.trim()) {
            return res.status(400).send({ status: false, msg: " please enter password" })
        }
        let organization = await organizationModel.findOne({ email: email, password: password })
        if (!organization) {
            return res.status(401).send({ status: false, msg: "please enter correct credential" })
        }
        let token = jwt.sign({
            organzId: organization._id.toString(),
            iat: Math.floor(Date.now() / 1000),
            exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24
        } , "agricultureassignmentorganization");
        return res.status(200).send({status : true , msg : token})
    }
    catch (err) {
        return res.status(500).send({ status: false, msg: err.message })
    }
}

async function listOrganization(req , res){
    try{
        let allOrganization = await organizationModel.find()
        if(allOrganization.length <= 0){
            return res.status(200).send({status: true , msg : "No organization is listed"})
        }
        return res.status(200).send({status: true , msg : allOrganization})
    }
    catch(err){
        return res.status(500).send({status : false , msg : err.message})
    }
}

module.exports = {registerOrganization , login , listOrganization}