const express = require('express');
var request = require('request');
var app = express();

app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const url = 'http://api.openweathermap.org/data/2.5/weather?q=nagpur&appid=06d02f11172db3649cbd462563679948';

app.get('/', function (req, res) {
    res.render('index');
});

app.post('/submitdate', function (req, res) {
    
    var i, flag = 0, day;
    day = req.body.day;
    
    for (i = 2; i <= day / 2; i++) {
        if (day % i == 0) {
            flag = 1;
            break;
        }
    }
    if (flag == 0) {
        request(url, function (err, response, body) {
            if(err) throw err;
            var weather_json = JSON.parse(body);
            res.write(JSON.stringify(weather_json))
            res.end();
        })
    }
    else {
        res.write(day +  " Date is not prime so no data");
        res.end();
    }
    
});

app.listen(8081);
