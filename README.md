Creating transliteration and converting keyboard layouts.
This project is a set of two functions that are designed to facilitate work with keyboard switching, as well as to create transliteration from Ukrainian to English

## Contents

1. Technologies
2. Getting Started
3. Contributing
4. FAQ
5. Project Team

## Technologies

The package was written using only JavaScript

## Getting Started

To start working with the package, you need to install it. This can be done using the command

```bash
npm i hw1_haras
```

After which you need to import the necessary functions into the project. This can be done like this:

```bash
const {translitUkFromEn, replaceEnToUkOrUkToEn} = require('hw1_haras')
```

There are only two functions:
1. The first translitUkFromEn() is designed to create a translation from Ukrainian to English. Takes a string as parameters that will be transliterated

It works like this:

```bash
const {translitUkFromEn} = require('hw1_haras')

const test = translitUkFromEn('Єва')

console.log({test})

```

The result will be:
Console output
{test: 'Yeva'}

If the data in the parameters is incorrect, the function will return - 'Dani cannot be null or undefined and must be a string'

2. The second function - replaceEnToUkOrUkToEn() - this function converts the entered text with the wrong layout into understandable text, for example, instead of "рудщ" it will return "Hello"
It takes parameters word - a string, this is the value that needs to be converted, typeWordObject - this is a string that indicates what we convert Ukrainian layout to English or vice versa. Accepts two response options - "enToUk" if you need to convert English layout to Ukrainian, the second option is ukToEn if you need to convert Ukrainian layout to English

## Contributing

All wishes on how and what to fix can be written to me in telegram :)

## FAQ

Why did you develop this project?

The project was developed because I am not the first time faced with the need for transletation.

## Project team

front-end developer Yeva

git: https://github.com/EvaHaras/HW1_Haras