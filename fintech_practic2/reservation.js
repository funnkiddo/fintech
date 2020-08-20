const express = require("express");
const app = express();
const path = require("path");
const request = require("request");
var mysql = require("mysql");
const jwt = require("jsonwebtoken");
const auth  = require("./lib/auth");

var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "nameis980214",
  database: "fintech",
  port: "3306",
});

connection.connect();

app.set("views", __dirname + "/views");
app.set("view engine", "ejs");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, "public"))); //to use static asset

app.get("/modal", function (req, res) {
    res.render("modal");
});
app.get("/reservation", function (req, res) {
    res.render("reservation");
});
app.get("/payment", function (req, res) {
    res.render("payment");
});
app.post("/reservation", function (req, res) {
    console.log(req.body)
});
app.post("/payment", function (req, res) {
    console.log(req.body)
});

app.listen(3000, function () {
    console.log("http://localhost:3000/reservation");
});
