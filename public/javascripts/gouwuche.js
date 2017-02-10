(function () {
    var url = "http://127.0.0.1:3000/";
    onload = function () {
        console.log('gou1');
        function sendCmd(type, cb) {
            var u = url + type;
            $.post(u, {
                type: type,
                goodsname: 'gou1',
            }, function (data) {
                cb(data);
            });
        }


        console.log(1);
        sendCmd('jia', function (data, status) {
             var d = document.createElement("div");
            d.classlist = 'gwcwztou';
            var gwc_top=document.getElementById("gwc_top");

            gwc_top.appendChild(d);
            for (var i = 0; i < data.length; i++) {
                //var tu = '<div class="gwc_xuan"><img src="images/xuan.png" class="xuan"></div>';
                var shutu = '<div><img src=' + data.goodstu + 'class="gwcsp"></div>';
                var jieshou = ' <div style="margin-left:5px ; font-size:10pt"><p>新贝 NCVI 2档可调宽口奶瓶手动吸奶器8610 </p></div>';
                var gg = '<div class="gwc_gg"> 18*19</div>';
                var jg = '<div class="gwc_jg">' + data.goodsjiage + '</div>';
                var shuliang = '<div class="shuliang"><button class="fuhao"> +</button><div class="shuzi">1</div> <button class="fuhao"> -</button></div>';
                var xiaoji = ' <div class="xiaoji">¥118</div>';
                var shanchu = '  <div class="caozuo"> 删除</div>';
                var yanse = '<div class="yanse">米白</div>';
                var bianhao = '<div class="bianhao"> 商品编号：1176540</div>';
                d.innerHTML+= shutu + jieshou + gg + jg + shuliang + xiaoji + shanchu + yanse + bianhao;
            }
            var bd_yixuan=document.getElementById('bd_yixuan');

    });
    }
})()