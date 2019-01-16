const fs = require('fs');
var express = require('express')
var router = express.Router();

router.get('/', function (req, res) {
    let returnArr = new Array();

    fs.readdir('./public/videos/hd', function (err, files) {
        files.filter(name => {
            if (name.includes("(IZONE_CHU)") || name.includes("(OTHER)") || name.includes("IZONE_SHOWCON")) {
                return true
            } else {
                return false
            }
        }).forEach((name, idx) => {
            returnArr.push({id: idx, title: name})
        })

        res.json(returnArr);
    })
})

module.exports = router;
