import fs from "fs";

fs.readFile("./inputs/8.txt", "utf8", function (err, data) {
    if (err) {
        return console.log(err);
    }
    data = data.substring(0, data.length - 1);

    let count = 0;

    data.split("\n").forEach(function (x) {
        x.split("|")[1].split(" ").forEach(function (w) {
            if ((w.length >= 2 && w.length <= 4) || w.length === 7) {
                count += 1;
            }
        });
    });

    console.log(count);

});
