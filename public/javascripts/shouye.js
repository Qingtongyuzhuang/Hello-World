(function () {
    var inp_sousuo = document.getElementById('inp_sousuo')
    var btn_sousuo = document.getElementById('btn_sousuo')
    var img_sousuo = document.getElementsByClassName('index_img')
    var url = "http://127.0.0.1:3000/";
    onload= function () {
        function sendCmd(type, cb) {
            var u = url + type;
            $.post(u, {
                type: type,
                goodsname: 'indexmoren',
            }, function (data) {
// console.log(data);
                cb(data);
            });
        }


        console.log(1);
        console.log(inp_sousuo.value);
        sendCmd('select', function (result) {
            console.log(result.result);
            for (var i = 0; i < result.result.length; i++) {
                img_sousuo[i].src = result.result[i].goodstu;
            }
        })

    }







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


        console.log(1);
        console.log(inp_sousuo.value);
        sendCmd('select', function (result) {
            console.log(result.result);
            for (var i = 0; i < result.result.length; i++) {
                img_sousuo[i].src = result.result[i].goodstu;
            }
        })

    }


})()