//Test comands
// fs.writeFile(filePath, 'Hello', err => {
//     if (err){
//         console.log(err);
//     }
// });
//
//
// fs.mkdir(`${__dirname}/dir/new/secondnew`,{recursive: true}, err => {
//     if (err){
//         console.log(err);
//     }
// });
//
// fs.rmdir(`${__dirname}/dir/new`, err => {
//     if (err){
//         console.log(err);
//     }
// });
//
//
// fs.readdir(dirname, (err, files) => {
//     if (err){
//         console.log(err);
//         return;
//     }
//     console.log(files);
//
//     files.forEach(fileName =>{
//         fs.stat(dirname + `/${fileName}`, (err1, stats) => {
//             console.log(stats.isDirectory());
//             if (!stats.isDirectory(){
//                 // якшо фолс тоді роби рінейм dirname + `/${fileName}` цього файла в папкку куда треба і запускай рекурсію, якщо тру
//             })
//         })
//     })
//
// })
//
//
// fs.unlink(filePath, err => {
//     if (err){
//         console.log(err);
//     }
// })
//
//
// fs.rename(filePath, `${__dirname}/dir/test/Roman.txt`, err => {
//     if (err){
//         console.log(err);
//     }
// })


//HomeWork #1

// const fs = require('fs');
//
// const dirname = __dirname + '/dir';
//
//
// function sortStudents() {
//     fs.readdir(dirname, ((err, files) => {
//         if (err) {
//             console.log(err);
//             return;
//         }
//         console.log(files);
//
//         files.forEach(fileName => {
//             console.log(fileName);
//
//             fs.readdir(dirname + `/${fileName}`, (err, files1) => {
//                 if (err) {
//                     console.log(err);
//                     return;
//                 }
//                 console.log(files1);
//
//                 files1.forEach(file1Name => {
//                     let filePath = dirname + `/${fileName}` + `/${file1Name}`;
//                     fs.readFile(filePath, (err, data) => {
//                         if (err) {
//                             console.log(err);
//                             return;
//                         }
//                         const jsonData = JSON.parse(data.toString());
//                         const malePath = dirname + '/1800';
//                         const femalePath = dirname + '/2000';
//
//                         if (jsonData.gender === 'male') {
//
//                             fs.rename(filePath, malePath + `/${file1Name}`, err => {
//                                 if (err) {
//                                     console.log(err);
//                                     return;
//                                 }
//                             })
//
//                         } else if (jsonData.gender === 'female') {
//
//                             fs.rename(filePath, femalePath + `/${file1Name}`, err => {
//                                 if (err) {
//                                     console.log(err);
//                                     return;
//                                 }
//                             })
//
//
//                         }
//
//                     })
//                 })
//
//             })
//         })
//
//     }))
//
// }
//
// sortStudents();




// Second Homework task with *

// const fs = require('fs');
// const link = __dirname + '/recursiontask';
// const sort = __dirname + '/sorted';
//
// function sorting(directoryPath) {
//     fs.readdir(directoryPath, (err, files) => {
//         if (err) {
//             console.log(err);
//         }
//         console.log(files);
//
//         files.forEach(fileName => {
//
//             fs.stat(directoryPath + `/${fileName}`, (err1, stats) => {
//                 if (err) {
//                     console.log(err);
//                 }
//                 if (stats.isDirectory() === false) {
//                     fs.rename(directoryPath + `/${fileName}`, sort + `/${fileName}`, err => {
//                         if (err) {
//                             console.log(err);
//                         }
//                     })
//                 } else if (stats.isDirectory() === true) {
//                     console.log(true)
//                     console.log(link + `/${fileName} `)
//                     sorting(directoryPath + `/${fileName}`);
//                 } else {
//                     return
//                 }
//
//             })
//
//
//         })
//
//     })
// }
//
// sorting(link);




