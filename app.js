const express = require('express')

const app = express()

const fs = require('fs');
const config = require('./config/config.json')
const vidStreamer = require('vid-streamer')
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
app.get('/videos/:asdf', function (req, res) {
    var videos = req.params.asdf
    res.render('video', {
        title: videos
    })
})


app.get('/videos/sdquality/:asdf', function (req, res) {
    var videos = req.params.asdf
    res.render('sd', {
        title: videos
    })
})

app.get('/showcon', function (req, res) {
    let sd_onechu_arr = []
    let hd_onechu_arr = []
    fs.readdir('./public/videos/hd', function (err, files) {
        for (let file_name of files) {
            if (file_name.includes("showcon")) {
                hd_onechu_arr.push(file_name)
            }
        }

    })

    fs.readdir('./public/videos/sd', function (err, files) {
        for (let file_name of files) {
            if (file_name.includes("showcon")) {
                sd_onechu_arr.push(file_name)
            }
        }

        res.render('search', {
            hd: hd_onechu_arr,
            sd: sd_onechu_arr
        })
    })
})

app.get('/onechu', function (req, res) {
    let sd_onechu_arr = []
    let hd_onechu_arr = []
    fs.readdir('./public/videos/hd', function (err, files) {
        for (let file_name of files) {
            if (file_name.includes("izonechu")) {
                hd_onechu_arr.push(file_name)
            }
        }

    })

    fs.readdir('./public/videos/sd', function (err, files) {
        for (let file_name of files) {
            if (file_name.includes("izonechu")) {
                sd_onechu_arr.push(file_name)
            }
        }

        res.render('search', {
            hd: hd_onechu_arr,
            sd: sd_onechu_arr
        })
    })
})

app.get('vlive', function (req, res) {

})

app.listen(3030, function () {
    console.log('hi');
})

