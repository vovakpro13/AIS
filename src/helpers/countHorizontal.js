const countOfTrue = require("./countOfTrue");
const isLineActive = require("./isLineActive");

function countHorizontal(array) {
    const horizontals = [0, 4, 8];

    const result = horizontals.map((row) => isLineActive(array[row]));

    return countOfTrue(result);
}

module.exports = countHorizontal
