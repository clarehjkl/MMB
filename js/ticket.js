$(function () {
    $.get('http://193.112.55.79:9090/api/getcoupon','',function (res) {
        var data=res.result;
        var htmlStr = template('ticket_category',{
            'data':data
        });
        $('.ticket_category ul').html(htmlStr);
    },'json')
})