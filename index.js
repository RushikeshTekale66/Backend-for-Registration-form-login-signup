const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config();
const Database = process.env.Database;


const app = express();
// dotenv.config();

const port = process.env.PORT || 3000;

// mongodb localhost connection 
mongoose.connect(Database, {
useNewUrlParser:true,
useUnifiedTopology:true});

// registration schema
const registrationSchema = new mongoose.Schema({
    name:String,
    email:String,
    password:String
})

// Model of registration schema
const Registration = mongoose.model("RegistrationFormDB", registrationSchema);

app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json());

// home api ie. form api
app.get("/", (req, res)=>{
    res.sendFile(__dirname + "/pages/index.html");
})

// Post data to database api
app.post('/register', async(req, res)=>{
    try{
        const {name, email, password} = req.body;
        const existuser = await Registration.findOne({email:email});
        
        // Chack for existing user
        if(!existuser){
            const registrationData = new Registration({
                name,
                email,
                password
            })
            await registrationData.save();
            res.redirect("/success");
        }
        else{
            console.log("User exist");
            res.redirect("/error")
        }
  
    }
    catch(error){
        console.log(error);
        res.redirect("/error");
    }
})

// User successfully registerd page
app.get("/success", (req, res)=>{
    res.sendFile(__dirname + "/pages/success.html");
})

// error while registering the page
app.get("/error", (req, res)=>{
    res.sendFile(__dirname + "/pages/error.html");
})

app.listen(port, ()=>{
    console.log(`Surver is running on ${port}`);
})