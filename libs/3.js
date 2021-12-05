import * as R from "ramda";

function compressOneValue(array) {
	array = makeArray(array);
	return R.transpose(array).map((x) => mode(x));
}

function makeArray(input) {
	return input.map((x) => x.split("").map((x) => Number(x)));                
}

function mode(array) {
	const count = [0, 0];
	array.forEach((x) => count[x] += 1);
	return (count[0] > count[1] ? 0 : 1);
}

const least = (array) => mode(array) ? 0 : 1;

function bin2dec(str) {
	return (
		str.split("").reduceRight(
			(acc, x, i) => acc + Number(x) * 2 ** (str.length - 1 - i),
			0
		)
	);
}

function xor(str) {
	return str.split("").map((x) => (x === "1" ? "0" : "1")).join("");
}


function calcPower(input) {
	const avg = compressOneValue(input).map((x) => String(x)).join("");

	return bin2dec(avg) * bin2dec(xor(avg));
}

function calcLifeSupport(input) {
	return bin2dec(getOxigenRating(input)) * bin2dec(getCO2Rating(input));
}

const selectMode = R.curry((pos, mean, x) => x[pos] === mean);

const recursion = R.curry(function (selectionCriteria, input, pos = 0) {
	return (
		input.length === 1
		? input[0]
		: recursion(selectionCriteria, input.filter(selectMode(
			pos,
			selectionCriteria(input, pos)
			
		)), pos + 1)
	);
});

function selectOxigen(input, pos) {
	return mode(R.transpose(input)[pos]);
}

function selectCO2(input, pos) {
	return least(R.transpose(input)[pos]);
}

function getOxigenRating(input) {
	return recursion(selectOxigen, makeArray(input)).join("");
}

function getCO2Rating(input) {
	return recursion(selectCO2, makeArray(input)).join("");
}

export default Object.freeze({
	calcLifeSupport,
	calcPower,
	getOxigenRating,
	getCO2Rating
});
