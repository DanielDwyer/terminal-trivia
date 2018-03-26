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
var questionInput = require('../src/questionInput')

const InterfaceInstance = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const boot = () => {

  console.log("\n\n-------------------");
  console.log("| Let's Play..... |");
  console.log("| Jeopardy        |");
  console.log("-------------------");

  InterfaceInstance.question('\n\nPlease Type:\n\n1 for Jeopardy\n2 for How To Play\n3 to Meet the Developer\n\nType 1, 2, or 3 \n$ ', (option) => {

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

            //Seperate this process -> make it repeatable
            gameBoard.gameBoard(gameDataObj)
              .then(function(dynamicGameData){
                // console.log("dynamicGameData:",util.inspect(dynamicGameData, {showHidden: false, depth: null, color: true}))
                /*
                    dynamicGameData = {
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

                questionInput.questionPrompt(dynamicGameData, InterfaceInstance)
                  .then(function(userInput){
                    console.log("userInput",userInput);
                    //Verify that question has not been answered already (used = true)

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

          })
          .catch(function(error){

          })

        })
        .catch(function(error){

        })



    }else if(option === '2'){
      console.log("Rules <Coming Soon>");
      boot()
    }else if(option === '3'){
      console.log("Meet Daniel <Coming Soon>");
      boot()
    }else{
      boot()
    }

  })
}

exports.boot = boot
