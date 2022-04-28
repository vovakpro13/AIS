const TableOfFeatures = require("../constants/table-of-features");
const Features = require("../constants/features");
const colors = require('colors');

const printInitialDataMatrix = () => {
    console.log('\n Матриця початкових даних:'.blue);

    console.log(` № | ${Object.keys(Features).join('\t| ')}\t | Class`);

    TableOfFeatures.map(({ Class, picture, features }) => {
        console.log(` ${picture} | ${Object.values(features).join('\t| ')}\t | ${Class}`);
    })
}

module.exports = printInitialDataMatrix;


