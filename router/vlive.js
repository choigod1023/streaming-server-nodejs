var express = require('express');
var app = express()
var router = express.Router()
app.use(express.static('public'));
app.use(express.static('views'));
app.set('view engine', 'ejs');
app.set('views', './views');
var request = require("request");
var bodyParser = require('body-parser')

var stringarray = []
var id = []
var check = 0;
var quality = [];
router.get('/', function (req, res) {

    request("http://kentastudio.com:3030/api/vlive", function (err, status, body) {
        for (var i in JSON.parse(body)) {
            id[i] = JSON.parse(body)[i].ID;
            stringarray[i] = JSON.parse(body)[i].NAME;
        }
    })
    for (var i in stringarray) {
        if (stringarray[i].match('720P')) {
            quality.push(1)
        } else if (stringarray[i].match('1080P')) {
            quality.push(2)
        } else if (stringarray[i].match('360P')) {
            quality.push(3)
        }
    }

    res.render('vlive', {
        idarray: id,
        stringarray: stringarray,
        check: check,
        quality: quality
    })
})

module.exports = router;