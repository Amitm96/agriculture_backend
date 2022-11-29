import mongoose from "mongoose";

const cropSchema = new mongoose.Schema({
    cropName : String ,
    cycle : {type : String , enum : ["soil preparation", "sowing", "adding manure and fertilizers", "irrigation", "harvesting and storage"]}
}, {timestamps : true})

module.exports = mongoose.model("crop" , cropSchema)