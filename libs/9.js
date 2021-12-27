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

function findMin(input) {
	return findLowPoints(input).map((c) => matrix[c[0]][c[1]]);
}
function findLowPoints(input) {
	function extractIntorno(x, y) {
		const getRange = (x, max) => R.range(R.max(0, x - 1), R.min(max - 1, x + 1) + 1);

		return R.uniq(addRight(y, getRange(x, matrix.length)).concat(addLeft(x, getRange(y, matrix[0].length))));
	}

	matrix = parse(input);
	const getIntorno = R.map((coord) => matrix[coord[0]][coord[1]]);
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

const same = R.curry((b1, b2) => R.intersection(b1, b2).length > 0);
const concat = R.reduce(R.concat, []);
function compact(basins) {
	const len = basins.length;
	R.uniq(R.unnest(basins)).forEach(function (c) {
		const toUnion = basins.filter(R.includes(c));
		basins = R.difference(basins, toUnion);
		if (toUnion.length > 0) {
			basins.push(R.uniq(concat(toUnion)));
		}
	});

	return (len  > basins.length) ? compact(basins) : basins; 
}

function compact2(basins) {
	console.log("iteration...");
	const len = basins.length;
	basins.forEach(function (b, i) {
		console.log(i);
		const toUnion = [];
		const newBasins = [];
		basins.forEach(function (b2, ii) {
			if (same(b, b2)) {
				toUnion.push(b2);
			} else {
				newBasins.push(b2);
			}
		});
		if (toUnion.length > 0) {
			newBasins.push(R.uniq(concat(toUnion)));
		}
		basins = newBasins;
	});

	return (len  > basins.length) ? compact2(basins) : basins; 
}

function findBasins(input) {
	matrix = parse(input);
	let horizontalBasins = [];
	let verticalBasins = [];
	matrix.forEach(function (row, i) {
		horizontalBasins.push(split(9, i, row));
	});
	R.transpose(matrix).forEach(function (col, j) {
		verticalBasins.push(
			split(9, j, col).map((x) => x.map(([i, j]) => [j, i]))
		);
	});
	horizontalBasins =  R.unnest(horizontalBasins);
	verticalBasins =  R.unnest(verticalBasins);
	const basins = horizontalBasins.concat(verticalBasins);
	return compact2(basins);
}

export default Object.freeze({findMin, findBasins});
