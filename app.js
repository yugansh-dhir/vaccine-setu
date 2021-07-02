const express = require("express");
const path = require("path");
const request = require("request");
const ejsMate = require("ejs-mate");

const app = express();

app.engine("ejs", ejsMate);
app.set("view engine", "ejs");

app.get("/", function (req, res) {
  res.render("search");
});

app.get("/results", function (req, res) {
  var pinQuery = req.query.pincode;
  var dateQuery = req.query.date;
  var gotDate = new Date(dateQuery);
  var fullDate =
    gotDate.getDate() + "-" + gotDate.getMonth() + "-" + gotDate.getFullYear();
  console.log(fullDate);
  var url =
    "https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByPin?pincode=" +
    pinQuery +
    "&date=" +
    fullDate;
  request(url, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      var data = JSON.parse(body);
      res.render("results", { data: data });
      console.log(data);
      // console.log(body);
    } else {
      res.render("error");
      console.log(error);
    }
  });
});

app.get("/covidUpdates", function (req, res) {
  res.render("tempCovidUpdates");
});

app.get("/vaccineUpdates", function (req, res) {
  res.render("vaccineUpdates");
});

app.get("/alerts", function (req, res) {
  res.render("alerts");
});

app.get("*", function (req, res) {
  res.redirect("/");
});


app.listen(process.env.PORT || 3000, process.env.IP, function () {
  console.log("Vaccine Availabity app is running now!");
});
