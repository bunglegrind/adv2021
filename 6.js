import fs from "fs";
import lib6 from "./libs/6.js";

fs.readFile("./inputs/6.txt", "utf8", function (err, data) {
    if (err) {
        return console.log(err);
    }

    data = data.substring(0, data.length - 1);

	const school = lib6.school(data);
	school.pass(256);
	console.log(school.size());

});
