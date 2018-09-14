/*当页面的DOM结构加载完成之后*/
$(function() {
    mui('.mui-scroll-wrapper').scroll({
        deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    });

    //获取一级分类数据
    $.ajax ({
        url: ' /category/queryTopCategory',
        type: 'get',
        success: function(response) {
            /*所谓这个模板引擎  作用就是用来帮我们将数据和html拼接好,将拼接好的结果 返回给我们*/
            // console.log(response);
            //将数据和html做拼接,它有两个参数
            //第一个参数: html 模板id
            //第二个参数: 数据(是一个对象数据类型)
            //第三步: 告诉模板引擎 HTML模板和数据怎样进行拼接
            var html = template('category-first', {result: response.rows});
            // console.log(html);
            $('#links').html(html);
            //如果一级分类有数据的话
            if (response.rows.length) {
                //给第一个一级分类的数据默认选中状态
                $('#links').find('a').eq(0).addClass('active');
                //获取第一个一级分类的数据
                var id = response.rows[0].id;
                //根据一级分类id获取二级分类的数据
                getSecondCategory(id)
            }

        }

    });

    /*
    *  点击一级分类获取二级分类数据
    *  1. 一级分类添加点击事件
    *  2.在事件处理函数中获取一级分类的id
    *  3.调用二级分类的接口获取对应的数据
    *  4.将数据展示到对应的位置中
    *  5.如果接口中没有数据,要在页面中显示暂无数据
    * */
    $('#links').on('click', 'a', function() {
        //获取当前点击的一级分类的id
        var id = $(this).attr('data-id');  //$(this).data(id);

        //给当前点击的一级分类添加选中状态
        $(this).addClass('active').siblings().removeClass('active');
        //调用接口,获取数据,  //根据一级分类id获取二级分类的数据
        getSecondCategory(id);
    });
});

function getSecondCategory(id) {
    $.ajax({
        url: '/category/querySecondCategory',
        type: 'get',
        data: {
            id: id
        },
        success: function (response) {
            console.log(response);

            var html = template('category-second', response);
            // console.log(html);
            $('.brand-list').html(html);

        }
    })
}