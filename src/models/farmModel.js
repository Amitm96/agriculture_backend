const mongoose = require("mongoose")

const farmSchema = new mongoose.Schema({
    name : {type : String , require : true} ,
    region : {
        name : String ,
        subregion : {
            name : String,
            fieldId : {
                type : mongoose.Schema.Types.ObjectId , ref : "field"
            }
        }
    } ,
    organzId : {type : mongoose.Schema.Types.ObjectId , ref : "organization"}
})

module.exports = mongoose.model("farm" , farmSchema)