import test from "tape";
import calcSWIncrements from "./libs/1.js";

const input = [
	199,
	200,
	208,
	210,
	200,
	207,
	240,
	269,
	260,
	263
];

const output = 7;

test("zero test", function (t) {
	const calcIncrements = calcSWIncrements(1);

	t.plan(1);
	t.equal(0, calcIncrements([]));
});


test("one element test", function (t) {
	const calcIncrements = calcSWIncrements(1);

	t.plan(1);
	t.equal(0, calcIncrements([3]));
});

test("basic test", function (t) {
	const calcIncrements = calcSWIncrements(1);

	t.plan(1);
	t.equal(1, calcIncrements([1, 2]));
});

test("decrement test", function (t) {
	const calcIncrements = calcSWIncrements(1);

	t.plan(1);
	t.equal(0, calcIncrements([4, 2]));
});

test("another test", function (t) {
	const calcIncrements = calcSWIncrements(1);

	t.plan(1);
	t.equal(calcIncrements([2, 4, 3, 5]), 2);
});

test("final test", function (t) {
	const calcIncrements = calcSWIncrements(1);

	t.plan(1);
	t.equal(output, calcIncrements(input));
});

test("sliding window zero", function (t) {
	t.plan(4);
	const calcIncrements = calcSWIncrements(3);
	t.equal(calcIncrements([]), 0);
	t.equal(calcIncrements([1]), 0);
	t.equal(calcIncrements([1, 1]), 0);
	t.equal(calcIncrements([1, 1, 1]), 0);

});

test("two windows", function (t) {
	const calcIncrements = calcSWIncrements(3);

	t.plan(1);
	t.equal(calcIncrements([1, 1, 1, 2]), 1);
});

test("two windows dec", function (t) {
	const calcIncrements = calcSWIncrements(3);

	t.plan(1);
	t.equal(calcIncrements([5, 1, 1, 2]), 0);
});

test("final windows test", function (t) {
	const calcIncrements = calcSWIncrements(3);

	t.plan(1);
	t.equal(calcIncrements(input), 5);
});
