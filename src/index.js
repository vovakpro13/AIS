const fs = require('fs');
const readline = require('readline');
const colors = require('colors');

const {KEYS_LETTERS} = require('./constants/keys-letters');
const IndicatorTranslator = require("./IndicatorTranslator");

const NAMES = ['вертикалей', 'горизонталей', 'діагоналей', 'нижніх ліній'];


async function main() {
    const distortedLetterTable = await readLetterFile("B_distorted");

    console.log('Таблиця спотвореної B: \n');
    distortedLetterTable.map(row => console.log(row.map(i => i === "1" ? i.underline.red : i.gray).toString()));

    const translator = new IndicatorTranslator(distortedLetterTable);
    const distortedCounts = translator.transformTableToKey();

    const analytic = Object.entries(KEYS_LETTERS).map(([letter, key]) => {
        const letterCounts = key.toString().split('').map(i => Number(i));

        const analytic = getAnalytic(distortedCounts, letterCounts)
        return { letter, ...analytic };
    })

    analytic.sort((a, b) => a.sum - b.sum);

    console.log("\nРезультат (починаючи з релевантніших): \n");

    analytic.map(({ letter, differences, sum }, index) => {
        const string = `${index + 1}. '` + letter + `' (min ∑ = ${ sum }) :`;

        console.log(printWithColor(string , index));
        console.log(mapRatedStrings(differences));
    });
}

const printWithColor = (str, index) => ([str.bold.green, str.bold.cyan, str.bold.yellow])[index] || str.italic.grey;

const getAnalytic = (distorted, normal) => distorted.reduce((acc, cur, index) => {
    const difference = cur - normal[index];

    acc.sum += Math.abs(difference);
    acc.differences[index] = difference;

    return acc;
}, { sum: 0, differences: [0, 0, 0, 0] });


const mapRatedStrings = (differences) => differences.map((count, index) => {
    if (count < 0) {
        return `\t⛔ Не вистачає ${NAMES[index]}: ${Math.abs(count)} \n`
    }

    if (count > 0) {
        return `\t⛔ Кількість лишніх ${NAMES[index]}: ${Math.abs(count)}\n`
    }

    return `\t✅ Рівна кількість ${NAMES[index]}\n`
}).join(' ')



async function readLetterFile(name) {
    const symbols = [];

    const lineReader = readline.createInterface({
        input: fs.createReadStream(`./letter-tables/${name}.txt`)
    });

    for await (const line of lineReader) {
        symbols.push(line.split(''));
    }

    return symbols;
}

main();
