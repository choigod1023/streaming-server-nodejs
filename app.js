const express = require('express')
var mysql = require('mysql');
const app = express()
const fs = require('fs');
var request = require("request");

const config = require('./config/config.json')
const vidStreamer = require('vid-streamer')
var bodyParser = require('body-parser')
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'choigod1023',
    password: 'jjang486',
    database: 'choigod1023'
});

app.use('/public/videos', vidStreamer.settings(config.videos))
app.use(express.static('public'));
app.use(express.static('views'));
app.set('view engine', 'ejs');
app.set('views', './views');
app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(bodyParser.json())

connection.connect();
app.get('/', function (req, res) {
    var file = new Array();
    var id = []
    var stringarray = []
    fs.readdir('./public/videos/hd', function (err, files) {
        for (let file_name of files) {
            if (file_name.includes("(IZONE_SHOWCON)") || file_name.includes("(IZONE_CHU)") || file_name.includes("(OTHER)")) {
                file.push(file_name)
            }
        }
        connection.query('SELECT * FROM youtube ORDER BY ID DESC;', function (err, rows) {
            if (err) throw err;
            for (var i in rows) {
                id.push(rows[i].ID);
                stringarray.push(rows[i].NAME);
            }
        })
        connection.query('SELECT * FROM vlive ORDER BY ID DESC;', function (err, rows) {
            if (err) throw err;
            for (var i in rows) {
                id.push(rows[i].ID);
                stringarray.push(rows[i].NAME);
            }
            res.render('main', {
                list: file,
                idarray: id,
                stringarray: stringarray
            })
        })
    })
})


app.get('/videos/:asdf', function (req, res) {
    var dddd = req.params.asdf;
    var i = dddd.indexOf("(CAM)");
    if (i != -1) {
        dddd = dddd.replace(".mp4", ".mkv");
    } else
        dddd = dddd.replace("(1080P)", "(720P)");
    console.log(dddd);
    res.render('video', {
        title: req.params.asdf,
        another: dddd
    })
})





var stringarray = [];
var ext = []
var api;
var string = "";
var id = [];

app.use('/other',require('./router/other'))
app.use('/onechu',require('./router/onechu'))
app.use('/showcon',require('./router/showcon'))
app.use('/search',require('./router/search'))
app.use('/cam',require('./router/cam'))
app.use('/vlive', require('./router/vlive'));
app.use('/api/vlive', require('./api_vlive'));
app.use('/api/youtube', require('./api_youtube'));
app.use('/api/other', require('./api_other'));

app.listen(3030, function () {
    console.log('hi');
})
