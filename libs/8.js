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
const getWords = R.split(" ");
const segmentsOf = (n) => R.length(digits[n].wires);
const findOne = R.find((x) => R.length(x) === segmentsOf(1));
const findFour = R.find((x) => R.length(x) === segmentsOf(4));
const findSeven = R.find((x) => R.length(x) === segmentsOf(7));
const findEight = R.find((x) => R.length(x) === segmentsOf(8));
const findFiveSize = R.filter((x) => R.length(x) === 5);
const findSixSize = R.filter((x) => R.length(x) === 6);

const occurences = R.reduce((acc, x) => ({
    ...acc,
    [x]: R.pipe(R.defaultTo(0), R.inc)(acc[x])
}), Object.create(null));

const largestPair = R.reduce(([k0, v0], [k1, v1]) => {
    const maxVal = R.max(v0, v1);
    const keyOfLargest = maxVal > v0 ? k1 : k0;
    return [keyOfLargest, maxVal];
}, [null, -Infinity]);

const mode = R.pipe(occurences, R.toPairs, largestPair, R.head);

const findA = (words) => R.head(R.difference(findSeven(words), findOne(words)));
function findC(words) {
    const one = findOne(words);
    const distanceOneCouples = R.filter(
        ([one, two]) => distance(one, two) === 1,
        R.xprod(findFiveSize(words), findSixSize(words))
    );
    const five = mode(R.map(R.find((x) => R.length(x) === segmentsOf(5)), distanceOneCouples));

    return R.difference(one, five)[0];
}

function findF(words, mapping) {
    const seven = findSeven(words);
    return R.find((x) => x !== mapping.a && x !== mapping.c, seven);
}

const distance = (one, two) => R.length(R.difference(one, two)) + R.length(R.difference(two, one)) ;

function process(input) {
    const words = R.pipe(
        getInput,
        getWords,
        R.map(R.pipe(wordToArray, R.sort((one, two) => one.charCodeAt(0) - two.charCodeAt(0))))
    )(input);
    const mapping = Object.create(null);
    mapping.a = findA(words);
    mapping.c = findC(words);
    mapping.f = findF(words, mapping);
    console.log(mapping);
}

export default Object.freeze({process});
