import * as R from "ramda";

const digits = [
    {id: 0, wires: ["a", "b", "c",  "e", "f", "g"]},
    {id: 1, wires: ["c", "f"]},
    {id: 2, wires: ["a", "c", "d", "e", "g"]},
    {id: 3, wires: ["a", "c", "d", "f", "g"]},
    {id: 4, wires: ["b", "c", "d", "f"]},
    {id: 5, wires: ["a", "b", "d", "f", "g"]},
    {id: 6, wires: ["a", "b", "d", "e", "f", "g"]},
    {id: 7, wires: ["a", "c", "f"]},
    {id: 8, wires: ["a", "b", "c", "d", "e", "f", "g"]},
    {id: 9, wires: ["a", "b", "c", "d", "f", "g"]}
];

const wordToArray = R.split("");
const getInput = R.pipe(R.split("|"), R.head);
const getOutput = R.pipe(R.split("|"), R.last);

function processInput() {

}
R.pipe(
    getInput,
    R.split(" "),
    processInput
    );
