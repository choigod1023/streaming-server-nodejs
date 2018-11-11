const express = require('express')

const app = express()

const fs = require('fs');
const config = require('./config/config.json')
const vidStreamer = require('vid-streamer')
app.use('/videos', vidStreamer.settings(config.videos))
app.use(express.static('public'));
app.use(express.static('views'));
app.set('view engine', 'ejs');
app.set('views', './views');


app.get('/', function (req, res) {
    var file = new Array();
    fs.readdir('./public/videos/hd', function (err, files) {
        file =file+ files+",";
    })
    fs.readdir('./public/videos/sd', function (err, files) {
        file =file+ files
        console.log(file)
        file=file.split(",");
        res.render('main',{
            list:file
        })
    })
}
)

app.listen(3000, function () {
    console.log('hi');
})

