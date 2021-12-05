import test from "tape";
import Lib from "./libs/3.js";

const {calcLifeSupport, calcPower, getOxigenRating, getCO2Rating} = Lib;

const input = [
	"00100",
	"11110",
	"10110",
	"10111",
	"10101",
	"01111",
	"00111",
	"11100",
	"10000",
	"11001",
	"00010",
	"01010"
];

const output = 198;
const output2 = 230;

test("test only one value", function (t) {
	t.plan(2);
	t.equal(calcPower(["0"]), 0);
	t.equal(calcPower(["1"]), 0);
});

test("test one two-letter string", function (t) {
	t.plan(1);
	t.equal(calcPower(["01"]), 2);
});

test("test two two-letter strings", function (t) {
	t.plan(1);
	t.equal(calcPower(["011", "100", "010"]), 10);
});

test("test large mode", function (t) {
	t.plan(1);
	t.equal(calcPower([
		"00100",
		"11110",
		"10110",
		"10111",
		"10101",
		"11111",
		"10111",
		"11100",
		"10000",
		"11001",
		"10010",
		"11010"
	]), output);
});
test("test final", function (t) {
	t.plan(1);
	t.equal(calcPower(input), output);
});

test("two values input", function (t) {
	t.plan(1);
	t.equal(calcLifeSupport(["10", "01"]), 2);
});

test("select Oxigen Rating with three values", function (t) {
	t.plan(1);
	t.equal(getOxigenRating(["10", "01", "11"]), "11");
});

test("select Oxigen Rating with example", function (t) {
	t.plan(1);
	t.equal(getOxigenRating(input), "10111");
});

test("select CO2 Rating with three values", function (t) {
	t.plan(1);
	t.equal(getCO2Rating(["10", "01", "11"]), "01");
});

test("select CO2 Rating with example", function (t) {
	t.plan(1);
	t.equal(getCO2Rating(input), "01010");
});
