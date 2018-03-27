'use strict'

var http = require('http')

const questionStore = ( categories ) => {

  return new Promise((resolve, reject) => {

    var gameQuestions = {};
    var i = 0;

    for(i; i < categories.length; i++){
      questionRequest ( categories[i].id )
        .then(function(result){
          result = JSON.parse(result)
          gameQuestions[result.title] = result
          // gameQuestions[result.title].localID = i + 1
        })
        .catch(function(error){
          console.log("error getting questions with category id. error:\n",error);
          reject(error);
        })

    }
    setTimeout(function(){
      resolve(gameQuestions);
    },2000)


  });

}

const questionRequest = ( categoryID ) => {

  return new Promise((resolve, reject) => {

    http.get('http://jservice.io/api/category?id='+categoryID, res => {
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

}

exports.questionStore = questionStore
