const express = require('express')
var mysql = require('mysql');
const app = express()
const fs = require('fs');
const config = require('./config/config.json')
const vidStreamer = require('vid-streamer')
var bodyParser = require('body-parser')
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'choigod1023',
    password: 'jjang486',
    database: 'choigod1023'
});

app.use('/public/videos', vidStreamer.settings(config.videos))
app.use(express.static('public'));
app.use(express.static('views'));
app.set('view engine', 'ejs');
app.set('views', './views');
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

connection.connect();
app.get('/', function (req, res) {
    var file = new Array();
    var id = []
    var stringarray = []
    fs.readdir('./public/videos/hd', function (err, files) {
        for (let file_name of files) {
            if (file_name.includes("(IZONE_SHOWCON)") || file_name.includes("(IZONE_CHU)") || file_name.includes("(OTHER)")) {
                file.push(file_name)
            }
        }
        connection.query('SELECT * FROM youtube ORDER BY ID DESC;', function (err, rows) {
            if (err) throw err;
            for (var i in rows) {
                id.push(rows[i].ID);
                stringarray.push(rows[i].NAME);
            }
        })
        connection.query('SELECT * FROM vlive ORDER BY ID DESC;', function (err, rows) {
            if (err) throw err;
            for (var i in rows) {
                id.push(rows[i].ID);
                stringarray.push(rows[i].NAME);
            }
            res.render('main', {
                list: file,
                idarray: id,
                stringarray: stringarray
            })
        })
    })
})

app.get('/live',function(req,res){
    fs.readFile('./url.txt','utf-8',function(err,files){
        console.log(files);
        res.render('live',{url : files});
    })
})
app.get('/videos/:asdf', function (req, res) {
    var dddd =req.params.asdf;
    var i = dddd.indexOf("(CAM)");
    if(i != -1)
    {
        dddd =dddd.replace(".mp4",".mkv");
    }
    else
        dddd =dddd.replace("(1080P)","(720P)");
    console.log(dddd);
    res.render('video', {
        title: req.params.asdf,
        another:dddd
    })
})


app.get('/showcon', function (req, res) {
    let hd_onechu_arr = []
    fs.readdir('./public/videos/hd', function (err, files) {
        for (let file_name of files) {
            if (file_name.includes("(IZONE_SHOWCON)")) {
                hd_onechu_arr.push(file_name)
            }
        }
        res.render('search', {
            hd: hd_onechu_arr
        })
    })

})

app.get('/other', function (req, res) {
    let sd_onechu_arr = []
    let hd_onechu_arr = []
    fs.readdir('./public/videos/hd', function (err, files) {
        for (let file_name of files) {
            if (file_name.includes("(OTHER)")) {
                hd_onechu_arr.push(file_name)
            }
        }
        res.render('search', {
            hd: hd_onechu_arr
        })
    })

})

app.post('/search', function (req, res) {
    var search = req.body.searchInput;
    search = search.toUpperCase();
    var vliveid = []
    var vlivearr = []
    var camid = []
    var camarr = []
    var searcharr = []
    var ischeck
    fs.readdir('./public/videos/hd', function (err, files) {
        for (let file_name of files) {
            if (file_name.includes(`${search}`) && !file_name.includes('(CAM)')) {
                ischeck = 1;
                searcharr.push(file_name)
            }
        }
        console.log(searcharr)
    })
    connection.query(`SELECT * FROM youtube WHERE NAME like "%${search}%" ORDER BY ID DESC;`, function (err, rows) {
        if (err) throw err;
        for (var i in rows) {
            camid.push(rows[i].ID);
            camarr.push(rows[i].NAME);
        }
        connection.query(`SELECT * FROM vlive WHERE NAME like "%${search}%" ORDER BY ID DESC;`, function (err, rows) {
            if (err) throw err;
            for (var i in rows) {
                vliveid.push(rows[i].ID);
                vlivearr.push(rows[i].NAME);
            }
            res.render('formsearch', {
                ischeck,ischeck,
                searchstr: search,
                vliveid:vliveid,
                vlivearr:vlivearr,
                camid:camid,
                camarr:camarr
            })
        })
    })
    
})

app.get('/onechu', function (req, res) {
    let sd_onechu_arr = []
    let hd_onechu_arr = []
    fs.readdir('./public/videos/hd', function (err, files) {
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

app.get('/videos/sdquality/:asdf', function (req, res) {
    var title = `${req.params.asdf}`;
    title.replace("(720P)", "(480P)");
    res.render('sd', {
        title: title
    })
})
var stringarray = [];
    var string = "";
    var id = [];
app.get('/cam',function(req,res){
    
    var check = 1;
    connection.query('SELECT * FROM youtube ORDER BY ID DESC;', function (err, rows) {
        if (err) throw err;
        for (var i in rows) {
            id[i] = rows[i].ID;
            stringarray[i] = rows[i].NAME;
        }
        res.render('vlive', {
            idarray: id,
            stringarray: stringarray,
            check:check
        })
    })
})

app.get('/vlive', function (req, res) {
    
    var check = 0;
    connection.query('SELECT * FROM vlive ORDER BY ID DESC;', function (err, rows) {
        if (err) throw err;
        for (var i in rows) {
            id[i] = rows[i].ID;
            stringarray[i] = rows[i].NAME;
        }for(var i in id)
        {
            if(id[i]==93)
            {
                console.log(i);
            }
        }
        res.render('vlive', {
            idarray: id,
            stringarray: stringarray,
            check : check
        })
    })
})

app.use('/api/vlive', require('./api_vlive'));
app.use('/api/youtube', require('./api_youtube'));
app.use('/api/other', require('./api_other'));

app.listen(3030, function () {
    console.log('hi');
})
