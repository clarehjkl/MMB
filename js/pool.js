$(function () {

    var shopId = 0;
    var areaId = 0;
    //注册委托事件 将参数传入 显示筛选类别
    $('.shop_list').on("click", "li", function () {
        var shop_text = $(this).children('a').html();
        var shop_a = $(this).children('a')[0];
        shopId = shop_a.name;
        $('.shop li a').html(shop_text +" <i class='glyphicon glyphicon-triangle-bottom'></i>");
        $('.down_list').removeClass('on');
        $('.shop_list li span').removeClass('on');
        $(this).children('span').addClass('on');
        detail();
        
    })
    $('.area_list').on("click", "li", function () {
        var area_text = $(this).children('a').html();
        var area_a=$(this).children('a')[0];
        areaId = area_a.name;
        area_text = area_text.split('（')[0];
        $('.area li a').html(area_text + " <i class='glyphicon glyphicon-triangle-bottom'></i>");
        $('.down_list').removeClass('on');
        $('.area_list li span').removeClass('on');
        $(this).children('span').addClass('on');
        detail();
        
    })

    //注册显示下拉框事件
    $('.shop').on('click', function () {
        var on = $('.down_list').hasClass('on') ? '' : 'on';
        $('.down_list').removeClass('on');
        $('.shop_list').addClass('on');
    })
    $('.area').on('click', function () {
        var on = $('.down_list').hasClass('on') ? '' : 'on';
        $('.down_list').removeClass('on');
        $('.area_list').addClass('on');
    })

    //获取店铺名称
    $.get("http://193.112.55.79:9090/api/getgsshop", "", function (res) {
        console.log(res);
        var data = res.result;
        var shop_list = template('shop_list', {
            "data": data
        });
        $('.shop_list').html(shop_list);
    }, 'json');
    //获取地区
    $.get('http://193.112.55.79:9090/api/getgsshoparea', '', function (res) {
        console.log(res);
        var data = res.result;
        var area_list = template('area_list', {
            'data': data
        });
        $('.area_list').html(area_list);
    }, 'json');
    //获取商品列表
    // shopId = $('.shop li a').attr('name');
    // areaId = $('.area li a').attr('name');
    detail();

    function detail() {

        $.ajax({
            'url': 'http://193.112.55.79:9090/api/getgsproduct?shopid=' + shopId + '&areaid=' + areaId,
            'type': 'get',
            'data': {
                'shopId': shopId,
                'areaId': areaId
            },
            'datatype': 'json',
            'success': function (res) {
                var data = res.result;
                console.log(shopId, areaId);
                var content = template('content', {
                    'data': data
                });
                $('.content').html(content);
            }
        })
    }

})