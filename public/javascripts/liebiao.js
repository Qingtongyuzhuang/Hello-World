(function () {
    var inp_sousuo = document.getElementById('inp_sousuo')
    var btn_sousuo = document.getElementById('btn_sousuo')
    var img_sousuo = document.getElementsByClassName('tu1')
    var btn_jiaru = document.getElementsByClassName('jiache')
    var url = "http://127.0.0.1:3000/";
//刷新加载
    onload = function () {
        function sendCmd(type, cb) {
            var u = url + type;
            $.post(u, {
                type: type,
                goodsname: 'liebiaomoren',
            }, function (data) {
// console.log(data);
//                sessionStorage.data1=data;
                cb(data);
            });
        }


        //console.log(1);
        //console.log(inp_sousuo.value);
        sendCmd('select', function (result) {
            //console.log(result.result);
            for (var i = 0; i < result.result.length; i++) {
                img_sousuo[i].src = result.result[i].goodstu;
            }
        })

    }

//搜索
    btn_sousuo.onclick = function () {
        function sendCmd(type, cb) {
            var u = url + type;
            $.post(u, {
                type: type,
                goodsname: inp_sousuo.value,
            }, function (data) {
// console.log(data);
                cb(data);
            });
        }


        sendCmd('select', function (result) {
            console.log(result.result);
            for (var i = 0; i < result.result.length; i++) {
                img_sousuo[i].src = result.result[i].goodstu;
            }
        })

    }
    //购物车

    for (var i = 0; i < btn_jiaru.length; i++) {
        (function (i) {
            btn_jiaru[i].onclick = function () {
                var u = url +'jia';
                $.post(u, {
                        goodsname: 'gou1'
                    }, function (data) {
                        console.log(data);
                    }
                );
            }
        })(i)

    }



})()