/**
 * Created by Administrator on 2016/10/21 0021.
 */
(function(){
	var user = document.getElementById('user')
	var pass = document.getElementById('password')
	var btn_denglu = document.getElementById('btn_denglu')

	var url = "http://127.0.0.1:3000/";

	function sendCmd(type, cb) {
		var u = url+type;
		$.post(u, {
			type: type,
			username: user.value,
		    password: pass.value

		}, function (data, status) {

			console.log(data);
			cb(data);
		});
	}
	btn_denglu.onclick = function () {
		console.log(1);
		console.log(user.value);
		console.log(pass.value);

		sendCmd('login', function (result) {
			if (result.result==true) {
				alert("登录成功");
			} else {
				alert("登录失败");
			}
		})
	}


})()
