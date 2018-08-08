$(function () {
    var couponid = window.location.search.split("=")[1] ? window.location.search.split("=")[1] : 0;
    var couponProductId;
    //页面获取数据
    $.get('http://193.112.55.79:9090/api/getcouponproduct', {
        'couponid': couponid
    }, function (res) {
        var data = res.result;
        var htmlStr = template('ticket_detail', {
            'data': data
        });
        $('.ticket_detail').html(htmlStr);
        open();
        close();
    }, 'json')
    //点击图片 触发轮播图
    function open() {
        $('.ticket_detail').on('tap', 'li', function () {
            //获取轮播图片信息
            couponProductId = $(this).attr('couponProductId');
            console.log(couponProductId);

            $('.shade').addClass('on');
            var imgs = $('.ticket_detail img');
            var htmlimg = "";
            for (var i = 0; i < imgs.length; i++) {
                htmlimg += "<img src='" + imgs[i].src + "'>"
            }
            $('.carousel_box').html(htmlimg);
            next();
            prevent();
            $('.carousel_box').css('top', couponProductId * (-120));
        })
    }

    function close() {
        $('.shade').on('tap', function () {
            $(this).removeClass('on');
        })
    }

    function next() {
        $('.carousel_right').on('tap', function () {
            var max = Math.floor($('.carousel_box').css('height').split('p')[0]/120);
            // console.log(max);
            
            if (couponProductId >=max) {
                couponProductId = max;
                alert('你484傻，最后一个也要试一试');
            } else {
                couponProductId = couponProductId-1+2;
            }
            $('.carousel_box').css('top', couponProductId * (-120));

            return false;
        })
    }

    function prevent() {
        $('.carousel_left').on('tap', function () {
            if (couponProductId == 0) {
                couponProductId = 0;
                alert('MDZZ,第0个还向上翻');
            } else {
                couponProductId--;
            }
            $('.carousel_box').css('top', couponProductId * (-120));
            
            return false;
        })
    }
})