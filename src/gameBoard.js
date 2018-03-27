'use strict'


const gameBoard = (gameData, II) => {

  return new Promise((resolve, reject) => {
    if(gameData.hasOwnProperty('score')){
      var score = gameData.score;
    }else{
      var score = 0;
    }
    var counter = 1;
    console.log("\n ----------------------------------------------------------------------------------------");
    console.log("| Categories                                                                     Values |");
    console.log(" ----------------------------------------------------------------------------------------");
    console.log("| Score: "+score+"                                                                              |");

    var noMoreQuestions = 1;
    for (var keysA in gameData) {

      if(keysA !== 'score'){

        gameData[keysA].localID = counter;

        var row200 = '   '
        if (gameData[keysA].clues[0].used === undefined) {
          row200 = 200
          noMoreQuestions = 0
        }
        var row400 = '   '
        if (gameData[keysA].clues[1].used === undefined) {
          row400 = 400
          noMoreQuestions = 0
        }
        var row600 = '   '
        if (gameData[keysA].clues[2].used === undefined) {
          row600 = 600
          noMoreQuestions = 0
        }
        var row800 = '   '
        if (gameData[keysA].clues[3].used === undefined) {
          row800 = 800
          noMoreQuestions = 0
        }
        var row1000 = '    '
        if (gameData[keysA].clues[4].used === undefined) {
          row1000 = 1000
          noMoreQuestions = 0
        }

          var i = 0;
          var whitespace = '';
          for (i; i < (40 - keysA.length); i++) {
            whitespace = whitespace + ' '
          }


          var rowData = "|   " + counter + ". " + keysA + " " + whitespace + "|  " + row200 + "  |  " + row400 + "  | " + row600 + "  |  " + row800 + "  |  " + row1000 + "  |";

          var dashLine = ''
          for(var ii = 0; ii < rowData.length; ii++){
            dashLine += '-';
          }

          console.log(dashLine);
          console.log(rowData);
          console.log(dashLine);
          counter = counter + 1;

        if(noMoreQuestions){
          console.log("No More Questions. Record and present high scores, get user info for high score");
          console.log("Great Job! You scored:",score);
          // II.question('\nTo Save Your Score: Enter Your Email:$ ', (email) => {
          //
          // })
        }

      }

    }

    resolve(gameData)
    reject("Error creating game board.")
  })

}

module.exports = {
  gameBoard: gameBoard
}
