$(function () {
    //在mui 组件中会默认阻止a标签的默认跳转,因此设置公共的js回复a元素的跳转
    $('body').on('tap','a', function () {
        mui.openWindow({
            url: $(this).attr('href')
        });
    });

});