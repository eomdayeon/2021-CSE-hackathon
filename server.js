const express = require("express");
const bodyParser = require("body-parser");
const app = express();
var path = require('path');
const User = require("./models/User");

app.get("/", (req, res) => {
    res.sendFile(__dirname+'/main.html');
});

app.use(express.static(path.join(__dirname,'/')));

app.get("/login",(req,res)=>{
    res.sendFile(__dirname+'/login.html');
});

app.use(bodyParser.urlencoded({ 
    extended: true
}));
app.use(bodyParser.json());

app.post("/login",async (req,res)=> {
    const user = new User(req.body);
    const response = await user.login();
    return res.json(response);
});

app.listen(3000, function(){
    console.log("서버 가동");
});