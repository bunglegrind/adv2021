import fs from "fs";
import lib10 from "./libs/10.js";

fs.readFile("./inputs/10.txt", "utf8", function (err, data) {
    if (err) {
        return console.log(err);
    }
    data = data.substring(0, data.length - 1);

	console.log(lib10.overallPenalty(data));
	console.log(lib10.repairScore(data));
});
