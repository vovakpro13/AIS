const fs = require('fs');
const readline = require('readline');

const countVertical = require("./helpers/countVertical");
const countHorizontal = require("./helpers/countHorizontal");
const countDiagonals = require("./helpers/countDiagonals");

const { KEYS_LETTERS } = require('./constants/keys-letters');
const hasBottomLine = require("./helpers/hasBottomLine");

console.log('Доступні букви: B, D, F, H, J, L, N, P, R, T ')
console.log('');

const prompt = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});


const handleGetLetter = (letter) => {
    try {
        if (letter in KEYS_LETTERS){
            checkLetter(letter);
        } else {
            throw new Error('Даної букви немає.');
        }
    } catch (error) {
        console.log(error.toString());
    } finally {
        prompt.close();
    }
}

prompt.question(`Введіть букву, яку потрібно перевірити: \n`, handleGetLetter);


async function checkLetter(letter) {
    const originKey = KEYS_LETTERS[letter];

    const letterCodeArray = await readLetterFile(letter);

    const verticals = countVertical(letterCodeArray);
    const horizontals = countHorizontal(letterCodeArray);
    const diagonals = countDiagonals(letterCodeArray);
    const bottomLine = hasBottomLine(letterCodeArray);

    const receivedKey = Number(
        verticals.toString() + horizontals.toString() + diagonals.toString() + bottomLine.toString()
    );

    if (originKey === receivedKey) {
        console.log("Ключ співпав! " + receivedKey);
    } else {
        console.log("Шось не так :(");
    }
}

async function readLetterFile(letter) {
    const symbols = [];

    const lineReader = readline.createInterface({
        input: fs.createReadStream(`./letter-tables/${letter}.txt`)
    });

    for await (const line of lineReader){
        symbols.push(line.split(''));
    }

    return symbols;
}
