var express = require('express');
var app = express()
var router = express.Router()
var fs = require('fs');

router.get('/', function (req, res) {
    fs.readFile('/home/choigod1023/izone/url.txt', 'utf-8', function (err, files) {
        console.log(files);
        res.render('live', {
            url: files
        });
    })
})

module.exports = router;