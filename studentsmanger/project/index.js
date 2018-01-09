$('.container>button:eq(0)').click(function (event) {
    event.preventDefault();
    console.log('---');
    location.href = 'second.html';
})
var array;
// $.get('/students', function (res) {
//     array = res;
//     console.log(res);
//     const html = template('stuData', { data: res });
//     $('#contain').append(html);

// })
$('#contain').on('click', '#alter', function () {


    console.log('11111');

    var phone = $(this).parent().find('th:eq(2)').html();

    console.log(phone);
    location.href = 'third.html?phone=' + phone;
})
// var del =$('#del');
// console.log(del);
$('#contain').on('click', '#del', function () {
    console.log('#del');
    var name = $(this).parent().find('th:eq(0)').html();
    var tr = $(this).parent();
    console.log(name);
    $('#delete .modal-body p').text('点击确定删除' + name);
    $('#delete .modal-footer>button:eq(0)').click(function () {
        $.get('/del?name=' + name + '', function (res) {
            console.log(res);
            // var html = template('stuData',{data:res});
            // $('#contain').append(html);
            // location.href = 'index.html';
        })
        $(tr).remove();
    })
    $('#delete .modal-footer>button:eq(1)').click(function () {

        location.href = 'index.html';

    })

})





$('#name,#phone').on('input', function () {
    console.log('789');
    const value = $(this).val();
    $('.modal-footer').on('click', '#searchone', function () {
        console.log('124');

        console.log(value);
        const result = array.filter((item, index, arr) => {
            return item.name.includes(value) || item.phone.includes(value);
        });
        console.log(result);
        const student = template('stuData', { data: result });
        $('#contain').html(student);
    })

})


var page = 1;
var limit = 5;

// var res = {
//     totalPage: 12,
//     currentPage: 3,
//     students: [
//         { id: '12', name: 'ryut', age: 23, phone: 13333333, intro: '合同价款收到货高科技', email: '133@qq.com' },
//         { id: '12', name: 'ryut', age: 23, phone: 13333333, intro: '合同价款收到货高科技', email: '133@qq.com' },
//         { id: '12', name: 'ryut', age: 23, phone: 13333333, intro: '合同价款收到货高科技', email: '133@qq.com' }
//     ]
// }
// let pages = [];
// for (let i = 1; i <= res.totalPage; i++) {
//     pages.push(i);
// }
// var html = template('page', { totalPage: res.totalPage, currentPage: res.currentPage, pages: pages });
// // console.log(html);
// $('#pages').html(html);





function getStudents(page) {
    console.log(page);
        $.get('/student?page=' + page + '&limit=5', function (res) {
            console.log(res);  
            array = res.students;         
            let pages = [];
            for (let i = 1; i <= res.totalPage; i++) {
                pages.push(i);
            }
            var html = template('page', { totalPage: res.totalPage, currentPage: res.currentPage, pages: pages });
            // console.log(html);
            $('#pages').html(html);
            // let stu = res.students;
            const htm = template('stuData', { data: res.students });
            $('#contain').html(htm);

        })
    
}

getStudents(1);