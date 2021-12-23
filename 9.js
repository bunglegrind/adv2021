import fs from "fs";
import lib9 from "./libs/9.js";

fs.readFile("./inputs/9.txt", "utf8", function (err, data) {
    if (err) {
        return console.log(err);
    }
    data = data.substring(0, data.length - 1);

	console.log(lib9.findMin(data).reduce((acc, x) => acc + x + 1, 0));

});
