var express = require('express')
var router = express.Router();
var fs = require('fs')
var app = express()
app.use(express.static('public'));
app.use(express.static('views'));
app.set('view engine', 'ejs');
app.set('views', './views');

router.get('/', function (req, res) {
    let sd_onechu_arr = []
    let hd_onechu_arr = []
    fs.readdir('../public/videos/hd', function (err, files) {
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
module.exports = router