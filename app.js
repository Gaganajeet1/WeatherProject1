const express = require("express");
const bodyParser = require("body-parser");
// const request = require("request");
const https = require("https");


const app = express();

app.use(express.static("public"));
app.use(express.static('files'))
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function(res, res) {
    res.sendFile(__dirname + "/signup.html")
});



app.post("/", function(req, res) {

    const city = req.body.cityName
    const apikey = "da69796e8e9756b09440ef07f7405f5e"
    const unit = "metric"
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apikey + "&units=" + unit + ""
    https.get(url, function(response) {
        // console.log(response.statusCode);

        response.on("data", function(data) {
            const weatherdata = JSON.parse(data);


            const temp = weatherdata.main.temp_max;
            const description = weatherdata.weather[0].description;
            const icon = weatherdata.weather[0].icon;
            const imageurl = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
            console.log(description);
            console.log(temp);

            res.write("<h1> Description of weather:" + description + "</h1>");
            res.write("<h2> The temperature in " + city + " is: " + temp + " Celcius</h2>");
            res.write("<img src=" + imageurl + ">");
            res.send

        });
    });
});

app.listen(process.env.PORT || 3000, function() {
    console.log("The site is running on port 3000");
});

//API key
// 59ac71dd06899d3ec25befd3734ff2d8-us20
//List ID
// 0adea0dcf4