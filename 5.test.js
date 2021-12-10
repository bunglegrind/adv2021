import test from "tape";
import lib5 from "./libs/5.js";

const input = `0,9 -> 5,9
8,0 -> 0,8
9,4 -> 3,4
2,2 -> 2,1
7,0 -> 7,4
6,4 -> 2,0
0,9 -> 2,9
3,4 -> 1,4
0,0 -> 8,8
5,5 -> 8,2`;

const output = 5;

test("parse a segment", function (t) {
    t.plan(1);
    t.deepEqual(lib5.parse("0,9 -> 5,19"), [{x: 0, y: 9}, {x: 5, y: 19}]);
});
test("create empty grid", function (t) {
    t.plan(1);
    t.ok(lib5.grid());
});
test("fill grid with a segment", function (t) {
    t.plan(2);
    const grid = lib5.grid();
    t.ok(grid.insert(lib5.parse("0,9 -> 5,9")));
    t.notOk(grid.insert(lib5.parse("0,9 -> 5,19")));
});
test("get grid size", function (t) {
    t.plan(2);
    const grid = lib5.grid();
    t.equal(grid.x(), 1);
    t.equal(grid.y(), 1);
});
test("add segment into grid and check size", function (t) {
    t.plan(2);
    const grid = lib5.grid();
    const segment = lib5.parse("0,9 -> 5,9");
    grid.insert(segment);
    t.equal(grid.x(), 6);
    t.equal(grid.y(), 10);
});
test("get grid overlapping regions quantity", function (t) {
    t.plan(1);

    const grid = lib5.grid();
    grid.insert(lib5.parse("0,9 -> 5,9"));
    grid.insert(lib5.parse("1,9 -> 3,9"));
    t.equal(grid.overlaps(2), 3);
});
test("three segment at least 3 overlapping", function (t) {
    t.plan(1);

    const grid = lib5.grid();
    grid.insert(lib5.parse("0,9 -> 5,9"));
    grid.insert(lib5.parse("1,9 -> 3,9"));
    grid.insert(lib5.parse("3,0 -> 3,9"));
    t.equal(grid.overlaps(3), 1);
});
test("final", function (t) {
    t.plan(1);

    const grid = lib5.grid();
    input.split("\n").forEach((x) => grid.insert(lib5.parse(x)));

    t.equal(grid.overlaps(2), output);
});

test("secondPart", function (t) {
    t.plan(1);

    const grid = lib5.grid();
    input.split("\n").forEach((x) => grid.insertComplete(lib5.parse(x)));

    t.equal(grid.overlaps(2), 12);
});

