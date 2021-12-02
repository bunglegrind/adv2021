import fs from "fs";
import lib2 from "./libs/2.js";

fs.readFile("./inputs/2.txt", "utf8", function (err, data) {
	if (err) {
		return console.log(err);
	}

	const input = makeArray(data);
	const sm = lib2.withAim(lib2.submarine());
	input.forEach((command) => sm[command.type](command.value));
	return console.log(sm.depth() * sm.horizontal());
});

function makeArray(data) {
	return data.split("\n").map(lib2.parseCommand).filter((c) => c.type.length);
}
