const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");

const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

// the starting of ejs...
app.set("view engine","ejs");
let items = [];
let workItems = [];

app.get("/" ,function(req,res){
    
    let day = date.getDate();
    // we are modifying the list.ejs using render;;;
    res.render("list", {listTitle: day, newListItems: items});
});

app.post("/",function(req,res){
    let item = req.body.newItem;

    if(req.body.list === "Work"){
        workItems.push(item);
        res.redirect("/work");
    }
    else{
        items.push(item);
        console.log(item);
        res.redirect("/");
    }
    
});

app.get("/work", function(req,res){
    res.render("list",{listTitle: "Work List", newListItems: workItems});
})

app.get("/about",function(req,res){
    res.render("about");
})

app.post("/work",function(req,res){
    let items = req.body.newItem;
    workItems.push(item);
    res.redirect("/work");
})

app.post("/about",function(req,res){
    res.redirect("/about");
});

app.listen(3000,function(){
    console.log("The server is started at port 3000.");
});
