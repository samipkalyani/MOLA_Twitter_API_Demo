const express = require('express')
const router = express.Router()

const userController = require("../Controllers/userController")

router.get("/check_username",userController.getCheckUsername)
router.get("/tweets",userController.getTweets)

module.exports=router