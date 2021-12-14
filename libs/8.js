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
const getInput = R.pipe(R.split(" | "), R.head);
const getOutput = R.pipe(R.split(" | "), R.last);
const segmentsOf = (n) => R.length(R.prop("wires", R.find(R.propEq("id", n))));
const find = R.curry((n, array) => R.filter(R.eq(R.length, segmentsOf(n)), array));
const findOne = R.filter(R.eq(R.length, segmentsOf2);
const findFour = R.filter(R.eq(R.length, segmentsOf4);
const findSeven = R.filter(R.eq(R.length, segmentsOf3);
const findEight = R.filter(R.eq(R.length, segmentsOf(7))jj);


function processInput(input) {
	const mapping = [];
	//first rule
	

}
R.pipe(
    getInput,
    R.split(" "),
    processInput
    );
