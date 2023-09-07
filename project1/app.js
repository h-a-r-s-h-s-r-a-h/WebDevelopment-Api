const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({extended: true}));

app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html");
});
app.post("/",function(req,res){
    const city = req.body.cityName;
    const url = "https://api.weatherapi.com/v1/current.json?key=2b9f37f6d9fc4deba9754801231606&q="+city+"&aqi=yes";
    https.get(url, function(response){
        console.log(response.statusCode);
        
        response.on("data", function(data){
            const weatherData = JSON.parse(data);
            //console.log(weatherData);
            const current_temp = weatherData.current.temp_c;
            //console.log(current_temp);
            const current_api = weatherData.current.air_quality.co;
            //console.log("Air quality:-  "+current_api);

            const weather_icon = weatherData.current.condition.icon;

            res.write("<h1>The temperature in "+city+" is :- "+current_temp+"</h1>");
            res.write("<p>The air quality in "+city+" is :- "+current_api+"</p>");
            res.write("<img src="+weather_icon+" >");
            res.send();
        });
    });

})






app.listen(3000,function(){
    console.log("Server is running on port 3000");
});