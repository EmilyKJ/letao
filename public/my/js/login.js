$(function() {

    /*
    * 用户登录
    * 1.获取登录按钮并且添加点击事件
    * 2.获取用户输入的扁担信息
    * 3.调用登录接口实现登录
    * 4.如果用户登录成功跳转到会员中心
    * */

    $("#login-btn").on('tap', function() {
        //1.获取登录按钮并且添加点击事件
        var username = $("[name='username']").val().trim();
        var password = $("[name='password']").val().trim();

        if (!username) {
            mui.toast('请输入用户名');
            return;
        }
        if (!password) {
            mui.toast('请输入密码');
            return;
        }

        $.ajax ({
            url: ' /user/login',
            type: 'post',
            data: {
                username: username,
                password: password
            },
            beforeSend: function () {
                $("#login-btn").html("正在登录中...")
            },
            success: function (res) {
                mui.toast("登录成功");
                setTimeout(function() {
                    location.href = "user.html";
                }, 2000);
            }

        })
    })



});