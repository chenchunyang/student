const http = require('http');
const fs = require('fs');
const url = require('url');
const querystring = require('querystring');

const server = http.createServer();
server.on('request', (req, res) => {
    // console.log(req.url);
    const regex = /(\.js|\.css|\.html|\/$)|(fonts+)/;
    if (regex.test(req.url)) {
        // console.log('=====');
        const urlstr = req.url.split('?')[0];
        const r = fs.createReadStream('project' + (urlstr == '/' ? '/index.html' : urlstr));
        r.pipe(res);
    }

    if (req.url === '/tijiao') {
        recHandle(req, res);
    }

    if (req.url === '/xiugai') {
        changeHandle(req, res);
    }

    if (req.url === '/students') {
        backHandle(req, res);
    }
    const urls = url.parse(req.url,true);
    // console.log(urls);
    if (urls.pathname === '/del') {
        delHandle(req, res);
        // console.log('123');
    }

    const urla = url.parse(req.url,true);
    if (urla.pathname === '/alter') {
        alterHandle(req, res);
        console.log('1ab');
        
        // console.log(urla);
    }

    const urlb = url.parse(req.url,true);
    console.log(urlb);
    if (urlb.pathname === '/student') {
        pageHandle(req, res);
        // console.log('1ab');
        
       
    }
});


server.listen(3000);



function errorHandle(err, res) {
    res.end(JSON.stringify({ success: 0, message: '系统错误，再次尝试' }));
}

function backHandle(req, res) {
    res.setHeader('Content-Type', 'application/json');
    const r = fs.createReadStream('stuRecond.json');
    r.pipe(res);
}

function changeHandle(req, res) {
    res.setHeader('Content-Type', 'application/json');
   
    let total = '';
    req.on('data', (data) => {
        total += data;
    })
    req.on('end', () => {
        // console.log(total);
        const totalObj = querystring.parse(total);
        // console.log(totalObj);

        const name = totalObj.name;
        const age = totalObj.age;
        const phone = totalObj.phone;
        const email = totalObj.email;
        const intro = totalObj.intro;

        fs.readFile('stuRecond.json', (err, data) => {
            if (err) return errorHandle(err, res);
            const dataArr = JSON.parse(data);
            console.log(dataArr);
            // dataArr.unshift({ name, age, phone, email, intro });
            for(let i = 0;i<dataArr.length;i++){
                if(dataArr[i].name == name){
                    dataArr[i].age =age;
                    dataArr[i].phone =phone;
                    dataArr[i].email =email;
                    dataArr[i].intro =intro;
                }
            }
            console.log(intro);
            fs.writeFile('stuRecond.json', JSON.stringify(dataArr), (err) => {
                if (err) return errorHandle(err, res);
                res.end(JSON.stringify({ success: 1, message: '提交成功' }));
                return;
            })
        })
    })
}

function recHandle(req, res) {
    res.setHeader('Content-Type', 'application/json');
   
    let total = '';
    req.on('data', (data) => {
        total += data;
    })
    req.on('end', () => {
        // console.log(total);
        const totalObj = querystring.parse(total);
        // console.log(totalObj);

        const name = totalObj.name;
        const age = totalObj.age;
        const phone = totalObj.phone;
        const email = totalObj.email;
        const intro = totalObj.intro;

        fs.readFile('stuRecond.json', (err, data) => {
            if (err) return errorHandle(err, res);
            const dataArr = JSON.parse(data);
            console.log(dataArr);
            dataArr.unshift({ name, age, phone, email, intro });
            // for(let i = 0;i<dataArr.length;i++){
            //     if(dataArr[i].name == name){
            //         dataArr[i].age =age;
            //         dataArr[i].phone =phone;
            //         dataArr[i].email =email;
            //         dataArr[i].intro =intro;
            //     }
            // }
            console.log(intro);
            fs.writeFile('stuRecond.json', JSON.stringify(dataArr), (err) => {
                if (err) return errorHandle(err, res);
                res.end(JSON.stringify({ success: 1, message: '提交成功' }));
                return;
            })
        })
    })
}


function delHandle(req, res) {
    const urls = url.parse(req.url,true);
    // console.log(urls);
    res.setHeader('Content-Type', 'application/json');
    const name = urls.query.name;
    // console.log(name);
    fs.readFile('stuRecond.json', (err, data) => {
        const arr = JSON.parse(data);
        // console.log(arr);
        for(let i =0 ;i< arr.length ; i++){
            if(name == arr[i].name){
                arr.splice(i,1);
                fs.writeFile('stuRecond.json',JSON.stringify(arr),(err)=>{
                    return res.end(JSON.stringify(arr));
                })
            }
        }
    })
}


function alterHandle(req, res) {
    const urla = url.parse(req.url,true);
    console.log(urla);
    res.setHeader('Content-Type', 'application/json');
    const phone = urla.query.phone;
    console.log('----');
    console.log(phone);
    fs.readFile('stuRecond.json', (err, data) => {
        const arr1 = JSON.parse(data);
        // console.log(arr1);
        for(let i =0 ;i< arr1.length ; i++){
            if(phone == arr1[i].phone){
               const arr2 = arr1[i];    
               console.log(arr2);           
                    return res.end(JSON.stringify(arr2));                
            }
            
        }
    })
}


function pageHandle(req, res) {
    const urlc = url.parse(req.url,true);
    // console.log(urls);
    res.setHeader('Content-Type', 'application/json');
    const limit = urlc.query.limit;
    const page = urlc.query.page;
    console.log(limit);
    console.log(page);
    // console.log(name);
    fs.readFile('stuRecond.json', (err, data) => {
        const arr3= JSON.parse(data);
        // console.log(arr3);
        const totalPage =Math.ceil(arr3.length / limit);
        const currentPage = page;

        var students = arr3.slice((currentPage - 1) * limit,currentPage*limit);
           
        const array ={totalPage,currentPage,students};
        console.log(array);
        return res.end(JSON.stringify(array));
    })
}