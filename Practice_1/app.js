const fs = require('fs');
const path = require('path');
const users = [{name: 'olya', gender: 'female', age: 18},
    {name: 'Taras', gender: 'male', age: 25},
    {name: 'Oleg', gender: 'male', age: 15},
    {name: 'Oksana', gender: 'female', age: 35},
    {name: 'Olga', gender: 'female', age: 22},
    {name: 'Vova', gender: 'male', age: 35},
    {name: 'Jora', gender: 'male', age: 18},
];


function sortUsers(userArray) {

    userArray.forEach(user => {

            if (user.gender === 'male' & user.age > 20) {
                fs.writeFile(path.join(__dirname, 'manOlder20', `${user.name}.txt`), JSON.stringify(user), err => {
                    if (err) {
                        console.log(err);
                        return
                    }
                })
            } else if (user.gender === 'male' & user.age < 20) {
                fs.writeFile(path.join(__dirname, 'manYounger20', `${user.name}.txt`), JSON.stringify(user), err => {
                    if (err) {
                        console.log(err);
                        return
                    }
                })
            } else if (user.gender === 'female' & user.age < 20) {
                fs.writeFile(path.join(__dirname, 'womanYounger20', `${user.name}.txt`), JSON.stringify(user), err => {
                    if (err) {
                        console.log(err);
                        return
                    }
                })
            } else {
                fs.writeFile(path.join(__dirname, 'womanOlder20', `${user.name}.txt`), JSON.stringify(user), err => {
                    if (err) {
                        console.log(err);
                        return
                    }
                })
            }


        }
    )

}


sortUsers(users);

