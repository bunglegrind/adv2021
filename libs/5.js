import * as R from "ramda";

function parse(str) {
    const matched = str.match(/^(\d+),(\d+) -> (\d+),(\d+)$/);
    return Object.freeze([
        {
            x: Number(matched[1]),
            y: Number(matched[2])
        },
        {
            x: Number(matched[3]),
            y: Number(matched[4])
        }
    ]);
}

function type(segment) {
    return segment[0].y === segment[1].y ? "h" : "v";
}

const max = R.reduce(R.max, 0);

const getMax = R.curry((coord, segment) => max(R.pluck(coord, segment)) + 1);
const getMaxX = getMax("x");
const getMaxY = getMax("y");

function validate(segment) {
    if(
        (segment[0].x !== segment[1].x)
        && (segment[0].y !== segment[1].y)
    ) {
        return false;
    }
    return true;
}

function grid() {
    let aGrid = [[0]];

    function expand(segment) {
        while (getMaxX(segment) > x()) {
            aGrid.push(new Array(y()).fill(0));
        }
        while (getMaxY(segment) > y()) {
            aGrid.forEach((x) => x.push(0));
        }
    }

    function print() {
        console.log("---");
        R.transpose(aGrid).forEach((x) => console.log(x));
    }

    function range(n1, n2) {
        const m = Math.min(n1, n2);
        const M = Math.max(n1, n2) + 1;
        return R.range(m, M);
    }

    function insertComplete(segment) {
        expand(segment);
        if(!insert(segment)) {
            insertDiagonal(segment);
        }
    }

    function insertDiagonal(segment) {
        const opX = (segment[0].x > segment[1].x) ? R.dec : R.inc;
        const opY = (segment[0].y > segment[1].y) ? R.dec : R.inc;
        R.zip(
            R.scan(opX, segment[0].x, new Array (Math.abs(segment[1].x - segment[0].x )).fill(0)),
            R.scan(opY, segment[0].y, new Array (Math.abs(segment[1].y - segment[0].y )).fill(0))
        ).forEach(([x, y]) => aGrid[x][y] += 1);


    }

    function insert(segment) {
        if (!validate(segment)) {
            return false;
        }
        expand(segment);
        if (segment[0].x === segment[1].x) {
            range(segment[0].y, segment[1].y).forEach(
                (i) => aGrid[segment[0].x][i] += 1
            );
        } else {
            range(segment[0].x, segment[1].x).forEach(
                (i) => aGrid[i][segment[0].y] += 1
            );
        }
        return true;
    }

    function x() {
        return aGrid.length;
    }

    function y() {
        return aGrid[0].length;
    }

    function overlaps(num) {
        return R.sum(
            R.map(
                R.reduce((acc, x) => acc + Number(x >= num), 0),
                aGrid
            )
        );
    }

    return Object.freeze({insert, x, y, overlaps, insertComplete, print});
}

export default Object.freeze({parse, grid});
