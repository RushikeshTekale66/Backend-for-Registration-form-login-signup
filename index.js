const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');

const app = express();
dotenv.config();

const port = process.env.PORT || 3000;

// mongodb localhost connection 
mongoose.connect("mongodb://127.0.0.1:27017/Registerdata", {
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

app.get("/", (req, res)=>{
    res.sendFile(__dirname + "/pages/index.html");
})

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

app.get("/success", (req, res)=>{
    res.sendFile(__dirname + "/pages/success.html");
})

app.get("/error", (req, res)=>{
    res.sendFile(__dirname + "/pages/error.html");
})

app.listen(port, ()=>{
    console.log(`Surver is running on ${port}`);
})