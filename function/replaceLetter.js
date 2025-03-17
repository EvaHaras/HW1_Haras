const objectLetter = {
    'q':'й',
    'w':'ц',
    'e':'у',
    'r':'к',
    't':'е',
    'y':'н',
    'u':'г',
    'i':'ш',
    'o':'щ',
    'p':'з',
    '[':'х',
    ']':'ї',
    '{':'Х',
    '}':'Ї',
    'a':'ф',
    's':'і',
    'd':'в',
    'f':'а',
    'g':'п',
    'h':'р',
    'j':'о',
    'k':'л',
    'l':'д', 
    ';':'ж',
    "'":'є',
    'z':'я',
    'x':'ч',
    'c':'с',
    'v':'м',
    'b':'и',
    'n':'т',
    'm':'ь',
    ',':'б',
    '.':'ю',
}

let reverseObjectLetter = {}
Object.entries(objectLetter).forEach(([key, value]) => {
    reverseObjectLetter[value] = key
})


const replaceEnToUkOrUkToEn = ({word, typeWordObject})=>{
    if(word === undefined || word === null || typeof(word) === 'object'){
        return 'Дані не можуть бути null чи undefined та мають бути строкою'
    }else{
       if(typeWordObject !== 'enToUk' && typeWordObject !== 'ukToEn'){
        return 'Невірно вказаний формат для обʼєкту (друга змінна: typeWordObject) літер він може бути "enToUk" якщо необхідно конвертувати англійську розкладку у українську або "ukToEn" якщо треба конвертувати українську розкладку у англійську'
       }else{
        let answer = ''
        let arrayLetter = typeWordObject === 'enToUk' ? objectLetter : reverseObjectLetter;

        for(let i = 0; i < word.length; i ++){
            if(word[i] === word[i].toUpperCase()){
                let letter = word[i].toLowerCase()
                let result = arrayLetter[letter]
                if (typeof(result) === 'undefined'){
                    answer += word[i]
                }else{
                    answer += result.toUpperCase()
                }
            }else{
                let result = arrayLetter[word[i]]
                if (typeof(result) === 'undefined'){
                    answer += word[i]
                }else{
                    answer += result
                }
            }
        }
        return answer
    }
       }
}


   


module.exports = {replaceEnToUkOrUkToEn}