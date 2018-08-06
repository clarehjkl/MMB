$(function () {

    var shopId = 0;
    var areaId = 0;
    //注册委托事件 将参数传入
    $('.shop_list').on("click", "li", function () {
        var shop_a = this.getElementsByTagName('a')[0];
        shopId = shop_a.name;
        detail();
        // $('.shop').html(this);
        $('.down_list').removeClass('on');
    })
    $('.area_list').on("click", "li", function () {
        var area_a = this.getElementsByTagName('a')[0];
        areaId = area_a.name;
        detail();
        // $('.area').html($(this));
        $('.down_list').removeClass('on');

    })

    //注册显示下拉框事件
    $('.shop').on('click', function () {
        var on = $('.down_list').hasClass('on') ? '' : 'on';
        $('.down_list').removeClass('on');
        $('.shop_list').addClass(on);
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

    // var lisss = document.querySelector(".shop_list").getElementsByTagName("li");
    // console.log(lisss);




    // var shopId=
    // $.ajax({
    //     'url': 'http://193.112.55.79:9090/api/getgsproduct',
    //     'type':'get',
    //     'data':{'shopid':shopId,'areaid':areaId},
    //     'datatype': 'json',
    //     'success':function (res) {
    //         console.log(res);

    //     }
    // })
})