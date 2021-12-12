import * as R from "ramda";

function findMin(input) {

	const parse = R.pipe(R.split(","), R.map(Number));
	const min = R.reduce(R.min, Number.MAX_SAFE_INTEGER);
	const max = R.reduce(R.max, Number.MIN_SAFE_INTEGER);
	const gauss = (n) => n * (n + 1) / 2;
	const calcFuel = R.curry((x, acc, y) => acc + Math.abs(x - y));
	const calcLinFuel = R.curry((x, acc, y) => acc + gauss(Math.abs(x - y)));
	const fuel = (calcFuel, data, range) => R.map((x) => R.reduce(calcFuel(x), 0, data), range);
	
	const data = parse(input);
	const minValue = min(data);
	const maxValue = max(data);
	const range = R.range(minValue, maxValue + 1);
	const results = fuel(calcLinFuel, data, range);
	return min(results);
}

export default Object.freeze({findMin});
