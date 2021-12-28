import * as R from "ramda";

function parse(data) {
	return R.pipe(
		R.split("\n"),
		R.map(R.split("")),
		R.map(R.map(Number))
	)(data);
}

let matrix;

const addLeft = R.curry((n, array) => R.map((x) => [n, x], array));
const addRight = R.curry((n, array) => R.map((x) => [x, n], array));
const getIntorno = R.map((coord) => matrix[coord[0]][coord[1]]);

function extractIntorno(x, y) {
const getRange = (x, max) => R.range(R.max(0, x - 1), R.min(max - 1, x + 1) + 1);
	return R.uniq(addRight(y, getRange(x, matrix.length)).concat(addLeft(x, getRange(y, matrix[0].length))));
}

function findMin(input) {
	return findLowPoints(input).map((c) => matrix[c[0]][c[1]]);
}
function findLowPoints(input) {

	matrix = parse(input);
	const min = R.apply(Math.min);
	let i = 0;
	let j = 0;
	let intorno;
	const lowCoord = [];
	while (i < matrix.length) {
		while (j < matrix[0].length) {
			intorno = getIntorno(extractIntorno(i, j));
			if (matrix[i][j] === min(intorno) && R.filter(R.equals(min(intorno)), intorno).length === 1) {
				lowCoord.push([i, j]);
			}
			j += 1;
		}
		i += 1;
		j = 0;
	};
	return lowCoord;
}

function split(obj, index, array) {
	const toR = array.reduce(function (acc, x, i) {
		if(x !== obj) {
			acc[acc.length - 1].push([index, i]);
		} else {
			acc.push([]);
		}
		return acc;
	}, [[]]); 
	return R.reject(R.equals([]), toR);
}

function calcBasins(basins) {
	const getLengths = R.map(R.length);
	const len = getLengths(basins);
	const findIntorno = (p) => R.map(R.without([p], R.apply(extractIntorno)(p));
	const mapAppend = R.ap(R.flip(R.append));
// at every iteration it calculates the intorno of everything...we can
// optimize
//R.map(
  //R.ap(
   // R.flip(R.append),
    //R.pipe(
     // R.last,
      //R.map(double)
    //)
  //)
//, my);
	basins = R.map(
		R.ap(
			R.flip(R.append),
			R.pipe(
				findIntorno,
				R.tap(console.log),
				R.filter(([i, j]) => matrix[i][j] !== 9)
			)
		),
		basins
	);
	//basins = R.map(
	//	R.pipe(
	//		R.chain(R.apply(extractIntorno)),
	//		R.uniq,
	//		R.filter(([i, j]) => matrix[i][j] !== 9)
	//	), basins);
	return R.equals(len, getLengths(basins)) ? basins : calcBasins(basins);
}

const findBasins = (input) => R.pipe(
	findLowPoints,
	R.map((x) => [[x]]),
	calcBasins
)(input);

export default Object.freeze({findMin, findBasins});
