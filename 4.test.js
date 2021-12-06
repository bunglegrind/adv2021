import test from "tape";
import lib4 from "./libs/4.js";


const input = `7,4,9,5,11,17,23,2,0,14,21,24,10,16,13,6,15,25,12,22,18,20,8,19,3,26,1

22 13 17 11  0
 8  2 23  4 24
21  9 14 16  7
 6 10  3 18  5
 1 12 20 15 19

 3 15  0  2 22
 9 18 13 17  5
19  8  7 25 23
20 11 10 24  4
14 21 16 12  6

14 21 17 24  4
10 16 15  9 19
18  8 23 26 20
22 11 13  6  5
 2  0 12  3  7`;

const output = 4512;

test("parse empty file", function (t) {
	const {boards, extractions} = lib4.parse("");

	t.plan(4);
	t.ok(Array.isArray(boards));
	t.equal(boards.length, 0);
	t.ok(Array.isArray(extractions));
	t.equal(extractions.length, 0);
});

test("parse single extraction", function (t) {
	const {boards, extractions} = lib4.parse("1");

	t.plan(5);
	t.ok(Array.isArray(boards));
	t.equal(boards.length, 0);
	t.ok(Array.isArray(extractions));
	t.equal(extractions.length, 1);
	t.equal(extractions[0], 1);
});


test("parse three extractions", function (t) {
	const {boards, extractions} = lib4.parse("5,34,78");

	t.plan(7);
	t.ok(Array.isArray(boards));
	t.equal(boards.length, 0);
	t.ok(Array.isArray(extractions));
	t.equal(extractions.length, 3);
	t.equal(extractions[0], 5);
	t.equal(extractions[1], 34);
	t.equal(extractions[2], 78);
});

test("throw exception when parsing extractions", function (t) {
	t.plan(2);
	t.throws(() => lib4.parse("5,34,78,a"), Error);
	t.throws(() => lib4.parse("5,34,78,128"), Error);
});

test("parse extractions and a board", function (t) {
	const {boards, extractions} = lib4.parse(
		`3,4,55,1,3,54,64,65,7

22 13 17 11  0
 8  2 23  4 24
21  9 14 16  7
 6 10  3 18  5
 1 12 20 15 19`
	);

	t.plan(6);
	t.ok(Array.isArray(boards));
	t.equal(boards.length, 1);
	t.equal(boards[0].get(0,1), 13);
	t.ok(Array.isArray(extractions));
	t.equal(extractions.length, 9);
	t.equal(extractions[7], 65);
});


test("finale", function (t) {
	t.plan(2);

	const {boards, extractions} = lib4.parse(input);
	const game = lib4.game(boards, extractions);
	t.ok(game.play());
	const winner = game.getWinner();
	t.equal(winner.sumOfUnmarked() * game.lastExtraction(), output);
});

test("second part", function (t) {
	t.plan(2);

	const {boards, extractions} = lib4.parse(input);
	const game = lib4.game(boards, extractions);
	t.ok(game.playUntil());
	const winner = game.getWinner();
	t.equal(winner.sumOfUnmarked() * game.lastExtraction(), 1924);
});
