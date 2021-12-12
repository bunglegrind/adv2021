import test from "tape";
import lib6 from "./libs/6.js";

const input = "3,4,3,1,2";
const output = {day: 80, fishes: 5934}


test("init", function (t) {
	t.plan(1);
	t.equal(lib6.school(input).size(), 5);
});

test("one day passed", function (t) {
	t.plan(1);
	const aSchool = lib6.school(input);
	aSchool.pass(1);
	t.equal(aSchool.size(), 5);
});

test("80 day passed", function (t) {
	t.plan(1);
	const aSchool = lib6.school(input);
	aSchool.pass(80);
	t.equal(aSchool.size(), output.fishes);
});

test("256 day passed", function (t) {
	t.plan(1);
	const aSchool = lib6.school(input);
	aSchool.pass(256);
	t.equal(aSchool.size(), 26984457539);
});
