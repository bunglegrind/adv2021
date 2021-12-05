import fs from "fs";
import lib3 from "./libs/3.js";

fs.readFile("./inputs/3.txt", "utf8", function (err, data) {
	if (err) {
		return console.log(err);
	}

	const input = makeArray(data);
	validate(input);
	return console.log(lib3.calcLifeSupport(input));
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
