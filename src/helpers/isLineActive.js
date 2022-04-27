const isLineActive = (arr) => arr.filter((digit) => +digit === 1).length >= 3

module.exports = isLineActive;
