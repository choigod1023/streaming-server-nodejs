var mysql = require('mysql');
const fs = require('fs');
var express = require('express')
var app = express()
var router = express.Router();

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'choigod1023',
    password: 'jjang486',
    database: 'choigod1023'
});

connection.connect();
app.get('/', function (req, res) {
    console.log('hola')
    connection.query('SELECT * FROM vlive order by id, name asc', function (err, rows) {
        
        if (err) throw err;
        console.log(rows)
        a = JSON.stringify(rows)
        console.log(a)
        res.json(a);
    })
})

app.listen(3030,function(){
    console.log('hello')
})