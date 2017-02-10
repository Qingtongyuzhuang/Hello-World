(function(){
    //倒计时
    function GetRTime(){    var EndTime= new Date('2016/11/20 00:00:00');
        var NowTime = new Date();
        var t =EndTime.getTime() - NowTime.getTime();
        var d=0;    var h=0;    var m=0;    var s=0;
        if(t>=0){      d=Math.floor(t/1000/60/60/24);
            h=Math.floor(t/1000/60/60%24);
            m=Math.floor(t/1000/60%60);
            s=Math.floor(t/1000%60);    }
        document.getElementById("t_d").innerHTML = d ;
        document.getElementById("t_h").innerHTML = h;
        document.getElementById("t_m").innerHTML = m;
        document.getElementById("t_s").innerHTML = s ;  }
    setInterval(GetRTime,0);

    //验证吗
    var code ; //在全局 定义验证码
    onload=function createCode(){
        code = new Array();
        var codeLength = 4;//验证码的长度
        var checkCode = document.getElementById("checkCode");
        checkCode.value = "";

        var selectChar = new Array(2,3,4,5,6,7,8,9,'A','B','C','D','E','F','G','H','J','K','L','M','N','P','Q','R','S','T','U','V','W','X','Y','Z');

        for(var i=0;i<codeLength;i++) {
            var charIndex = Math.floor(Math.random()*32);
            code +=selectChar[charIndex];
        }
        if(code.length != codeLength){
            createCode();
        }
        checkCode.value = code;
    }
    var kanbu=document.getElementById('kanbu');
    kanbu.onclick=function createCode(){
        code = new Array();
        var codeLength = 4;//验证码的长度
        var checkCode = document.getElementById("checkCode");
        checkCode.value = "";

        var selectChar = new Array(2,3,4,5,6,7,8,9,'A','B','C','D','E','F','G','H','J','K','L','M','N','P','Q','R','S','T','U','V','W','X','Y','Z');

        for(var i=0;i<codeLength;i++) {
            var charIndex = Math.floor(Math.random()*32);
            code +=selectChar[charIndex];
        }
        if(code.length != codeLength){
            createCode();
        }
        checkCode.value = code;
    }
var  button1=document.getElementById('Button1');
   button1.onclick= function validate () {
        var inputCode = document.getElementById("input1").value.toUpperCase();

        if(inputCode.length <=0) {
            alert("请输入验证码！");
            return false;
        }
        else if(inputCode != code ){
            alert("验证码输入错误！");
            createCode();
            return false;
        }
        else {
            alert("成功！");
            return true;
        }
    }



    var username = document.getElementById('user');
    var password = document.getElementById('password');
    var btn_zhuce = document.getElementById('btn_zhuce');

    var url = "http://127.0.0.1:3000/";

    function sendCmd(type, cb) {
        var u = url+type;
        $.post(u, {
            type: type,
            username: username.value,
            password: password.value
        }, function (data, status) {
            console.log(data);
            cb(data);
        });
    }

     //注册按钮
    btn_zhuce.onclick = function () {
        sendCmd('reg', function (data) {

            if (data.result==true) {
                alert("注册成功");
            } else {
                alert("注册失败");
            }
        });

    };
})()