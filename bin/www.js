//Lets require/import the http module
//var config = require('./Config');

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
const request = require('request');

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

    app.get('/', function (req, res) {
        res.render('index', {weather: null, error: null});
      })
 
      app.post('/webhook', function (req, res) {
         var city =  req.body.result &&
         req.body.result.parameters && req.body.result.parameters['geo-city']
         ? req.body.result.parameters['geo-city']
         : "Seems like some problem. Try again."
        var w = getWeather(city);
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
                    result= undefined;
                    let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`
            var options = {
                method: 'POST',
                url: url,
                headers: {
                    'Content-Type': 'application/json'
                }
              
            };
            var req = request(options, cb);
            while(result == undefined)
            require('deasync').runLoopOnce();
            return result;
      }

    

    function cb(err, response, body){
        if(err){
            console.log("error", err);
        }
        console.log('body response:',JSON.parse(body));
        var weather = JSON.parse(body)
        if(weather.message === 'city not found'){
            result = "Unable to get the weather"+weather.message;
        }
        else{
            result = "Right now its"+weather.main.temp+ 'degrees with'+ weather.name;
        }
    }






