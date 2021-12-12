import fs from "fs";
import lib7 from "./libs/7.js";

fs.readFile("./inputs/7.txt", "utf8", function (err, data) {
    if (err) {
        return console.log(err);
    }

    data = data.substring(0, data.length - 1);

	console.log(lib7.findMin(data));

});
