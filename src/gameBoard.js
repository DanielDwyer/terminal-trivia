'use strict'


const gameBoard = (gameData) => {

  return new Promise((resolve, reject) => {

    var counter = 1;
    console.log(" ------------------------------------------------------------------------------------");
    console.log("| Categories                                                                   Values|");

    for (var keysA in gameData) {

      gameData[keysA].localID = counter;

      var row200 = '   '
      if (gameData[keysA].clues[0].used === undefined) {
        row200 = 200
      }
      var row400 = '   '
      if (gameData[keysA].clues[1].used === undefined) {
        row400 = 400
      }
      var row600 = '   '
      if (gameData[keysA].clues[2].used === undefined) {
        row600 = 600
      }
      var row800 = '   '
      if (gameData[keysA].clues[3].used === undefined) {
        row800 = 800
      }
      var row1000 = '    '
      if (gameData[keysA].clues[4].used === undefined) {
        row1000 = 1000
      }

      var i = 0;
      var whitespace = '';
      for (i; i < (40 - keysA.length); i++) {
        whitespace = whitespace + ' '
      }

      console.log(" ------------------------------------------------------------------------------------");
      console.log("|   " + counter + ". " + keysA + " " + whitespace + "|  " + row200 + "  |  " + row400 + "  | " + row600 + "  |  " + row800 + "  |  " + row1000 + "  |");
      console.log(" ------------------------------------------------------------------------------------");
      counter = counter + 1;
    }

    resolve(gameData)
    reject("Error creating game board.")
  })

}

module.exports = {
  gameBoard: gameBoard
}
