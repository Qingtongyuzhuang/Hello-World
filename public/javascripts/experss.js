/**
 * Created by miracle on 16-11-3.
 */
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(express.static('public'));
var urlencodedParser = bodyParser.urlencoded({ extended: false })
var mysql = require('mysql');
var connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root', 
    password: '',
    database: 'nodesample'
});//数据库
connection.connect(function (err) {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }

    console.log('connected as id ' + connection.threadId);
});
app.get('/experss.html', function (req, res) {
    res.sendFile( __dirname + "/" + "experss.html" );
});
// app.get('/process_get', function (req, res) {
//     response = {
//         first_name:req.query.first_name,
//         last_name:req.query.last_name
//     };
//     console.log(response);
//     res.end(JSON.stringify(response));
// });
app.post('/login', urlencodedParser, function (req, res) {
    console.log(res);
    function login(name, pwd, callback) {
        var sqlCmd = 'SELECT * from userinfo where UserName="' + name + '" and UserPass="' + pwd + '"';
        console.log(sqlCmd);
        connection.query(sqlCmd
            , function (error, rows, fields) {
                console.log(rows);
                if (rows.length) {
                    //根据用户名和密码查找到匹配的数据
                    callback(true)
                } else {
                    //没有匹配的数据
                    callback(false);
                }
            });
    }
    login(req.body.username, req.body.password,function (result) {
        res.contentType('json');//返回的数据类型
        res.send(JSON.stringify({result:result }));//给客户端返回一个json格式的数据
        res.end();
    })
})
app.post('/del', urlencodedParser, function (req, res) {
    function deleted(name, pwd, callback) {
        var sqlCmd = 'SELECT * from userinfo where UserName = "' + name
            + '"' + 'and UserPass = "' + pwd + '"';
        connection.query(sqlCmd
            , function (error, rows, fields) {
                console.log(rows.length);
                if (rows.length) {
                    //当前用户已经存在
                    var deleteCmd = 'delete from userinfo where UserName = "' + name + '"';
                    console.log(deleteCmd);
                    connection.query(deleteCmd, function () {
                        callback(true);
                    });
                } else {
                    //console.log(sqlCmd);
                    //当前用户不存在
                    callback(false);
                }
            });
    }
    deleted(req.body.username, req.body.password, function (result) {
        res.contentType('json');//返回的数据类型
        res.send(JSON.stringify({result:result }));//给客户端返回一个json格式的数据
        res.end();
    })
})
app.post('/update', urlencodedParser, function (req, res) {
    function update(name, pwd, callback) {
        var sqlCmd = 'SELECT * from userinfo where UserName="' + name + '"';
        console.log(sqlCmd);
        connection.query(sqlCmd
            , function (error, rows, fields) {
                console.log(rows.length);
                if (rows.length) {
                    //当前用户已经存在
                    var insertCmd = 'update userinfo set UserPass = "' + pwd + '"where UserName = "' + name + '"';
                    console.log(insertCmd);
                    connection.query(insertCmd, function () {
                        callback(true);
                    });
                } else {
                    //当前用户不存在
                    callback(false);
                }
            });
    }
    update(req.body.username, req.body.password, function (result) {
        res.contentType('json');//返回的数据类型
        res.send(JSON.stringify({result:result }));//给客户端返回一个json格式的数据
        res.end();
    })
});
app.post('/reg', urlencodedParser, function (req, res) {
    function reg(name, pwd, callback) {
        var sqlCmd = 'SELECT * from userinfo where UserName="' + name + '"';
        // console.log(sqlCmd);
        connection.query(sqlCmd
            , function (error, rows, fields) {
                console.log(rows.length);
                if (!rows.length) {
                    //当前用户已经注册
                    var insertCmd = 'insert into userinfo (UserName,UserPass) values ("' + name + '","' + pwd + '")';
                    connection.query(insertCmd, function () {
                        callback(true);
                    });
                } else {
                    callback(false);
                }
            });
    }
    reg(req.body.username, req.body.username, function (result) {
        res.contentType('json');//返回的数据类型
        res.send(JSON.stringify({result:result }));//给客户端返回一个json格式的数据
        res.end();
    })

})
var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log("应用实例，访问地址为 http://%s:%s", host, port)

});

