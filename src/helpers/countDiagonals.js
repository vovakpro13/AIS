const countOfTrue = require("./countOfTrue");

const isDiagonalActive = (array, start, end) => {
    return array
        .slice(start, end)
        .filter((row, i) => (+row[3 - i] === 1))
        .length >= 3;
}

function countDiagonals(array) {
    const top = isDiagonalActive(array, 1, 4);
    const bottom = isDiagonalActive(array, 5, 8);

    return countOfTrue([top, bottom])
}

module.exports = countDiagonals;
