function decoder(str){

    let solution = ""
    for (let i = 0; i < str.length; i++){
        let strValue = str[i].charCodeAt()
        if (strValue >= 65 && strValue <= 77) {
            solution += String.fromCharCode(strValue + 13)
        } else if (strValue>= 78 && strValue<= 90){
            solution += String.fromCharCode(strValue - 13)
        } else {
            solution += str[i]
        }
    }

    //get only first letter to be capitalized
    const upperCaseFirstLetter = str =>
    `${str.slice(0, 1).toUpperCase()}${str.slice(1)}`;
   
   const lowerCaseAllWordsExceptFirstLetters = string =>
    string.replaceAll(/\S*/g, strValue =>
     `${strValue.slice(0).toLowerCase()}`
    );
   
    solution = upperCaseFirstLetter(lowerCaseAllWordsExceptFirstLetters(str));
    return solution
}

console.log(decoder("I LOVE CRYPTOGRAPHY!"))
console.log(decoder("V YBIR PELCGBTENCUL!")) 

