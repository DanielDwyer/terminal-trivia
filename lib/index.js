/*
Main Logic Resides Here
*/
'use strict'

const readline = require('readline')
const util = require('util');

const game = require('../src/exampleModule')
var gameBoard = require('../src/gameBoard')
var categories = require('../src/categoriesStore')
var questions = require('../src/questionStore')

const InterfaceInstance = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const boot = () => {

  console.log("\n\n-------------------");
  console.log("| Let's Play..... |");
  console.log("| Terminal Trivia |");
  console.log("-----------------------------------------");
  console.log("| Developer: DanielPatrickDwyer@gmail.com |");
  console.log("| Live The Life You Love  🕺  💃  🤠  👍  🚴🏻   |");
  console.log("----------------------------------------------------------------");
  console.log("| Check out Terminews: Read The New York Times In Your Terminal |");
  console.log("| https://www.npmjs.com/package/terminews                       |");
  console.log("----------------------------------------------------------------");

  InterfaceInstance.question('\n\nType 1, 2, or 3:\n\n1 for Jeopardy\n2 for How To Play\n3 to Meet the Developer\n\nType 1, 2, or 3 \n$ ', (option) => {

    //Play Jeopardy
    if(option === '1'){

      categories.categoriesStore
        .then(function(categoriesArr){
          /*
              categoriesArr = [
                {"id":11532,"title":"let's \"ch\"at","clues_count":5},
                {"id":5412,"title":"prehistoric times","clues_count":10},
                {"id":11496,"title":"acting families","clues_count":5},
                {"id":11497,"title":"drink\"s\"","clues_count":5},
                {"id":11498,"title":"world city walk","clues_count":5},
                {"id":11499,"title":"tough-pourri","clues_count":5}
              ]

              NOTE typeof categoriesArr is a string until parsed below (where it an object/array)
          */
          categoriesArr = JSON.parse(categoriesArr)

          /*
              Use the categoriesArr which contains the id to make an API call and retrieve the questions for that category
          */

        questions.questionStore(categoriesArr)
          .then(function(gameDataObj){

            /*
                gameDataObject = {
                'that\'s just ducky':
                       { id: 11515,
                         title: 'that\'s just ducky',
                         clues_count: 5,
                         clues:[
                            {
                              id: 87727,
                              answer: 'Howard the Duck',
                              question: 'This ducky superhero of 1970s comic books was brought to the big screen by George Lucas in 1986',
                              value: 200,
                              airdate: '2009-07-21T12:00:00.000Z',
                              category_id: 11515,
                              game_id: null,
                              invalid_count: null
                            },
                            {
                              id: 87733,
                              answer: 'the Yangtze',
                              question: '"The Story About Ping" is a children\'s tale about a family of Chinese ducks who live on a boat in this river',
                              value: 400,
                              airdate: '2009-07-21T12:00:00.000Z',
                              category_id: 11515,
                              game_id: null,
                              invalid_count: null
                            },
                            {
                              id: 87739,
                              answer: 'Dr. Dolittle',
                              question: 'Dab-Dab the duck is a talkative companion of this literary doctor',
                              value: 600,
                              airdate: '2009-07-21T12:00:00.000Z',
                              category_id: 11515,
                              game_id: null,
                              invalid_count: null
                            },
                            {
                              id: 87745,
                              answer: '<i>The Wind in the Willows</i>',
                              question: '"Ducks are a dabbling" is a line of poetry included in this Kenneth Grahame work',
                              value: 800,
                              airdate: '2009-07-21T12:00:00.000Z',
                              category_id: 11515,
                              game_id: null,
                              invalid_count: null
                            },
                            {
                              id: 87751,
                              answer: '<i>The Wild Duck</i>',
                              question: 'The title of this controversial Ibsen play refers to a pet that\'s been tamed & kept in an attic',
                              value: 1000,
                              airdate: '2009-07-21T12:00:00.000Z',
                              category_id: 11515,
                              game_id: null,
                              invalid_count: null
                            }
                          ]
                  }
            */
            // console.log("gameDataObj:",util.inspect(gameDataObj, {showHidden: false, depth: null, color: true}))

            //Start Game Play
            gameplay(gameDataObj)

          })
          .catch(function(error){
            console.log("#1 Issue Retrieving Game Play Data, Let's Try Again")
            boot()
          })

        })
        .catch(function(error){
          console.log("#1 Issue Retrieving Game Play Data, Let's Try Again")
          boot()
        })

    //The Rules of Terminal-Triva
    }else if(option === '2'){
      console.log("\n\n\nRules of Terminal-Triva:");
      console.log("------------------------");
      console.log("  \n1. You DO NOT need to include the phrase 'who is', 'what is', or 'when is' (etc.) in your answer");
      console.log("  \n2. There is no deuction of points for incorrect answers");
      console.log("  \n3. Case (upper or lower) is not important");
      console.log("  \n4. Enjoy the game!");
      setTimeout(function(){
        boot()
      },5000)
    }else if(option === '3'){
      console.log("\n\n\nMeet The Developer");
      console.log("-------------------");
      console.log('http://danieldwyer.net');
      setTimeout(function(){
        boot()
      },3000)
    }else{
      boot()
    }

  })
}

