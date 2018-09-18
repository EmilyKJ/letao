$(function () {
   /*
   * 登录
   * 1.获取登录按钮并且添加点击事件
   * 2.获取用户输入的用户名和密码
   * 3.对用户输入的表单信息进行验证
   * 4.调用接口,发送ajax请求,实现登录
   * 5.登录成功,跳转到用户管理页面
   * */
   $('#login-button').on('click',function() {
       // 2.获取用户输入的用户名和密码
       var username = $('[name="username"]').val().trim();
       var password = $('[name="password"]').val().trim();
       //* 3.对用户输入的表单信息进行验证
       if (!username)  {
           alert('请输入用户名');
           return;
       }
       if(!password) {
           alert('请输入密码');
           return;
       }

       $.ajax({
           url: '/employee/employeeLogin',
           type: 'post',
           data: {
               username: username,
               password: password
           },
           success: function(res) {
               // console.log(res);
                if (res.success) {
                    location.href = "user.html"
                } else {
                    alert(res.message);
                }
           }



       })


   })




});