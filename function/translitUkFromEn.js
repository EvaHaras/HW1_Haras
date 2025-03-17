
const letterUkr = {
    'ґ': { 'bigLetter': 'G', 'smallLetter': 'g' },
    'й': { 'bigLetter': 'Y', 'smallLetter': 'i' },
    'ц': { 'bigLetter': 'Ts', 'smallLetter': 'ts' },
    'у': { 'bigLetter': 'U', 'smallLetter': 'u' },
    'к': { 'bigLetter': 'K', 'smallLetter': 'k' },
    'е': { 'bigLetter': 'E', 'smallLetter': 'e' },
    'н': { 'bigLetter': 'N', 'smallLetter': 'n' },
    'г': { 'bigLetter': 'H', 'smallLetter': 'h' },
    'ш': { 'bigLetter': 'Sh', 'smallLetter': 'sh' },
    'щ': { 'bigLetter': 'Shch', 'smallLetter': 'shch' },
    'з': { 'bigLetter': 'Z', 'smallLetter': 'z' },
    'х': { 'bigLetter': 'Kh', 'smallLetter': 'kh' },
    'ї': { 'bigLetter': 'Yi', 'smallLetter': 'i' },
    'ф': { 'bigLetter': 'F', 'smallLetter': 'f' },
    'і': { 'bigLetter': 'I', 'smallLetter': 'i' },
    'в': { 'bigLetter': 'V', 'smallLetter': 'v' },
    'а': { 'bigLetter': 'A', 'smallLetter': 'a' },
    'п': { 'bigLetter': 'P', 'smallLetter': 'p' },
    'р': { 'bigLetter': 'R', 'smallLetter': 'r' },
    'о': { 'bigLetter': 'O', 'smallLetter': 'o' },
    'л': { 'bigLetter': 'L', 'smallLetter': 'l' },
    'д': { 'bigLetter': 'D', 'smallLetter': 'd' },
    'ж': { 'bigLetter': 'Zh', 'smallLetter': 'zh' },
    'є': { 'bigLetter': 'Ye', 'smallLetter': 'ie' },
    'я': { 'bigLetter': 'Ya', 'smallLetter': 'ia' },
    'ч': { 'bigLetter': 'Ch', 'smallLetter': 'ch' },
    'с': { 'bigLetter': 'S', 'smallLetter': 's' },
    'м': { 'bigLetter': 'M', 'smallLetter': 'm' },
    'и': { 'bigLetter': 'Y', 'smallLetter': 'y' },
    'т': { 'bigLetter': 'T', 'smallLetter': 't' },
    'ь': { 'bigLetter': '', 'smallLetter': '' },
    'б': { 'bigLetter': 'B', 'smallLetter': 'b' },
    'ю': { 'bigLetter': 'Yu', 'smallLetter': 'iu' },
    'ʼ': { 'bigLetter': '', 'smallLetter': '' }
}

const translitUkFromEn = (word) => {
    if (word === undefined || word === null || typeof (word) === 'object') {
        return 'Дані не можуть бути null чи undefined та мають бути строкою'
    } else {
        let answer = ''

        for (let i = 0; i < word.length; i++) {
            let value = word[i].toLowerCase()
            let letter = value
            let result = letterUkr[letter]
            if (typeof (result) === 'undefined') {
                answer += letter
            } else {
                if (word[i] === letter.toUpperCase()) {
                    answer += letterUkr[letter].bigLetter
                } else {
                    answer += letterUkr[letter].smallLetter
                }
            }

        }
        return answer
    }
}



module.exports = { translitUkFromEn }

