'use strict'

var request = require('request')

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

    request('http://jservice.io/api/category?id='+categoryID, function(e,r,b){

      resolve(b);
      reject(e);

    })

  });

}

exports.questionStore = questionStore
