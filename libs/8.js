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

function find3569(words) {
    const distanceOneCouples = R.filter(
        ([one, two]) => distance(one, two) === 1,
        R.xprod(findFiveSize(words), findSixSize(words))
    );
	const extract = (sz) => R.map(R.find((x) => R.length(x) === sz), distanceOneCouples);
	const extractNumbers = (array) => (
		R.equals(array[0], array[1])
		? [array[0], array[2]]
		: (
			R.equals(array[0], array[2])
			? [array[0], array[1]]
			: [array[2], array[0]]
		)
	);
	const [five, three] = extractNumbers(extract(segmentsOf(5)));
	const [nine, six] = extractNumbers(extract(segmentsOf(9)));

	return [three, five, six, nine];

}

function find02(words, numbers) {
	return [
		R.unnest(R.reject(R.includes(R.__, numbers), findSixSize(words))), 
		R.unnest(R.reject(R.includes(R.__, numbers), findFiveSize(words)))
	];
}

const distance = (one, two) => R.length(R.difference(one, two)) + R.length(R.difference(two, one)) ;

function process(input) {
	const numbers = new Array(10).fill([]);
	const sortedWordToArray = R.map(R.pipe(wordToArray, R.sort((one, two) => one.charCodeAt(0) - two.charCodeAt(0))));
    const words = R.pipe(
        getInput,
        getWords,
		sortedWordToArray 
    )(input);
	numbers[1] = findOne(words);
	numbers[4] = findFour(words);
	numbers[7] = findSeven(words);
	numbers[8] = findEight(words);
	[numbers[3], numbers[5], numbers[6], numbers[9]] = find3569(words);
	[numbers[0], numbers[2]] = find02(words, numbers);

	const output = R.pipe(
		getOutput,
		getWords,
		sortedWordToArray
	)(input);
	return R.pipe(
		R.map(R.indexOf(R.__, numbers)),
		R.join(""),
		Number
	)(output);
}

function batch(input) {
	return R.pipe(
		R.split("\n"),
		R.map(process),
		R.sum
	)(input);
}


export default Object.freeze({process, batch});
