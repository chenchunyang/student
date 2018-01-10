
$('form').submit(function(event){
    event.preventDefault();
    const value = $(this).serialize();
    console.log(value);
    $.get('/login?'+value,function(res){
        console.log(res);
        if(res.success  == 0){
          
            alert(res.message);
            $('input[type!=submit]').val('');
        }else{

            location.href = 'third.html';
        }
    })
})