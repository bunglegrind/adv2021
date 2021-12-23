import * as R from "ramda";

function parse(data) {
	return R.pipe(
		R.split("\n"),
		R.map(R.split("")),
		R.map(R.map(Number))
	)(data);
}

function findMin(input) {
	function extractIntorno(x, y) {
		const getRange = (x, max) => R.range(R.max(0, x - 1), R.min(max - 1, x + 1) + 1);
		const addLeft = R.curry((n, array) => R.map((x) => [n, x], array));
		const addRight = R.curry((n, array) => R.map((x) => [x, n], array));

		return R.uniq(addRight(y, getRange(x, matrix.length)).concat(addLeft(x, getRange(y, matrix[0].length))));
	}

	const matrix = parse(input);
	const getIntorno = R.map((coord) => matrix[coord[0]][coord[1]]);
	const min = R.apply(Math.min);
	let i = 0;
	let j = 0;
	let intorno;
	const lowPoints = [];
	while (i < matrix.length) {
		while (j < matrix[0].length) {
			intorno = getIntorno(extractIntorno(i, j));
			if (matrix[i][j] === min(intorno) && R.filter(R.equals(min(intorno)), intorno).length === 1) {
				lowPoints.push(matrix[i][j]);
			}
			j += 1;
		}
		i += 1;
		j = 0;
	};
	return lowPoints;
}



export default Object.freeze({findMin});
