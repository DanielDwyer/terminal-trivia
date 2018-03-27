'use strict'

const questionPrompt = (dynamicGameData, InterfaceInstance) => {

  return new Promise((resolve, reject) => {

    InterfaceInstance.question('\nWhat Category? (Please use the number to chose, not the name)\n$ ', (category) => {

      if((Number(category).toString()) == 'NaN' || Number(category) > 6){
        console.log("Please only answer using the number, 1, 2, 3...");
        // resolve({boot: true})
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
            // resolve({boot: true})
          }



        })
      }

    })
  })

}

module.exports = {
  questionPrompt:questionPrompt
}
