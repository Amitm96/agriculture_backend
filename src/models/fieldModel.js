const mongoose = require("mongoose");

const fieldSchema = new mongoose.Schema(
    {
        size : String ,
        latitude : String ,
        longitude : String , 
        cropId : {type : mongoose.Schema.Types.ObjectId , ref : "crop"}
    } , {timestamps : true}
)

module.exports = mongoose.model("field" , fieldSchema)