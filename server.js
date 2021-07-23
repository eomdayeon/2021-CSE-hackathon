const express = require("express");
const bodyParser = require("body-parser");
const app = express();
var path = require('path');
const User = require("./models/User");
const mongoose = require('mongoose');
const Essay = require('./models/Essay');
const Report = require('./models/Report');
const MONGODB_URL = 'mongodb+srv://geon:pass1234@cluster0.lopfh.mongodb.net/ori?retryWrites=true&w=majority'
const newEssay = new Essay();

app.listen(5050, (err)=>{
    if(err){
        return console.log(err);
    }
    else{
        console.log('listening on 5050');
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
app.use(bodyParser.urlencoded({ 
    extended: true
}));
app.use(bodyParser.json());

app.set('views',__dirname+'/views');
app.set('view engine','ejs');

app.get("/", (req, res) => {
    res.sendFile(__dirname+'/main.html');
});

app.get("/index", (req, res) => {
    res.sendFile(__dirname+'/index.html');
});

app.get("/login",(req,res)=>{
    res.sendFile(__dirname+'/login.html');
});

app.get('/Essay_W',function(req, res){
    res.sendFile(__dirname+'/Essay_W.html');
});

app.get('/Essay_R',function(req, res){
    Essay.findOne({day:"3_목"})
        .then((e_d)=>{
            console.log(e_d);
            res.render('Essay_R',{'data':e_d},function(err,html){
                if(err){
                    console.log(err);
                }
                res.sendFile(__dirname+'/views/Essay_R.ejs');
                res.end(html);
            });
        });
    });

app.get('/Report_W',function(req, res){
    Essay.findOne({day:"3_목"})
        .then((e_d)=>{
            console.log(e_d);
            res.render('Report_W',{'data':e_d},function(err,html){
                if(err){
                    console.log(err);
                }
                res.sendFile(__dirname+'/views/Report_W.ejs');
                res.end(html);
            });
        });
    });

app.get('/Report_R',function(req, res){
    Report.findOne({days:"3_목"})
        .then((e_d2)=>{
            console.log(e_d2);
            res.render('Report_R',{'data':e_d2},function(err,html){
                if(err){
                    console.log(err);
                }
                res.sendFile(__dirname+'/views/Report_R.ejs');
                res.end(html);
            });
        });
    });

app.post("/login", async(req,res)=> {
    const user = new User(req.body);
    const response = await user.login();
    return res.json(response);
});

app.post('/add',(req,res)=>{
    // console.log(req.body);
    const newEssay = new Essay();
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


app.post('/add2',(req,res)=>{
    // console.log(req.body);
    const newReport = new Report();
    newReport.days=req.body.days;
    newReport.reports=req.body.reports;
    newReport.save()
      .then((rep)=>{
          console.log(rep);          
        //   return res.json({
        //       message:"Essay Created Successfully"
        //   });
      });
    res.redirect('/Report_R');
});


