const express = require("express");
const path = require("path");
const request = require("request");
const ejsMate = require("ejs-mate");
const cookieParser= require('cookie-parser');
const bodyParser= require('body-parser');
const session = require("express-session");
const flash =require("connect-flash");
const mongoose = require('mongoose');
const User= require('./models/user');

mongoose.connect('mongodb://localhost:27017/vaccineSetuData', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const app = express();

app.engine("ejs", ejsMate);
app.set("view engine", "ejs");

const sessionConfig ={
  secret: "vaccinehai",
  resave:false,
  saveUninitialized: true,
  cookie:{
    httpOnly:true,
    expires: Date.now() +1000 * 60*60*24,
    maxAge: 1000*60*60*24
  }
}

app.use(session(sessionConfig));

app.use(flash());
app.use((req, res, next)=>{
  res.locals.success= req.flash('success');
  next();
});


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

app.use(express.urlencoded({extended:true}));

app.get("/alerts", function (req, res) {
  res.render("alerts");
});

app.post("/alerts",async(req, res)=>{
  const{email, pincode}= req.body;
  const user = new User({
    email,
    pincode
  });
  await user.save();
  req.flash('success', 'You will start receiving alerts on your email shortly.');
  // res.send("You will start receiving alerts on "+ email + " for "+ pincode+ " shortly.");
res.redirect('/alerts');

});

app.get("*", function (req, res) {
  res.redirect("/");
});


app.listen(process.env.PORT || 3000, process.env.IP, function () {
  console.log("Vaccine Availabity app is running now!");
});
