const express = require("express")
require("./models/db")
const users = require('./models/register.model')
const app = express()
var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.set('view engine', 'ejs');
app.get('/', (req, res) => {
    users.find()
        .then((data) => {
            res.render('index', { data: data })
        })
})

app.post("/save", (req, res) => {
    const newUser = new users(req.body);
    users.findOne({ roll: newUser.roll })
        .then(existingUser => {
            if (existingUser) {
                console.log("User with the same roll number already exists.");
                res.redirect('/')
            } else {
                newUser.save()
                    .then(result => {
                        console.log("Data Saved");
                        res.redirect("/");
                    })
                    .catch(err => {
                        console.log("Error: " + err);
                    });
            }
        })
        .catch(err => {
            console.log("Error: " + err);
        });
});


app.get("/del",(req,res)=>{
    var id=req.query.id
    users.findByIdAndDelete({_id:id})
    .then(()=>{
        res.redirect("/")
    })
    .catch((err)=>{
        console.log(err)
    })
})
app.get("/edit",(req,res)=>{
    var id=req.query.id
    users.find({_id:id})
    .then((data)=>{
        //console.log(data)
        res.render("edit",{data:data[0]})
    })
})
app.post("/update",(req,res)=>{
    users.findByIdAndUpdate({_id:req.body.id},req.body)
    .then(()=>{
        res.redirect("/")
    })
})

app.get("/search" , (req,res) => {
    res.render('search',{data:[]})
} )
app.post("/searchByRoll",(req,res)=>{
    var roll=req.body.search
    users.find({roll:roll})
    .then((data)=>{
        res.render('search',{data:data})
    })
})

app.listen(3000, () => {
    console.log("server is running");
});
