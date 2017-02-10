var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'nodesample'
});
/* GET home page. */
router.post('/', function (req, res, next) {
    res.render('index', {title: 'Express'});
});


router.post('/login', function (req, res) {
    console.log(res);
    function login(name, pwd, callback) {
        var sqlCmd = 'SELECT * from zhuce where UserName="' + name + '"and UserPass="' + pwd + '"';
        console.log(sqlCmd);
        connection.query(sqlCmd
            , function (error, rows) {
                //console.log(rows);
                if (rows.length) {
                    //根据用户名和密码查找到匹配的数据
                    callback(true)
                } else {
                    //没有匹配的数据
                    callback(false);
                }
            });
    }

    login(req.body.username, req.body.password, function (result) {
        res.contentType('json');//返回的数据类型
        res.send(JSON.stringify({result: result}));//给客户端返回一个json格式的数据
        res.end();
    })
})

//注册
router.post('/reg', function (req, res) {
    //console.log(req.body);
    function reg(name, pwd, callback) {
        var sqlCmd = 'SELECT * from zhuce where UserName="' + name + '"';
        // console.log(sqlCmd);
        connection.query(sqlCmd
            , function (error, rows, fields) {
                //console.log(rows.length);
                if (!rows.length) {
                    //当前用户已经注册
                    var insertCmd = 'insert into zhuce (UserName,UserPass) values ("' + name + '","' + pwd + '")';
                    console.log(insertCmd);
                    connection.query(insertCmd, function (error, rows) {
                        if (error) {
                            throw error;
                        }
                        callback(true);
                    });

                } else {
                    callback(false);
                }
            });
    }

    reg(req.body.username, req.body.password, function (result) {
        res.contentType('json');//返回的数据类型
        res.send(JSON.stringify({result: result}));//给客户端返回一个json格式的数据
        res.end();
    })

})

//搜索
router.post('/select', function (req, res) {
    //console.log(1);
    //console.log(res);
    function select(name, callback) {
        var sqlCmd = 'SELECT * from goods where goodsname like "%' + name + '%"';
        //console.log(sqlCmd);
        connection.query(sqlCmd
            , function (error, rows) {
                //console.log(rows.goodstu);

                callback(rows);

            });
    }

    select(req.body.goodsname, function (result) {
        res.contentType('json');//返回的数据类型
        res.send(JSON.stringify({result: result}));//给客户端返回一个json格式的数据
        //console.log(result);
        res.end();
    })
})


//gouwuche
router.post('/jia', function (req, res) {
    console.log(1);
    //console.log(res);

    console.log(req.body);
    connection.query('SELECT * from goods where goodsname= "' + req.body.goodsname + '"', function (error, rows, callback) {

        console.log(rows);
        res.send(rows);
    })
    function seldoods(name, callback) {
        connection.query('SELECT * from goods where goodsname= "' + req.body.goodsname + '"'
            , function (error, rows) {
                callback(rows);
            });
    }
    function insgwc(name, callback) {
        connection.query('  * from goods where goodsname= "' + req.body.goodsname + '"'
            , function (error, rows) {
                callback(rows);
            });
    }

})

module.exports = router;
