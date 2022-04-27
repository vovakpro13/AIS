const countOfTrue = require("./countOfTrue");
const isLineActive = require("./isLineActive");

const getVertLine = (verticals, side) => {
    return isLineActive(verticals.map((verts) => verts[side]));
}

function countVertical(array) {
    // 0 - left verticals, 4 - right verticals
    const topVerticals = array.slice(0, 5);
    const bottomVerticals = array.slice(5, 8);

    const topLeft = getVertLine(topVerticals, 0);
    const topRight = getVertLine(topVerticals, 4);
    const bottomLeft = getVertLine(bottomVerticals, 0);
    const bottomRight = getVertLine(bottomVerticals, 4);

    return countOfTrue([topLeft, topRight, bottomLeft, bottomRight]);
}

module.exports = countVertical;
