const cropModel = require("../models/cropModel")

async function updateCropCycleSeasons(req , res){
    try{
    let cropid = req.params.cropId
    let {cycle , seasons} = req.body
    let crop = cropModel.findById(cropid)
    let cycles = {"soil preparation":1, "sowing":1, "irrigation":1, "harvesting": 1}
        if(cycle.trim()){
            if(!cycles.hasOwnProperty(crop.cycle.trim())){
                return res.status(400).send({status : false , msg: `cycle must be from ${cycles} this list`})
            }
            crop.cycle = cycle
        }
        if(seasons.trim()){
            crop.seasons = seasons
        }
        await crop.save()
        return res.status(200).send({status : true , msg : crop})
    }
    catch(err){
        return res.status(500).send({status:false , msg : err.message})
    }
        
        
}

module.exports = {updateCropCycleSeasons}