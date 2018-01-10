const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const expressArt = require('express-art-template');

const app = express();

app.engine('art', expressArt);
app.use(express.static('www'));
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/registe', (req, res) => {
    console.log('/registe post');

    console.log(req.body);
    const username = req.body.username;
    const password = req.body.password;
    console.log(username);
    console.log(password);

    // res.json({ message: '哈哈哈' })
    fs.readFile('users.json', (err, data) => {
        res.setHeader('Content-Type', 'application/json');
        const userArray = JSON.parse(data);
        console.log(userArray);
        for (let i = 0; i < userArray.length; i++) {
            if (username == userArray[i].username) {
                // 用户名已经存在
                const result = { success: 0, message: '用户名已存在，注册失败' }
                res.json(result);
                return;
            }
        }
        // 用户名不存在;保存数据；
        userArray.push({ username, password })
        // 把用户数组重新写入user.json;
        fs.writeFile('users.json', JSON.stringify(userArray), (err) => {
            if (err) {
                const result1 = { success: 0, message: '系统错误，请再次尝试' };
                res.json(result1);
            } else {
                const result2 = { success: 1, message: '注册成功' };
                res.json(result2);
            }
        })

    })
})

app.post('/exists', (req, res) => {
    const user = req.body;
    fs.readFile('users.json', (error, data) => {
        if (error) return errorHandle(error);
        const users = JSON.parse(data);
        for (let i = 0; i < users.length; i++) {
            const obj = users[i];
            if (obj.username == user.username) {

                res.json({ code: 0, message: '该用户已存在' });
                return;
            }
        }
        res.json({ code: 1, message: '该用户名不存在' });
    })
})


app.get('/login', (req, res) => {
    console.log('接到/login的请求了');
    console.log(req.query);
    res.setHeader('Content-Type', 'application/json');
    const username = req.query.username;
    const password = req.query.password;
    console.log(username);
    console.log(password);

    fs.readFile('users.json', (err, data) => {
        if (err) {
            res.json({ success: 0, message: '系统错误，请再次尝试' });
            return;
        }
        const arr = JSON.parse(data);
        console.log(arr);
        for (let i = 0; i < arr.length; i++) {
            if (username == arr[i].username) {
                if (password == arr[i].password) {
                    console.log('1111');
                    res.json({ success: 1, message: '登录成功' });
                    return;
                }
                res.json({ success: 0, message: '密码错误，登录失败' });
                return;
            }
        }
        res.json({ success: 0, message: '用户不存在，登录失败' });
    })

})

app.get('/users', (req, res) => {
    console.log('-------')
    fs.readFile('users.json', (err, data) =>{
        const arr = JSON.parse(data);
        console.log(arr);
        // var aa ={users:arr};
        res.render('users.art', {users:arr});
    })     
})





app.listen(3000, () => {
    console.log('监听3000端口');
})