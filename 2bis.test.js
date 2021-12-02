import test from "tape";
import * as R from "ramda";
import lib2 from "./libs/2.js";

const {parseCommand, submarine, withAim} = lib2;

const input = `forward 5
down 5
forward 8
up 3
down 8
forward 2`;

test("init submarine", function (t) {
	const sm = withAim(submarine());

	t.plan(2);
	t.equal(sm.horizontal(), 0);
	t.equal(sm.depth(), 0);
});

test("move forward 1", function (t) {
	const sm = withAim(submarine());

	t.plan(2);
	sm.forward(1);
	t.equal(sm.horizontal(), 1);
	t.equal(sm.depth(), 0);
});

test("move forward 15", function (t) {
	const sm = withAim(submarine());

	t.plan(2);
	sm.forward(15);
	t.equal(sm.horizontal(), 15);
	t.equal(sm.depth(), 0);
});


test("move down 1", function (t) {
	const sm = withAim(submarine());

	t.plan(2);
	sm.down(1);
	t.equal(sm.depth(), 0);
	t.equal(sm.aim(), 1);
});


test("move down 11", function (t) {
	const sm = withAim(submarine());

	t.plan(2);
	sm.down(11);
	t.equal(sm.depth(), 0);
	t.equal(sm.aim(), 11);
});

test("move up 1", function (t) {
	const sm = withAim(submarine());

	t.plan(2);
	sm.up(1);
	t.equal(sm.depth(), 0);
	t.equal(sm.aim(), 0);
});


test("move down 5 up 1", function (t) {
	const sm = withAim(submarine());

	t.plan(1);
	sm.down(5);
	sm.up(1);
	t.equal(sm.aim(), 4);
});

test("move down 5 up 1 forward 3", function (t) {
	const sm = withAim(submarine());

	t.plan(3);
	sm.down(5);
	sm.up(1);
	sm.forward(3);
	t.equal(sm.aim(), 4);
	t.equal(sm.horizontal(), 3);
	t.equal(sm.depth(), 12);
});

test("parse commands", function (t) {
	t.plan(1);
	t.deepEqual(parseCommand("forward 4"), {type: "forward", value: 4});
});

test("final", function (t) {
	t.plan(2);
	const commands = input.split("\n");
	const sm = withAim(submarine());
	commands.forEach(R.pipe(
		parseCommand,
		(command) => sm[command.type](command.value))
	);

	t.equal(sm.horizontal(), 15);
	t.equal(sm.depth(), 60);


});

