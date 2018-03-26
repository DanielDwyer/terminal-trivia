'use strict'

const exFunc = (InterfaceInstance, utc) => {
  InterfaceInstance.question('Randomly Enter 13 Digits (0 to 9)', (digits) => {
    if(digits.length !== 13){
      console.log("You missed by",(13-Number(digits)),"Try Again. Remember, randomly Enter 13 Digits (0 to 9)")
    }else{
      if(utc > digits){
        console.log("You came with in",utc - Number(digits))
        InterfaceInstance.close()
      }else{
        console.log("You came with in",Number(digits) - utc)
        InterfaceInstance.close()
      }
    }
  })
}

module.exports = {
  exFunc:exFunc
}
