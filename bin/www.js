//Lets require/import the http module
//var config = require('./Config');

var express = require('express');
var body_parser = require('body-parser');
var app = express();
var path = require('path');
var https = require('https');
var bodyParser = require('body-parser');
const request = require('request');
var multer = require('multer'); // v1.0.5
var upload = multer(); // for parsing multipart/form-data
var async = require('async');
var deasync = require('deasync');
var rp = require('request-promise');

//var PORT = serverUrl.PORT;
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

const apiKey = '26301b3aad02aff12521e53fa08640d8';
app.use(express.static(__dirname + '/public'));
app.use(express.static('public'));
app.set('view engine', 'ejs')



var server= app.listen(3000,function(){
    var host=server.address().address;
    var port= server.address().port;
    console.log("CareerTrek server listening at http://%s:%s",host,port);
    })

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
    // do some work here with the database.

    app.get('/', function (req, res) {
        res.render('index', {weather: null, error: null});
      })
 
      app.post('/webhook', function (req, res) {
        console.log("hello coming in post call");
        // if(!req.body) return res.sendStatus(400);
        // res.setHeader('Content-Type', 'application/json');
        // console.log(req.body);geo-city
         var city =  req.body.result &&
         req.body.result.parameters && req.body.result.parameters.geo-city
         ? req.body.result.parameters.geo-city
         : "Seems like some problem. Try again."
        // console.log('city', city);
        var w = getWeather(city);
        console.log("w-----",w);
        let response = ""; //default response from the webhook to show its working
                let responseObj = {
                    "fullfillmentText": response,
                    "fullfillmentMessages": [{"text": {"text": [w]}}],
                    "source": ""
                }
                return res.json(responseObj)
      });
var result;
      function getWeather(city){
        console.log("city", city);
            console.log("apiKey", apiKey);
            // let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`
            // var options = {
            //     method: 'POST',
            //     uri: url,
            //     proxy: 'http://192.168.1.1:808'
            // };
            //  console.log('options', options);
            // rp(options)
            //     .then(function (response) {
            //         // POST succeeded...
            //         let weather = JSON.parse(response)
            //                 console.log("weather", JSON.stringify(weather));
            //                 if(weather.main == undefined){
            //                     console.log("1 if");  
            //                   result = "Unable to get the weather"+weather.message;
            //                   //res.render('index', {weather: null, error: 'Error, please try again'});
            //                 } else {
            //                    console.log("2 else");  
            //                   let weatherText = `It's ${weather.main.temp} degrees in ${weather.name}!`;
            //                    result= `It's ${weather.main.temp} degrees in ${weather.name}!`;
            //                   //res.render('index', {weather: weatherText, error: null});
            //                 }
            //         return result;
            //     })
            //     .catch(function (err) {
            //         // POST failed...
            //         console.log("post failed");
            //     });
                    result= undefined;
                    let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`
            var options = {
                method: 'POST',
                uri: url
              
            };
            var req = request(options, cb);
            while(result == undefined)
            require('deasync').runLoopOnce();
            return result;
      }

    //   app.post('/webhook', function (req, res) {
    //     if(!req.body){
    //         console.log("coming in if");
    //         res.setHeader('content-type' , 'application/json');
    //         console.log("coming in city", req.body.queryResults.parameter['geo-city']);
    //        // var city = req.body.queryResults.parameter['geo-city'];
    //        // console.log("coming in if");
    //         //var w = getWeather('London');
    //         let response = ""; //default response from the webhook to show its working
    //         let responseObj = {
    //             "fullfillmentText": response,
    //             "fullfillmentMessages": [{"text": {"text": ['London']}}],
    //             "source": ""
    //         }
    //         return res.json(responseObj)
    //     }
    //   });


    //   app.post('/', function (req, res) {
    //     let city = req.body.city;
    //     console.log("city", city);
    //     console.log("apiKey", apiKey);
    //     let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`
    //     request.post({
    //         url:     url,
    //         proxy:    'http://192.168.1.1:808'
    //       }, function(err, response, body){
    //         if(err){
    //             //console.log("error", err);  
    //             res.render('index', {weather: null, error: 'Error, please try again'});
    //           } else {
    //             //console.log("1 else");  
    //             let weather = JSON.parse(body)
    //            // console.log("weather", JSON.stringify(weather));
    //             if(weather.main == undefined){
    //               //  console.log("1 if");  
    //               res.render('index', {weather: null, error: 'Error, please try again'});
    //             } else {
    //               //  console.log("2 else");  
    //               let weatherText = `It's ${weather.main.temp} degrees in ${weather.name}!`;
    //               res.render('index', {weather: weatherText, error: null});
    //             }
    //           }
    //       });
      
    //   })


    //weather Api
    // var result;

    function cb(err, response, body){
        if(err){
            console.log("error", err);
        }
        var weather = JSON.parse(body)
        if(weather.message === 'city not found'){
            result = "Unable to get the weather"+weather.message;

        }
        else{
            result = "Right now its"+weather.main.temp+ 'degrees with'+ weather.name;
        }
    }

    // function getWeather(city){
    //         result= undefined;
    //         var url ='http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}';
    //         request.post({
    //             url:     url,
    //             proxy:    'http://192.168.1.1:808'
    //           }, function(err, cb){
    //             while(result === undefined){
    //             deasync.runLoopOnce();
    //         }
    //           });
    //         return result;
    // }





