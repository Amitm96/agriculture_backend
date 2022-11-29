const express = require("express");
const route = require("./routes/route")
const mongoose = require("mongoose")
const app = express()

app.use(express.json())

app.use("/" , route)

mongoose.connect("mongodb+srv://Amitmaz96:5YOiTjMdLmeCiWAC@cluster1.mdpsbcj.mongodb.net/farmDb?retryWrites=true&w=majority" , {useNewUrlParser : true})
.then(() => console.log("MongoDb is connected"))
.catch((e) => console.log(e.message))

app.listen(3000 , () => console.log("Express app running on port 3000"))