const gameplay = (gdo) => {
  gameBoard.gameBoard(gdo, InterfaceInstance)
    .then(function(dynamicGameData){
      // console.log("dynamicGameData:",util.inspect(dynamicGameData, {showHidden: false, depth: null, color: true}))
      // var wishes = ['You Got This!', 'Show Me What You Got!', 'Never Give Up!', 'Next Stop, The Top!',]
      // console.log("\nYou Got This!\n");
      /*
          dynamicGameData = {f
            'best actor oscar winners': {
                    id: 11551,
                    title: 'best actor oscar winners',
                    clues_count: 5,
                    clues: [ [Object], [Object], [Object], [Object], [Object] ],
                    localID: 1
            },...}
            NOTE Access to localID or category id

            dynamicGameData['best actor oscar winners'].clues =[
              { id: 88294,
                answer: 'Barber',
                question: 'Title tonsorial job "of Seville"(6)',
                value: 200,
                airdate: '2009-06-24T12:00:00.000Z',
                category_id: 11608,
                game_id: null,
                invalid_count: null },
              { id: 88300,
                answer: '"Cinderella"',
                question: 'Fairy tale that inspired "La Cenerentola"(10)',
                value: 400,
                airdate: '2009-06-24T12:00:00.000Z',
                category_id: 11608,
                game_id: null,
                invalid_count: null },
              { id: 88306,
                answer: 'an apple',
                question: 'Prop placed on little Jimmy Tell\'s head(5)',
                value: null,
                airdate: '2009-06-24T12:00:00.000Z',
                category_id: 11608,
                game_id: null,
                invalid_count: null },
              { id: 88312,
                answer: 'Amahl',
                question: 'Menotti lad visited by Melchior(5)',
                value: 800,
                airdate: '2009-06-24T12:00:00.000Z',
                category_id: 11608,
                game_id: null,
                invalid_count: null },
              { id: 88318,
                answer: '<i>Gotterdammerung</i>',
                question: '"Twilight of the Gods", in German(15)',
                value: 1000,
                airdate: '2009-06-24T12:00:00.000Z',
                category_id: 11608,
                game_id: null,
                invalid_count: null }
              ]
      */

      // questionInput.questionPrompt(dynamicGameData, InterfaceInstance)
      new Promise((resolve, reject) => {

        InterfaceInstance.question('\nWhat Category? (Please use the number to chose, not the name)\n$ ', (category) => {

          if((Number(category).toString()) == 'NaN' || Number(category) > 6){
            console.log("Please only answer using the number, 1, 2, 3...");
            setTimeout(function(){
              gameplay(dynamicGameData)
            },1500)
          }else{
            InterfaceInstance.question('\nFor Which Value?\n$ ', (value) => {

              if(value == 200){
                var clueArrIndex = 0
                resolve({category: category, clueArrIndex: clueArrIndex})
              }else if(value == 400){
                var clueArrIndex = 1
                resolve({category: category, clueArrIndex: clueArrIndex})
              }else if(value == 600){
                var clueArrIndex = 2
                resolve({category: category, clueArrIndex: clueArrIndex})
              }else if(value == 800){
                var clueArrIndex = 3
                resolve({category: category, clueArrIndex: clueArrIndex})
              }else if(value == 1000){
                var clueArrIndex = 4
                resolve({category: category, clueArrIndex: clueArrIndex})
              }else{
                console.log("Please only answer using the value, 200, 600, 800...");
                setTimeout(function(){
                  gameplay(dynamicGameData)
                },1500)

              }

            })
          }

        })
      })
        .then(function(userInput){

          var points = 0;
          if(userInput.clueArrIndex === 0){
            points = 200;
          }else if(userInput.clueArrIndex === 1){
            points = 400;
          }else if(userInput.clueArrIndex === 2){
            points = 600;
          }else if(userInput.clueArrIndex === 3){
            points = 800;
          }else if(userInput.clueArrIndex === 4){
            points = 1000;
          }

          //Verify that question has not been answered already (used = true)
          for(var keys in dynamicGameData){

            if(dynamicGameData[keys].localID == userInput.category){
              if(dynamicGameData[keys]['clues'][userInput.clueArrIndex].used === undefined){
                dynamicGameData[keys]['clues'][userInput.clueArrIndex].used = true;
                var question = dynamicGameData[keys]['clues'][userInput.clueArrIndex].question;
                var answerCorrect = dynamicGameData[keys]['clues'][userInput.clueArrIndex].answer.toLowerCase().replace('<i>', '').replace('</i>', '');

                console.log("\nQ:",question);

                  InterfaceInstance.question('\nPlease Type Your Answer (ignore who is, what is, etc., case is not relevant) \n$ ', (answerUser) => {

                    if(similarity(answerUser, answerCorrect) > .65 || answerCorrect.indexOf(answerUser.toLowerCase()) !== -1 && answerUser.length > 4){
                      console.log("\nCORRECT");
                      console.log("\nA:",answerCorrect);

                      // console.log("dynamicGameData.hasOwnProperty('score'):",dynamicGameData.hasOwnProperty('score'));
                      if(dynamicGameData.hasOwnProperty('score')){
                        dynamicGameData['score'] = Number(dynamicGameData['score']) + points;
                        // console.log("1dynamicGameData['score']:",dynamicGameData['score']);
                        gameplay(dynamicGameData)
                      }else{
                        dynamicGameData['score'] = points;
                        // console.log("2dynamicGameData['score']:",dynamicGameData['score']);
                        gameplay(dynamicGameData)
                      }

                      // InterfaceInstance.close()
                      // gameplay(dynamicGameData)

                    }else{
                      console.log("\nINCORRECT");
                      console.log("\nA:",answerCorrect);
                      // InterfaceInstance.close()
                      gameplay(dynamicGameData)

                    }
                  })

              }else if(dynamicGameData[keys]['clues'][userInput.clueArrIndex].used){
                // console.log("Question Alrady Played");
              }else{
                // console.error("Error: No Matching Value In That Category");
              }
            }else{
              //no mathcing category
              // console.error("Error: No Matching Category");
            }
          }

          //Flag question as used

          //Show question to user. Prompt user for response

          //Match user's answer using regex, assign a threshold to succeed

          //Record score, show score

          //Pass game data and restart process



        })
        .catch(function(error){
          console.log("error:",error);
        })

    })
    .catch(function(error){

    })
}

function similarity(s1, s2) {
      var longer = s1;
      var shorter = s2;
      if (s1.length < s2.length) {
        longer = s2;
        shorter = s1;
      }
      var longerLength = longer.length;
      if (longerLength == 0) {
        return 1.0;
      }
      return (longerLength - editDistance(longer, shorter)) / parseFloat(longerLength);
    }

    function editDistance(s1, s2) {
      s1 = s1.toLowerCase();
      s2 = s2.toLowerCase();

      var costs = new Array();
      for (var i = 0; i <= s1.length; i++) {
        var lastValue = i;
        for (var j = 0; j <= s2.length; j++) {
          if (i == 0)
            costs[j] = j;
          else {
            if (j > 0) {
              var newValue = costs[j - 1];
              if (s1.charAt(i - 1) != s2.charAt(j - 1))
                newValue = Math.min(Math.min(newValue, lastValue),
                  costs[j]) + 1;
              costs[j - 1] = lastValue;
              lastValue = newValue;
            }
          }
        }
        if (i > 0)
          costs[s2.length] = lastValue;
      }
      return costs[s2.length];
    }

exports.boot = boot
