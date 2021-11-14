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

//Express object
const app=express();

//Using CORS for cross origin requests.
const corsOptions = {
	origin: "*"
};
app.use("*", cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, ".", "/")));

//Routing user requests to userRoutes
app.use(userRoutes)

//Listening on 8000
app.listen(8000)