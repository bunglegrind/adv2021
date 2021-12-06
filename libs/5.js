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

function getMax(coord, segment)

function grid() {
    let aGrid = [[0]];

    function expand(segment) {
        if (getMaxX(segment) > x()) {

        }
    }

    function insert(segment) {



        if(type(segment) === "h") {

        } else {

        }
    }

    function x() {
        return aGrid.length;
    }

    function y() {
        return aGrid[0].length;
    }

    return Object.freeze({insert, x, y});
}

export default Object.freeze({parse, grid});
