/* Created by Administrator on 2016/10/21 0021.*/
var http = require("http");            //提供web服务
var url = require("url");            //解析GET请求
var query = require("querystring");    //解析POST请求

var mysql=require('mysql');
var connection=mysql.createConnection({
  host:'127.0.0.1',
  user:'root',
  password:'',
  database:'nodesample'
});

//lianjie


//服务
var server = function (request, response) {
  //定义报文头
  response.writeHead(200, {"Content-Type": "text/json", "Access-Control-Allow-Origin": "*"});
  //判断是GET/POST请求
  if (request.method == "GET") {
    var params = [];
    params = url.parse(request.url, true).query;
    console.log(params);
    params['fruit'] = compute(params);
    response.write(JSON.stringify(params));
    response.end();
  } else {
    var postdata = '';
    request.addListener("data", function (postchunk) {
      console.log('data：' + postchunk);
      postdata += postchunk;


    })

    //POST结束输出结果
    request.addListener("end", function () {
      var params = query.parse(postdata);
      console.log(params);

      function login (user,pass,callback) {
        if(user=='dahuang'&&pass=='dahuang'){
          connection.query("DELETE FROM userinfo WHERE id=1;")
        }else if(user=='asd'){
          connection.query("UPDATE userinfo SET UserName='gaigaigai' WHERE id=2;")
        } else{
        connection.query('select * from userinfo where UserName = "'+user + '"'+'and UserPass = "'+ pass +'"',function (error,rows,fields) {
          if(error){
            throw error;
          }
          console.log(rows);
          if(rows.length) {
            callback(true);
          }else {
            callback(false);
          }
        });
        }
      }
      login(params.username,params.pwd,function (result) {
        params['res']=result;
        response.write(JSON.stringify(params));
        response.end();
      });

      login("params.username","params.pwd",function(result){
        params['res']=result;
        console.log(result);

      });

      //if (params.username == 'admin' && params.pwd == 'admin') {
      //  params['res'] = true;
      //} else {
      //  params['res'] = false;
      //}
      response.write(JSON.stringify(params));
      response.end();

    })
  }

}
//connection.query("INSERT INTO userinfo (Id,UserName,UserPass)"+
//   "values(6,'zxc','123')",[],function(error){
//if(error){
//        console.log('wrong');
//       throw error;
//
//    }
//});
//开启服务在127.0.0.1:8080
http.createServer(server).listen(3000);
console.log("Server start!");
