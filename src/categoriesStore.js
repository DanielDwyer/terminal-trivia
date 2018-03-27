'use strict'

const path = require('path')
const http = require('http');

const categories = 6;
var offsetBy = Math.floor(Math.random() * 18000);

const categoriesStore = new Promise((resolve, reject) => {

  http.get('http://jservice.io/api/categories?count=' + categories + '&offset=' + offsetBy, res => {
    res.setEncoding("utf8");
    let body = "";
    res.on("data", data => {
      body += data;
    });
    res.on("end", () => {
      resolve(body);
    });
  });

});


exports.categoriesStore = categoriesStore
