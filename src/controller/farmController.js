const farmModel = require("../models/farmModel");
const fieldModel = require("../models/fieldModel")
const cropModel = require("../models/cropModel")
async function registerFirm(req, res) {
    try {
        const { name, region, crop, field } = req.body
        if (!name.trim()) {
            return res.status(400).send({ status: false, msg: "Please enter farm name" })
        }
        if (!/^[a-zA-Z0-9 ,.]*$/.test(name.trim())) {
            return res.status(400).send({ status: false, msg: "enter a valid farm name" })
        }
        if (!region.name.trim()) {
            return res.status(400).send({ status: false, msg: "Please enter region name" })
        }
        if (!/^[a-zA-Z ,.]*$/.test(region.name.trim())) {
            return res.status(400).send({ status: false, msg: "enter a valid region name" })
        }
        if (!region.subregion) {
            return res.status(400).send({ status: false, msg: "please provide subregion" })
        }
        if (!region.subregion.name.trim()) {
            return res.status(400).send({ status: false, msg: "Please enter subregion name" })
        }
        if (!/^[a-zA-Z ,.]*$/.test(region.subregion.name.trim())) {
            return res.status(400).send({ status: false, msg: "enter a valid subregion name" })
        }
        if(!crop){
            return res.status(400).send({status : false , msg : "please provide crop details"})
        }
        if(!crop.cropName.trim()){
            return res.status(400).send({status : false , msg : "please provide cropName"})
        }
        if (!/^[a-zA-Z ,.]*$/.test(crop.cropName.trim())) {
            return res.status(400).send({ status: false, msg: "enter a valid crop name" })
        }
        let cycles = {"soil preparation":1, "sowing":1,  "irrigation":1, "harvesting": 1}
        if(!crop.cycle.trim()){
            return res.status(400).send({status : false , msg : "enter crop cycle"})
        }
        if(!cycles.hasOwnProperty(crop.cycle.trim())){
            return res.status(400).send({status : false , msg: `cycle must be from ${cycles} this list`})
        }
        if(!crop.seasons.trim()){
            return res.status(400).send({status : false , msg : "please provide season"})
        }
        let ncrop;
        ncrop = await cropModel.findOne({cropName : crop.cropName.trim() , seasons : crop.seasons.trim(),  cycle : crop.cycle.trim()})
        if(!ncrop){
        ncrop = await cropModel.create({cropName : crop.cropName.trim() , seasons : crop.seasons.trim(),  cycle : crop.cycle.trim()})
        }
        let latregx = /^[\+-]?(([1-8]?\d)\D+([1-5]?\d|60)\D+([1-5]?\d|60)(\.\d+)?|90\D+0\D+0)\D+[NSns]?$/
        let longregx = /^[\+-]?([1-7]?\d{1,2}\D+([1-5]?\d|60)\D+([1-5]?\d|60)(\.\d+)?|180\D+0\D+0)\D+[EWew]?$/
        if(!field){
            return res.status(400).send({status : false , msg : "Enter field details"})
        }
        if(!field.size.trim()){
            return res.status(400).send({status : false , msg : "please provide field size"})
        }
        if(!/^[0-9.]/.test(field.size.trim())){
            return res.status(400).send({status: false , msg : "please provide valid field size"})
        }
        if(!field.latitude.trim()){
            return res.status(400).send({status : false , msg : "please provide latitude of the field"})
        }
        if(!latregx.test(field.latitude.trim())){
            return res.status(400).send({status : false , msg : "please provide valid latitude of the field"})
        }
        if(!field.longitude.trim()){
            return res.status(400).send({status : false , msg : "please provide longitude of the field"})
        }
        if(!longregx.test(field.longitude.trim())){
            return res.status(400).send({status : false , msg : "please provide valid longitude of the field"})
        }

        let efield = await fieldModel.findOne({longitude : field.longitude.trim() , latitude : field.latitude.trim()})
        let orgid = req.orgid
        if(efield){
            let farm = await farmModel.create({name : name.trim() , region : {name : region.name.trim() , subregion : {name : region.subregion.name.trim() , fieldId: efield._id}} , organzId : orgid})
            return res.status(200).send({status : true , msg : farm})
        }
        let nfield = await fieldModel.create({size : field.size.trim()+"acre" , latitude : field.latitude.trim() , longitude : field.longitude.trim() , cropId : ncrop._id})
        let farm = await farmModel.create({name : name.trim() , region : {name : region.name.trim() , subregion : {name : region.subregion.name.trim() , fieldId: nfield._id}} , organzId : orgid})
        return res.status(200).send({status : true , msg : farm})

    }
    catch (err) {
        return res.status(500).send({ status: false, msg: err.message })
    }

}

async function getFirmWithCrop(req , res){
    let crop = req.params.cropId
    let fields = await fieldModel.find({cropId : crop}).select({_id : 1})
    let farms = await farmModel.find({"region.subregion.fieldId" : {$in : fields}})
    let message;
    if(farms.length == 0){
        message = "no firm present with this crop"
    }
    else{
        message = farms
    }
    return res.status(200).send({status : true , msg : message})
}

module.exports = {registerFirm , getFirmWithCrop}