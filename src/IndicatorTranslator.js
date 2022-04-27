class IndicatorTranslator {
    table = [];

    constructor(table) {
        this.table = table;
    }

    transformTableToKey() {
        const verticals = this.countVertical();
        const horizontals = this.countHorizontal();
        const diagonals = this.countDiagonals();
        const bottomLine = this.hasBottomLine();

        // const receivedKey = Number(
        //     verticals.toString() + horizontals.toString() + diagonals.toString() + bottomLine.toString()
        // );

        return [verticals, horizontals, diagonals, bottomLine];
    }

    countVertical() {
        const getVertLine = (verticals, side) => {
            return this.isLineActive(verticals.map((verts) => verts[side]));
        }

        // 0 - left verticals, 4 - right verticals
        const topVerticals = this.table.slice(0, 5);
        const bottomVerticals = this.table.slice(5, 8);

        const topLeft = getVertLine(topVerticals, 0);
        const topRight = getVertLine(topVerticals, 4);
        const bottomLeft = getVertLine(bottomVerticals, 0);
        const bottomRight = getVertLine(bottomVerticals, 4);

        return this.countOfTrue([topLeft, topRight, bottomLeft, bottomRight]);
    }

    countHorizontal() {
        const horizontals = [0, 4, 8];

        const result = horizontals.map((row) => this.isLineActive(this.table[row]));

        return this.countOfTrue(result);
    }

    countDiagonals() {
        const isDiagonalActive = (start, end) => {
            return this.table
                .slice(start, end)
                .filter((row, i) => (+row[3 - i] === 1))
                .length >= 3;
        }

        const top = isDiagonalActive(1, 4);
        const bottom = isDiagonalActive(5, 8);

        return this.countOfTrue([top, bottom])
    }

    hasBottomLine() {
        return Number(this.isLineActive(this.table[8]));
    }

    isLineActive = (arr) => arr.filter((digit) => +digit === 1).length >= 3
    countOfTrue = (arr) => arr.filter((i) => i).length
}

module.exports = IndicatorTranslator
