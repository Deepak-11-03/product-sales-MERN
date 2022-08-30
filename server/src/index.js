const mongoose=require('mongoose')
const express=require('express');
const route= require('./router')
const dotenv=require('dotenv');
const bodyParser = require('body-parser');
const app=express();

dotenv.config({path:'../config.env'});

app.use(bodyParser.json());
// app.use(cors())

mongoose.connect(process.env.DATABASE_URL)

.then(() => {
    console.log("MongoDb connected")
}).catch((err) => {
    console.log(err.message)
});

app.use('/' ,route)

app.listen( process.env.Port || 4000 ,function(){
    console.log('App running on port ' + (process.env.PORT || 4000))
});