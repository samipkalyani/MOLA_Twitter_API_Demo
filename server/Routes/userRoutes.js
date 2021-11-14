const express = require('express')
const router = express.Router()

const userController = require("../Controllers/userController")

//API handler for checking username
router.get("/check_username",userController.getCheckUsername)
//API handler for getting tweets
router.get("/tweets",userController.getTweets)

module.exports=router