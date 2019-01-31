var express = require('express');
var app = express()
var router = express.Router()
app.use(express.static('public'));
app.use(express.static('views'));
app.set('view engine', 'ejs');
var fs = require('fs')
app.set('views', './views');
var bodyParser = require('body-parser') 
var mysql = require('mysql')
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'choigod1023',
    password: 'jjang486',
    database: 'choigod1023'
});

app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(bodyParser.json())

connection.connect();

router.post('/', function (req, res) {
    var search = req.body.searchInput;
    search = search.toUpperCase();
    var vliveid = []
    var vlivearr = []
    var camid = []
    var camarr = []
    var searcharr = []
    var ischeck
    fs.readdir('./public/videos/hd', function (err, files) {
        for (let file_name of files) {
            if (file_name.includes(`${search}`) && !file_name.includes('(CAM)')) {
                ischeck = 1;
                searcharr.push(file_name)
            }
        }
    })
    connection.query(`SELECT * FROM youtube WHERE NAME like "%${search}%" ORDER BY ID DESC;`, function (err, rows) {
        if (err) throw err;
        for (var i in rows) {
            camid.push(rows[i].ID);
            camarr.push(rows[i].NAME);
        }
        connection.query(`SELECT * FROM vlive WHERE NAME like "%${search}%" ORDER BY ID DESC;`, function (err, rows) {
            if (err) throw err;
            for (var i in rows) {
                vliveid.push(rows[i].ID);
                vlivearr.push(rows[i].NAME);
            }
            console.log(searcharr)
            res.render('formsearch', {
                ischeck: ischeck,
                searchstr: search,
                searcharr: searcharr,
                vliveid: vliveid,
                vlivearr: vlivearr,
                camid: camid,
                camarr: camarr
            })
        })
    })
})

module.exports = router