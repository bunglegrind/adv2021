import fs from "fs";
import lib5 from "./libs/5.js";

fs.readFile("./inputs/5.txt", "utf8", function (err, data) {
    if (err) {
        return console.log(err);
    }

    data = data.substring(0, data.length - 1);

    const grid = lib5.grid();
    data.split("\n").forEach((x) => grid.insertComplete(lib5.parse(x)));
    console.log(grid.overlaps(2));

});
