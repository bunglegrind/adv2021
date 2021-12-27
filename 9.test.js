import test from "tape";
import lib9 from "./libs/9.js";

const input = `2199943210
3987894921
9856789892
8767896789
9899965678`;

const output = 15;

test("find a single min", function (t) {
	t.plan(2);
	const min = lib9.findMin(
`865
734
865`
	);
	t.equal(min.length, 1);
	t.equal(min[0], 3);
});

test("find a double min", function (t) {
	t.plan(2);
	const min = lib9.findMin(
`465
734
865`
);
	t.equal(min.length, 2);
	t.deepEqual(min.sort(), [3, 4]);
});
test("first part", function (t) {
	t.plan(1);
	const min = lib9.findMin(input);
	t.equal(min.reduce((acc, x) => acc + x + 1 , 0), output);
});
test("second part", function (t) {
	t.plan(2);
	const basins = lib9.findBasins(input);
	console.log(basins);
	t.equal(basins.length, 4);
	const basinSizes = basins.map((b) => b.length);
	basinSizes.sort((a, b) => b - a);
	t.equal(basinSizes[0] * basinSizes[1] * basinSizes[2], 1134); 
});
