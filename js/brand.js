$(function () {
    var brandtitleid = window.location.search.split("=")[1] ? window.location.search.split("=")[1] : 0;
    var productid=0;
    //品牌排行
    $.get('http://193.112.55.79:9090/api/getbrand', {
        'brandtitleid': brandtitleid
    }, function (res) {
        console.log(res);
        var data = res.result;
        var htmlStr = template('ranking_content', {
            'data': data
        });
        $('.ranking_content').html(htmlStr);
    }, 'json');
    //销量排行
    $.get('http://193.112.55.79:9090/api/getbrandproductlist', {
        'brandtitleid': brandtitleid
    }, function (res) {
        var data = res.result;
        var htmlStr = template('sales_content', {
            'data': data
        });
        $('.sales_content').html(htmlStr);
    }, 'json');
    //最新评论
    $.get('http://193.112.55.79:9090/api/getproductcom', {
        'productid': productid
    }, function (res) {
        var data = res.result;
        var htmlStr = template('comment_content', {
            'data': data
        });
        $('.comment_content').html(htmlStr);
    }, 'json')
})