const express = require('express')

const app = express()

const fs = require('fs');
const config = require('./config/config.json')
const vidStreamer = require('vid-streamer')
const iconvLite = require('iconv-lite')
const jschardet = require('jschardet')
const qs = require('querystring')
app.use('/public/videos', vidStreamer.settings(config.videos))
app.use(express.static('public'));
app.use(express.static('views'));
app.set('view engine', 'ejs');
app.set('views', './views');


app.get('/', function (req, res) {
    var file = new Array();
    fs.readdir('./public/videos/hd', function (err, files) {
        res.render('main', {
            list: files
        })
    })
}
)
app.get('/videos', function (req, res) {
    console.log(req.url)
    var src = JSON.stringify(req.query.src)
    console.log(jschardet.detect(src))
    resultjson = {
        title:req.query.src
    }
    console.log(jschardet.detect(resultjson.title))
    res.render('video',resultjson)
})




app.get('/showcon', function (req, res) {
    let hd_onechu_arr = []
    fs.readdir('./public/videos/hd', function (err, files) {
        for (let file_name of files) {
            if (file_name.includes("(IZONE_SHOWCON)")) {
                hd_onechu_arr.push(file_name)
            }
        }
        res.render('search', {
            hd: hd_onechu_arr
        })
    })
    
})

app.get('/other', function (req, res) {
    let sd_onechu_arr = []
    let hd_onechu_arr = []
    fs.readdir('./public/videos/hd', function (err, files) {
        for (let file_name of files) {
            if (file_name.includes("(OTHER)")) {
                hd_onechu_arr.push(file_name)
            }
        }
        res.render('search', {
            hd: hd_onechu_arr
        })
    })
    
})

app.get('/onechu', function (req, res) {
    let sd_onechu_arr = []
    let hd_onechu_arr = []
    fs.readdir('./public/videos/hd', function (err, files) {
        for (let file_name of files) {
            if (file_name.includes("(IZONE_CHU)")) {
                hd_onechu_arr.push(file_name)
            }
        }   
        res.render('search', {
            hd: hd_onechu_arr
        })
    })
    
})

app.get('/vlive', function (req, res) {
    let hd_onechu_arr = new Array([])
    fs.readdir('./public/videos/hd',"buffer",function (err, files) {
        for (let file_name of files) {
            fs.createReadStream
            console.log(file_name + "=" + JSON.stringify(jschardet.detect(file_name)))
            if (file_name.includes("VLIVE")) {
                hd_onechu_arr.push(iconvLite.encode(file_name, "UTF-8"))
            }
        }
        console.log(hd_onechu_arr)
        res.render('search', {
            hd: hd_onechu_arr
        })
    })
    
})

app.listen(3030, function () {
    console.log('hi');
})

