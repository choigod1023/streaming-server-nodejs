var mysql = require('mysql');
const fs = require('fs');
var express = require('express')
var router = express.Router();

router.get('/', function (req, res) {
    var c = []
    var d = { "name": [] }
    fs.readdir('./public/videos/hd', function (err, files) {
        for (let file_name of files) {
            if (file_name.includes("(IZONE_CHU)")||file_name.includes("(OTHER)")||file_name.includes("(IZONE_SHOWCON)"))
                d.name.push(file_name)
            else
                continue
        }
        res.json(d);
    })
})

module.exports = router;
