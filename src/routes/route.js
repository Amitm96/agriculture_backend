const express = require("express");
const route = express.Router();
const {registerOrganization , login , listOrganization} = require("../controller/organizationController")
const {updateCropCycleSeasons} = require("../controller/cropController")
const {registerFirm , getFirmWithCrop} = require("../controller/farmController")
const {auth} = require("../middleware/auth")

route.post("/organization/register" , registerOrganization)
route.post("/organization/login" , login)
route.get("/organization/organizationlist" , listOrganization)
route.post("/organization/createfirm" ,auth , registerFirm)
route.put("/crop/updatecrop/:cropId" ,auth, updateCropCycleSeasons)
route.get("/farm/getfarm/:cropId" ,auth , getFirmWithCrop)

module.exports = route