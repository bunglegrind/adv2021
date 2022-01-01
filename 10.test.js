import test from "tape";
import lib10 from "./libs/10.js";

const input =
`[({(<(())[]>[[{[]{<()<>>
[(()[<>])]({[<{<<[]>>(
{([(<{}[<>[]}>{[]{[(<()>
(((({<>}<{<{<>}{[]{[]{}
[[<[([]))<([[{}[[()]]]
[{[{({}]{}}([{[{{{}}([]
{<[[]]>}<{[{[{[]{()[[[]
[<(<(<(<{}))><([]([]()
<{([([[(<>()){}]>(<<{{
<{([{{}}[<[[[<>{}]]]>[]]`;

const output = 26397;

test("check a corrupted row", function (t) {
	t.plan(1);
	t.ok(lib10.isCorrupted("[(<}>)]"));
});

test("first part", function (t) {
	t.plan(1);
	t.equal(lib10.overallPenalty(input), output);
});

test("second part", function (t) {
	t.plan(1);
	t.equal(lib10.repairScore(input), 288957);
});
