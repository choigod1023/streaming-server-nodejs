var mysql = require('mysql');
const fs = require('fs');
var express = require('express')
var router = express.Router();
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'choigod1023',
    password: 'jjang486',
    database: 'choigod1023'
});

const checkExt = (v) => {
    return new Promise((resolve, reject) => {
        fs.exists(__dirname + "/public/videos/hd/(CAM)" + v['ID'] + ".mkv", (exists) => {
            if (exists) {
                v['ext'] = 'mkv';
                resolve(v);
            } else {
                fs.exists(__dirname + "/public/videos/hd/(CAM)" + v['ID'] + ".mp4", (exists) => {
                    if (exists) {
                        v['ext'] = 'mp4';
                        resolve(v);
                    } else {
                        fs.exists(__dirname + "/public/videos/hd/(CAM)" + v['ID'] + ".webm", (exists) => {
                            if (exists) {
                                v['ext'] = 'webm';
                                resolve(v);
                            } else {
                                v['ext'] = 'null';
                                resolve(v);
                            }
                        });
                    }
                });
            }
        });
    });
};

const getArrIncludesExt = (resArr) => {
    return Promise.all(resArr.map((v) => {
        return checkExt(v);
    }));
};

router.get('/', function (req, res) {
    connection.query('SELECT * FROM youtube order by id desc', function (err, rows) {
        let resArr = JSON.parse(JSON.stringify(rows));

        getArrIncludesExt(resArr).then((result) => {
            res.send(result);
        })
    })
})

module.exports = router;
