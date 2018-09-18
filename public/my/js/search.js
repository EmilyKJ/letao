$(function (){
    /*实现用户点击搜索按钮跳转到搜索结果页面
    * 1.给搜索按钮添加点击事件
    * 2.获取用户输入的搜索关键字
    * 3.判断用户是否输入了搜索关键字
    * 4.如果用户没有输入,阻止跳转,并且给出提示
    * 5.如果用户输入了, 跳转到搜索结果里面 并且要将用户输入的关键字带到这个页面中去
    * */
    //* 1.给搜索按钮添加点击事件
    $('#search-btn').on('click', function () {
        //* 2.获取用户输入的搜索关键字
        var keyword = $(this).siblings('input').val();
        // console.log(keyword);

       //* 3.判断用户是否输入了搜索关键字
        if (keyword) {

            //将用户输入的关键字存在数组中
            keyArr.unshift(keyword);
            //要想把数据进行长时间的存储必须把它存到localStorage.setItem()
            //将关键字数组存储到本地localStorage 它只能存字符串, JSON.stringify(keyArr):将数组转换成字符串
            localStorage.setItem('keyArr', JSON.stringify(keyArr));
            //5.如果用户输入了, 跳转到搜索结果里面 并且要将用户输入的关键字带到这个页面中去
            location.href = "search-result.html?keyword=" + keyword;
        }else {
            //用户没有输入关键字
            alert('请输入搜索关键字');
        }

    });

    /*
    * 实现历史关键字存储
    * 1. 准备一个存储关键字的数组
    * 2.当用户点击搜索按钮的时候,将用户输入的关键字追加到数组中
    * 3.将数组存储在本地存储中
    * 4.在页面一上来的时候,就判断本地存储中是否已经有已经存储的关键字
    * 5.将数据和HTML进行拼接.并展示到页面中
    * */

    //1.存储关键字的数组
    var keyArr = [];

    if (localStorage.getItem('keyArr')) {
        keyArr = JSON.parse(localStorage.getItem('keyArr')); //JSON.parse()将字符串转换成数组

        var html = template('historyTpl', { result: keyArr });

        $("#history-box").html(html);
        // console.log(keyArr);
        // console.log(html);

    }

    /*
    * 实现清空历史记录
    * 1.给元素添加点击事件
    * 2.清空页面中的数据
    * 3.清空本地存储中的数据
    * */

    $("#clearBtn").on('tap',function () {
        //2.清空页面中的数据
        $('#history-box').html('');
        //3.清空本地存储中的数据
        localStorage.removeItem('keyArr');
    })


});