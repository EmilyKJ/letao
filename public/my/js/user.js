$(function() {

    /*退出登录
    1.获取到退出登录按钮并添加点击事件
    2.调用退出登录接口实现 退出登录
    3.如果退出登录成功,跳转到首页
    * */
    $("#logout").on('tap', function() {

        $.ajax({
            url: '/user/logout',
            type: 'get',
            success: function (res) {

            }
        })


    })





});