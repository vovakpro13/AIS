const isLineActive = require("./isLineActive");

const hasBottomLine = (array) => Number(isLineActive(array[8]));

module.exports = hasBottomLine;
