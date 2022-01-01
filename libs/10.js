import * as R from "ramda";

const points = {
	">": 25137,
	"}": 1197,
	"]": 57,
	")": 3
};
const scores = {
	">": 4,
	"}": 3,
	"]": 2,
	")": 1
};
const pairs = {
	">": "<",
	"}": "{",
	"]": "[",
	")": "("
};

const invertedPairs = R.invertObj(pairs);

const opens = R.values(pairs);
const closes = R.keys(pairs);

const parseLine = R.pipe(
	R.split(""),
	R.reduce((stack, char) => (
		R.includes(char, opens)
		? [...stack, char]
		: (
			pairs[char] === R.last(stack)
			? R.init(stack)
			: R.reduced(char)
		)
	), [])
);

const isCorrupted = R.pipe(
	parseLine,
	(x) => Array.isArray(x) ? false : true
);

const getPenalty = R.pipe(
	parseLine,
	(x) => Array.isArray(x) ? 0 : points[x]
);

const overallPenalty = R.pipe(
	R.split("\n"),
	R.map(getPenalty),
	R.reduce(R.add, 0)
);

const completeLine = R.reduceRight((char, c) => [ ...c, invertedPairs[char]], []);

const calculateScore = R.reduce((score, char) => 5 * score + scores[char], 0);

const getMedianScore = (oddArray) => oddArray[Math.floor(R.length(oddArray)/2)];
const repairScore = R.pipe(
	R.split("\n"),
	R.map(parseLine),
	R.filter(Array.isArray),
	R.map(completeLine),
	R.map(calculateScore),
	R.sort(R.subtract),
	getMedianScore
);

export default Object.freeze({isCorrupted, getPenalty, overallPenalty, repairScore});
