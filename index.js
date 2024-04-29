const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');

const app = express();
dotenv.config();

const port = process.env.PORT || 3000;

app.get("/", (req, res)=>{
    res.sendFile(__dirname + "/pages/index.html");
})

app.post('/register', (req, res)=>{
    try{
        const {name, email, password} = req.body;

    }
    catch{

    }
})

app.listen(port, ()=>{
    console.log(`Surver is running on ${port}`);
})