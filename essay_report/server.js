
const express = require('express');
const app = express();
// const MongoClient = require('mongodb').MongoClient;
const mongoose = require('mongoose');
const Essay = require('./models/Essay');
const MONGODB_URL = 'mongodb+srv://geon:passward@cluster0.lopfh.mongodb.net/test?retryWrites=true&w=majority'
const newEssay = new Essay();

var path = require('path'); 

app.listen(3000, (err)=>{
    if(err){
        return console.log(err);
    }
    else{
        console.log('listening on 3000');
        mongoose.connect(MONGODB_URL,{useNewUrlParser:true,useUnifiedTopology: true},(err)=>{
            if(err){
                return console.log(err);
            }else{
                return console.log('Connected to database successful');
            }
        });        
    }
});

app.use(express.static(path.join(__dirname,'/')));

app.use(express.urlencoded({extended:true}));

app.get('/Essay_W',function(req, res){
    res.sendFile(__dirname+'/Essay_W.html');
});

app.get('/Essay_R',function(req, res){
    res.sendFile(__dirname+'/Essay_R.html');
});

app.post('/add',(req,res)=>{
    // console.log(req.body);
    newEssay.day=req.body.day;
    newEssay.title2=req.body.title2;
    newEssay.contents=req.body.contents;
    newEssay.references=req.body.references;
    newEssay.save()
      .then((ess)=>{
          console.log(ess);          
        //   return res.json({
        //       message:"Essay Created Successfully"
        //   });
      });
    res.redirect('/Essay_R');
});