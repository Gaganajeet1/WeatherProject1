const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

const app = express();

app.use(express.static("public"));
app.use(express.static('files'))
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function(res, res) {
    res.sendFile(__dirname + "/signup.html")
});

app.post("/", function(req, res) {
    var FirstName = req.body.fName;
    var lastName = req.body.lName;
    var email = req.body.email;

    var data = {
        members: [{
            email_address: email,
            status: "subscribed",
            merge_fields: {
                FNAME: FirstName,
                LNAME: lastName
            }
        }]
    };

    var jsonData = JSON.stringify(data);

    const url = "https://us20.api.mailchimp.com/3.0/lists/0adea0dcf4"

    const options = {
        method: "POST",
        auth: "gagan1:49b7904419fce4545999db349ddec886-us20"
    }

    // 709e94ee724b44ea44b39fdffea7be9d-us20
    // 49b7904419fce4545999db349ddec886-us20

    const request = https.request(url, options, function(response) {

        if (response.statusCode === 200) {
            res.sendFile(__dirname + "/success.html")
        } else {
            res.sendFile(__dirname + "/failure.html")

        }

        response.on("data", function(data) {
            console.log(JSON.parse(data));

        });
    });

    request.write(jsonData);
    request.end();

});

app.post("/failure", function(req, res) {
    res.redirect("/");
})
app.listen(process.env.PORT || 3002, function() {
    console.log("The site is running on port 3000");
});

//API key
// 59ac71dd06899d3ec25befd3734ff2d8-us20
//List ID
// 0adea0dcf4