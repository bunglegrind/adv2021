import fs from "fs";
import lib4 from "./libs/4.js";

fs.readFile("./inputs/4.txt", "utf8", function (err, data) {
	if (err) {
		return console.log(err);
	}
	
	data = data.substring(0, data.length - 1);

	const {boards, extractions} = lib4.parse(data);
	const game = lib4.game(boards, extractions);
	game.playUntil();
	const winner = game.getWinner();
	console.log(winner.sumOfUnmarked() * game.lastExtraction());

});

function makeArray(data) {
	return data.split("\n").map((x) => x.trim()).filter((x) => x.length);
}

function validate(input) {
	const toR = (
		Array.isArray(input)
		&& input.length > 0
		&& input.every((x) => typeof x === "string")
		&& input.every((x) => x.match(/^[01]+$/))
	);

	if (!toR) console.log("ERRORE");

}
