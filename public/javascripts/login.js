(function () {
    var userName = document.getElementById('name');
    var password = document.getElementById('password');
    var btn_login = document.getElementById('login');
    var btn_reg = document.getElementById('reg');
    var btn_update = document.getElementById('update');
    var btn_delete = document.getElementById('delete');
    var url = "http://127.0.0.1:8081/";

    function sendCmd(type, cb) {
        var u = url+type;
        $.post(u, {
            type: type,
            username: userName.value,
            password: password.value
        }, function (data, status) {
            console.log(data);
            cb(data);
        });
    }

    btn_login.onclick = function () {
        sendCmd('login', function (result) {
            if (result.result==true) {
                alert("登录成功");
            } else {
                alert("登录失败");
            }
        })
    }

    btn_delete.onclick = function () {
        sendCmd('del', function (data) {
            if (data.result==true) {
                alert("删除成功");
            } else {
                alert("删除失败");
            }
        });

    }
    btn_update.onclick = function () {
        sendCmd('update', function (data) {
            if (data.result==true) {
                alert("修改成功");
            } else {
                alert("修改失败");
            }
        });
    };

    //注册按钮
    btn_reg.onclick = function () {
        sendCmd('reg', function (data) {
            if (data.result==true) {
                alert("注册成功");
            } else {
                alert("注册失败");
            }
        });

    };

    //登录按钮


})();