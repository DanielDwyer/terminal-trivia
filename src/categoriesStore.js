'use strict'

//NOTE Determine when to reset offset, it will break without a reset
//NOTE Write a fs check to see ig categoryOffset.text is present in directory, if not create it

var request = require('request')
const fs = require('fs')
const path = require('path')

const categories = 6;
var offsetBy = Math.floor(Math.random() * 18000);

const categoriesStore = new Promise((resolve, reject) => {

  // fs.readFile(path.basename(__dirname) + '/categoryOffset.text', 'utf8', (err, offset) => {
  //   if (err) {
  //     reject(err);
  //   } else {
  //     fs.unlink(path.basename(__dirname) + '/categoryOffset.text', (err, success) => {
  //       if (err) {
  //         reject(err);
  //       } else {
          request('http://jservice.io/api/categories?count=' + categories + '&offset=' + offsetBy, function(err, r, b) {
            if (err) {
              reject(err);
            } else {
              resolve(b);
              // var replaceOffsetWith = Number(offset) + Number(categories)
              // fs.writeFile(path.basename(__dirname) + '/categoryOffset.text', replaceOffsetWith, (err) => {
              //   if (err) {
              //     reject(err);
              //   } else {
              //     resolve(b);
              //   }
              // });
            }
          })
//         }
//       });
//     }
//
//   });
//
});

// const categoriesStore = new Promise((resolve, reject) => {
//
//   fs.readFile(path.basename(__dirname) + '/categoryOffset.text', 'utf8', (err, offset) => {
//     if (err) {
//       reject(err);
//     } else {
//       fs.unlink(path.basename(__dirname) + '/categoryOffset.text', (err, success) => {
//         if (err) {
//           reject(err);
//         } else {
//           request('http://jservice.io/api/categories?count=' + categories + '&offset=' + offset, function(err, r, b) {
//             if (err) {
//               reject(err);
//             } else {
//               var replaceOffsetWith = Number(offset) + Number(categories)
//               fs.writeFile(path.basename(__dirname) + '/categoryOffset.text', replaceOffsetWith, (err) => {
//                 if (err) {
//                   reject(err);
//                 } else {
//                   resolve(b);
//                 }
//               });
//             }
//           })
//         }
//       });
//     }
//
//   });
//
// });

exports.categoriesStore = categoriesStore
