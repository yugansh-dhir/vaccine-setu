if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}

const express = require('express');
const path = require('path');
const request = require("request");
const ejsMate = require('ejs-mate');
const mbxGeocoding = require("@mapbox/mapbox-sdk/services/geocoding");
const { query } = require('express');
const mapBoxToken = process.env.MAPBOX_TOKEN;
const geocoder = mbxGeocoding({accessToken:mapBoxToken});
const app = express();

app.engine('ejs', ejsMate)
app.set('view engine', 'ejs');

app.get("/" , function(req, res){
	res.render("search");
})

app.get("/results" , function(req , res){
	var pinQuery = req.query.pincode;
	// var city,state;
// 	var cityUrl = "https://api.postalpincode.in/pincode/"+pinQuery;
// 	request(cityUrl, async(error, response, body)=>{
// 		var cities= JSON.parse(body);
// 		console.log(cities[0].PostOffice[0].Block);
// 		console.log(cities[0].PostOffice[0].State);
// 		var city=cities[0].PostOffice[0].Block;
// 		var state=cities[0].PostOffice[0].State;

// 		// console.log(body);
// 		var q = city+", "+ state;
// 	console.log(q);
// 	const geoData = await geocoder.forwardGeocode({
// 		// query:'pathankot, punjab',
// 		query:q,
// 		limit: 1
// 	}).send()
// 	// console.log(geoData.body);
// 	// console.log(query);
// 	const geoCoordinates=geoData.body.features[0].geometry.coordinates;
// // res.render("results", {geoCoordinates: geoCoordinates});
// 	// console.log(geoData.body.features[0].geometry.coordinates);
// 	console.log(geoCoordinates);
// 	})
	

	var dateQuery= req.query.date;
	var gotDate = new Date(dateQuery);
	var fullDate = gotDate.getDate() +"-"+ gotDate.getMonth()+"-"  + gotDate.getFullYear();
	console.log(fullDate);
	var url = "https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByPin?pincode=" + pinQuery + "&date="+ fullDate;
	request( url , function(error ,  response, body){
		if(!error && response.statusCode==200 ){
			var data = JSON.parse(body);
				res.render("results", {data: data});
				console.log(data);
				// console.log(body);
		}else{
			res.render('error');
			console.log(error);
		}
		
	});
});

app.get("/covidUpdates", function(req, res){
			res.render("tempCovidUpdates");
});


app.get("/vaccineUpdates", function(req, res){
	res.render("vaccineUpdates");
})

app.get("/alerts", function(req, res){
	res.render("alerts");
})

// app.all('*', (req, res, next) => {
//     next(new ExpressError('Page Not Found', 404))
// })


app.listen(process.env.PORT || 3000 , process.env.IP , function(){
	console.log("Vaccine Availabity app is running now!");
});
