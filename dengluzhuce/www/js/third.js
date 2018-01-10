$.get('/users',function(res){
    $('#container').html(res);
})


$('button').click(function(){
    location.href = "index.html";
})