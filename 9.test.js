import test from "tape";
import lib9 from "./libs/9.js";

const input = [`2199943210
3987894921
9856789892
8767896789
9899965678`];

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
	t.deepEqual(min, [3, 4]);
});
