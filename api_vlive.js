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

connection.connect();
router.get('/', function (req, res) {
    connection.query('SELECT * FROM vlive order by id, name asc', function (err, rows) {
        a = JSON.stringify(rows)
        res.json(a);
    })
})




module.exports = router;
