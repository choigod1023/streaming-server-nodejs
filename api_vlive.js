var mysql = require('mysql');
const fs = require('fs');
var express = require('express')
var router = express.Router();

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'choigod1023',
    password: 'jjang486',
    database: 'choigod1023',
    charset: 'utf8mb4'
});

connection.connect();
router.get('/', function (req, res) {
    connection.query('SELECT * FROM vlive order by id desc', function (err, rows) {
        res.send(JSON.parse(JSON.stringify(rows)));
    })
})




module.exports = router;
