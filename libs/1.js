import * as R from "ramda";

const sum = R.reduce(R.add, 0);

function calcIncrements(sw, input) {
	const swInput = R.aperture(sw, input);
	const tail = R.tail(swInput);
	const init = R.init(swInput);
	return R.reduce(
		(acc, x) => acc + Number(sum(x[0]) > sum(x[1])),
		0,
		R.zip(tail, init)
	);
}


export default Object.freeze(R.curry(calcIncrements));
