
//获取品牌
$.ajax({
    'url': 'http://193.112.55.79:9090/api/getbrandtitle',
    'type': 'get',
    'data': '',
    'datatype':'json',
    success:function (res) {
        var data =res.result;
        var sign_detail = template('sign_detail',{
            'data':data
        })
        console.log(data);
        $('.sign_detail').html(sign_detail);
    }
})