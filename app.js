//jshint esversion: 6
const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");
const app = express();

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.static("public")); // TO send all static files to our server we put all static file like css, images etc. in a folder and using express we send that folder. In this case folder is public.

app.get('/', (req, res) => {
    res.sendFile(__dirname + "/signup.html");
});

app.post("/", (req, res) => {
    const Fname = req.body.Fname;
    const Lname = req.body.Lname;
    const Email = req.body.Email;
    var data = {
        members: [{
            email_address: Email,
            status: "subscribed",
            merge_fields: {
                FNAME: Fname,
                LNAME: Lname
            }
        }]
    };
    const jData = JSON.stringify(data);
    const url = "https://us10.api.mailchimp.com/3.0/lists/8a6bd467df"
    const options = {
        method: "POST",
        auth: "yellowbeard:92b2e38e46ef96d0c10e4e6ead41efd0-us10"
    }
    const request = https.request(url, options, (response) => {

        if (response.statusCode == 200) {
            res.sendFile(__dirname + "/success.html")
        } else {
            res.sendFile(__dirname + "/failure.html")
        }
        response.on("data", (data) => {
            console.log(JSON.parse(data));
        })
        console.log(response.statusCode);

    })
    request.write(jData);
    request.end();
})
app.post("/failure", (req, res) => {
    res.redirect("/");
})

app.listen(6969, () => {
    console.log("Server is running at Port:6969");
});

//api key
// 92b2e38e46ef96d0c10e4e6ead41efd0-us10
// unique mail chimp id/list id
//8a6bd467df