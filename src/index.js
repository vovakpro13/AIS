const TableOfFeatures = require("./constants/table-of-features");
const printInitialDataMatrix = require("./helpers/printInitialDataMatrix");
const Features = require("./constants/features");
const printFeaturesForces = require("./helpers/printFeaturesForces");
const readline = require('readline');

console.log("Ознаки:")
console.log(Object.keys(Features).map(key => `${key} - ${Features[key]}`).join('\n'))

printInitialDataMatrix();


const getFeaturesForces = (classes) => {
    const Classes1 = classes.filter(({Class}) => Class === 1);
    const Classes2 = classes.filter(({Class}) => Class === 2);

    const result = Object.keys(Features).reduce((acc, featureKey,) => {
            const classes1 = Classes1.reduce((acc, {features}) => {
                if (features[featureKey] === 1) acc += features[featureKey];
                return acc
            }, 0);

            const classes2 = Classes2.reduce((acc, {features}) => {
                if (features[featureKey] === 1) acc += features[featureKey];
                return acc
            }, 0);

            acc[featureKey] = {classes1, classes2};

            return acc;
        }, {}
    )

    return {result, Classes1: Classes1, Classes2: Classes2}
}

const forces = getFeaturesForces(TableOfFeatures);

printFeaturesForces(forces);


const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('Малюнок Має хоча б 1 квадрат ? ', function (answer) {
    if (answer === "1") {
        return console.log("Малюнок належить до 1 класу.")
    }

    console.log("Малюнок належить до 2 класу.")
});


