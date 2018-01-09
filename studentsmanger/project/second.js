$('.navbar-header>a').click(function (event) {
    event.preventDefault();
    console.log('---');
    location.href = 'index.html';
})

$('form').submit(function (event) {
    event.preventDefault();
    // const id = $(this).index();
    // console.log(id);
    const value = $(this).serialize();
    $.post('/tijiao', value, function (res) {
        console.log(res);
        if (res.success == 0) {
            alert(res.message);
        } else {
            location.href = 'index.html';
        }
    })
})


// console.log(location)
// const phone =location.search;
// console.log(phone);
// $.get('/alter'+phone+'',function(res){
//     console.log(res);
//     $('#name').val(res.name);
//     $('#age').val(res.age);
//     $('#phone').val(res.phone);
//     $('#email').val(res.email);
//     $('#intro').val(res.intro);
// })


