const express = require('express');
const expressHbs = require('express-handlebars');
const path = require('path');
const app = express();
const fs = require('fs');

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(express.static(path.join(__dirname, 'static')));

app.set('view engine', '.hbs');
app.engine('.hbs', expressHbs({
    defaultLayout: false
}));
app.set('views', path.join(__dirname, 'static'))

const usersPath = path.join(__dirname, 'data', 'users.json');


app.get('/registration', ((req, res) => {
    res.render('registration');
}))

app.post('/registration', ((req, res) => {

    fs.readFile(usersPath, (err, data) => {
        if (err) {
            console.log(err);
            return
        }
        let users = JSON.parse(data.toString());

        let registerStatus = users.find(user => {
            return user.email === req.body.email;
        });

        console.log(!registerStatus);
        if (!registerStatus) {

            const array = [];
            users.map((user) => {
                array.push(user);
            })
            array.push(req.body);
            const newArray = JSON.stringify(array);

            fs.writeFile(usersPath, newArray, err1 => {
                if (err) {
                    console.log(err);
                    return
                }
            })
            res.redirect('/users');

        } else {
            res.redirect('/error');
        }
    })

}))

app.get('/users', ((req, res) => {
    fs.readFile(usersPath, (err, data) => {
        if (err) {
            console.log(err);
            return
        }
        let users = JSON.parse(data.toString());
        res.render('users', {users: users});
    })
}))


app.get('/login', (req, res) => {
    res.render('login')
})

app.post('/login', ((req, res) => {

    fs.readFile(usersPath, (err, data) => {
        if (err) {
            console.log(err);
            return
        }
        let users = JSON.parse(data.toString());
        let userIndex = users.findIndex(user => {
            return (user.email === req.body.email & user.password === req.body.password)
        });
        if (userIndex >= 0) {
            res.redirect(`/users/${userIndex}`);
        } else {
            res.redirect('/error');
        }
    })

}))

app.get('/users/:userId', (req, res) => {

    const {userId} = req.params;
    fs.readFile(usersPath, (err, data) => {
        if (err) {
            console.log(err);
            return
        }
        const users = JSON.parse(data.toString());
        res.render('user', {user: users[userId]});

    })

})


app.get('/error', ((req, res) => {
    res.render('error');
}))


app.listen(5000, () => {
    console.log('App listen 5000')
});


