var express = require('express');
var app = express()
var router = express.Router()
app.use(express.static('public'));
app.use(express.static('views'));
app.set('view engine', 'ejs');
app.set('views', './views');
var request = require("request");
router.get('/', function (req, res) {
    var ext=[]
    var youtubestring = []
    var youtubeid = []
    request("http://kentastudio.com:3030/api/youtube", function (err, status, body) {
        for (var i in JSON.parse(body)) {
            youtubeid[i] = (JSON.parse(body)[i].ID)
            youtubestring[i] = (JSON.parse(body)[i].NAME)
            if (JSON.parse(body)[i].ext.match('mp4')) {
                ext[i] = 1
            }
            if (JSON.parse(body)[i].ext.match('mkv')) {
                ext[i] = 2
            }
            if (JSON.parse(body)[i].ext.match('webm')) {
                ext[i] = 3
            }
        }
        var check = 1;
        res.render('vlive', {
            idarray: youtubeid,
            stringarray: youtubestring,
            check: check,
            ext: ext
        })
    })
})

module.exports = router;