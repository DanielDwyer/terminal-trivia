'use strict'

const questionPrompt = (dynamicGameData, InterfaceInstance) => {

  return new Promise((resolve, reject) => {

    InterfaceInstance.question('\nWhat Category? (Please use the number to chose, not the name)\n$ ', (category) => {

      if((Number(category).toString()) == 'NaN' || Number(category) > 6){
        questionPrompt(dynamicGameData, InterfaceInstance)
      }

      InterfaceInstance.question('\nFor Which Value?\n$ ', (value) => {

        if(value == 200){
          var clueArrIndex = 0
        }else if(value == 400){
          var clueArrIndex = 1
        }else if(value == 600){
          var clueArrIndex = 2
        }else if(value == 800){
          var clueArrIndex = 3
        }else if(value == 1000){
          var clueArrIndex = 4
        }else{
          questionPrompt(dynamicGameData, InterfaceInstance)
        }

        resolve({category: category, clueArrIndex: clueArrIndex})

      })
    })
  })

}

module.exports = {
  questionPrompt:questionPrompt
}
