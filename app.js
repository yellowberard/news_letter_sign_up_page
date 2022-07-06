//jshint esversion: 6
const express = require("express");
const bodyParser = require("body-parser");
const request = require("request")
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
    res.send(Fname + Lname + Email);
})

app.listen(6969, () => {
    console.log("Server is running at Port:6969");
});