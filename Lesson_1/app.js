//HomeWork #1

// const fs = require('fs');
// const path = require('path');
//
// const dirname = path.join(__dirname, '/dir');
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
//             fs.readdir(path.join(dirname, `${fileName}`), (err, files1) => {
//                 if (err) {
//                     console.log(err);
//                     return;
//                 }
//                 console.log(files1);
//
//                 files1.forEach(file1Name => {
//                     let filePath = path.join(dirname, `${fileName}`, `${file1Name}`);
//                     fs.readFile(filePath, (err, data) => {
//                         if (err) {
//                             console.log(err);
//                             return;
//                         }
//                         const jsonData = JSON.parse(data.toString());
//                         const malePath = path.join(dirname, '1800');
//                         const femalePath = path.join(dirname, '2000');
//
//                         if (jsonData.gender === 'male') {
//
//                             fs.rename(filePath, path.join(malePath, `${file1Name}`), err => {
//                                 if (err) {
//                                     console.log(err);
//                                     return;
//                                 }
//                             })
//
//                         } else if (jsonData.gender === 'female') {
//
//                             fs.rename(filePath, path.join(femalePath, `${file1Name}`), err => {
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
// const path = require('path');
//
// const link = path.join(__dirname, 'recursiontask');
// const sort = path.join(__dirname, 'sorted');
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
//             fs.stat(path.join(directoryPath, `${fileName}`), (err1, stats) => {
//                 if (err) {
//                     console.log(err);
//                 }
//
//                 if (stats.isDirectory()) {
//                     console.log(true)
//                     sorting(path.join(directoryPath, `${fileName}`));
//                 } else {
//                     fs.rename(path.join(directoryPath, `${fileName}`), path.join(sort, `${fileName}`), err => {
//                         if (err) {
//                             console.log(err);
//                         }
//                     })
//                 }
//
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




