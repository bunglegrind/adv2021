import fs from "fs";
import calcSWIncrements from "./libs/1.js";

const calcIncrements = calcSWIncrements(3);

fs.readFile("./inputs/1.txt", "utf8", function (err, data) {
	if (err) {
		return console.log(err);
	}

	const input = makeArray(data);
	return console.log(calcIncrements(input));
});

function makeArray(data) {
	return data.split("\n").map((x) => Number(x));
}
