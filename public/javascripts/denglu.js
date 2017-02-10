(function(){
    var yanzheng=document.getElementById("yanzheng");
    var erweima=document.getElementById("erweima");
    var saoma=document.getElementById("saoma");
    var zhanghao=document.getElementById("zhanghao");
    erweima.onclick=function(){
        yanzheng.style.display="none";
        saoma.style.display="block";
    }
    zhanghao.onclick=function(){
        yanzheng.style.display="block";
        saoma.style.display="none";
    }

    function GetRTime(){    var EndTime= new Date('2016/11/20 00:00:00');
        var NowTime = new Date();
        var t =NowTime.getTime() - EndTime.getTime();
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


})()