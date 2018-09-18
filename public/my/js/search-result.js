
//1.获取到地址栏中用户输入的搜索关键字
var keyword = getParamsByUrl(location.href, 'keyword');
//当前页
var page = 1;
//页面中的数据
var html = "";
//价格排序规则 默认是升序
var priceSort = 1;
//销量排序规则 默认是降序
var numSort = 2;

var This = null;

$(function() {
    /*
        根据用户输入的关键字获取搜索结果
        1.获取到地址栏中用户输入的搜索关键字
        2.用关键字去调取搜索接口
        3.将搜索结果展示在页面中

    */

    // console.log(keyword);

    mui.init({
        pullRefresh : {
            container: '#refreshContainer',//待刷新区域标识，querySelector能定位的css选择器均可，比如：id、.class等
            up : {
                height:50,//可选.默认50.触发上拉加载拖动距离
                auto:true,//可选,默认false.自动上拉加载一次
                contentrefresh : "正在加载...",//可选，正在加载状态时，上拉加载控件上显示的标题内容
                contentnomore:'没有更多数据了',//可选，请求完毕若没有更多数据时显示的提醒内容；
                callback: getData //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
            }
        }
    });
    // callback 页面一上来的时候 会自动调用一次
    // 当页面上拉到底部时还会继续调用

    /*
    * 按照价格对商品进行排序
    * 1.对价格按钮添加轻敲事件
    * 2.将价格排序规格传递到接口中
    * 3.对之前的各种配置进行初始化
    *       页面中的数据清空
    *       回复当前页的值为1
    *       重新开启上拉加载
    * 4.将排序后的结果重新展示在页面中
    * */
    $("#priceSort").on('tap',function () {
        //更改价格排序条件
        priceSort = priceSort == 1 ? 2 : 1;
        //* 3.对之前的各种配置进行初始化
        //     *       页面中的数据清空
        //     *       回复当前页的值为1
        //     *       重新开启上拉加载
        html = "";
        page = 1;
        mui('#refreshContainer').pullRefresh().refresh(true);
        //4.将排序后的结果重新展示在页面中
        getData();
    });

    $('#numSort').on('tap', function () {
        //更改销量排序条件
        numSort = numSort == 2 ? 1 : 2;
        //* 3.对之前的各种配置进行初始化
        //     *       页面中的数据清空
        //     *       回复当前页的值为1
        //     *       重新开启上拉加载
        html = "";
        page = 1;
        mui('#refreshContainer').pullRefresh().refresh(true);
        //4.将排序后的结果重新展示在页面中
        getData();
        // window.getData(); 函数内部的this指向变为window, 要改变把This变为全局变量
    })

});



    /*
     获取地址栏中的参数
     @param {string} url 地址字符串
    * @param {string} name 要获取的参数名称
    * @return {string} 参数名称对应的参数值
    * */
function getParamsByUrl(url, name) {
   // console.log(url.indexOf('?'));
   //  console.log(url.substr(url.indexOf('?') + 1));
    var params = url.substr(url.indexOf('?') + 1);
    // console.log(params.split('&'));
    var param = params.split('&');
    for (var i = 0; i < param.length; i++) {
        // console.log(param[i].split('='));
        var current = param[i].split('=');
        if (current[0] == name) {
            return current[1];
        }

    }
    return null;
}

function getData() {

    if (!This) {
        This = this;
    }

    //2.用关键字去调取搜索接口
    $.ajax({
        url: '/product/queryProduct',
        type: 'get',
        data: {
            page: page++,
            pageSize: 3,
            proName: keyword,
            price: priceSort,
            num: numSort
        },
        success: function (response) {
            // console.log(response);
            if (response.data.length > 0 ) {
                html += template('searchTp1', response);
                $('#search-box').html(html);
                //加载完毕，隐藏"正在加载"提示（mui框架提供）
                //1、加载完新数据后，必须执行如下代码，true表示没有更多数据了：
                //2、若为ajax请求，则需将如下代码放置在处理完ajax响应数据之后
                //告诉上拉加载组件,当前数据加载完毕
                This.endPullupToRefresh(false);
            } else {
                //告诉上拉加载组件,当前数据加载完毕,没有更多数据了
                This.endPullupToRefresh(true);
            }

        }

    })
}
