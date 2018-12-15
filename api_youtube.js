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
router.get('/', function (req, res) {
    connection.query('SELECT * FROM youtube order by id, name asc', function (err, rows) {
        b = JSON.stringify(rows)
        console.log(b)
        res.json(b);
    })
})

module.exports = router;
