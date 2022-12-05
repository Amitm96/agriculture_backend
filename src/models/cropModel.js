const mongoose = require("mongoose");

const cropSchema = new mongoose.Schema({
    cropName : String ,
    seasons : String ,
    cycle : {type : String , enum : ["soil preparation", "sowing", "irrigation", "harvesting"]}
}, {timestamps : true})

module.exports = mongoose.model("crop" , cropSchema)