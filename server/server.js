//Global Modules
const https = require("https")
const path=require("path")

//Custom Modules 
const dotenv  = require('dotenv').config({path:`./config.env`});
const express=require("express")
const cors = require("cors");
const bodyParser = require("body-parser");

//Using router
const userRoutes=require("./Routes/userRoutes")

const app=express(); //app object
//Using CORS for cross origin requests.
const corsOptions = {
	origin: "*"
};
app.use("*", cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, ".", "/")));

app.use(userRoutes)

//Listen on 8000
app.listen(8000)