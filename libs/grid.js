import * as R from "ramda";

function grid(data) {

	function parse(data) {
		return R.pipe(
			R.split("\n"),
			R.map(R.split("")),
			R.map(R.map(Number))
		)(data);
	}
	const matrix = parse(data);
	
	const limit = R.curry(function (max, i) {
		if (i < 0 || i >= max) {
			throw new Exception(i + " outside limits");
		}
		return true;
	});
	const rows = () => R.length(matrix);
	const cols = () => R.length(matrix[0]);
	const rowLimit = limit(rows());
	const colLimit = limit(cols());

	const get = ([i, j]) => rowLimit(i) && colLimit(j) && matrix[i][j];
	
	const set = function [(i, j], v) {
		rowLimit(i) && colLimit(j);
		matrix[i][j] = v;
		return v;
	};
	
	const getNeightborhood([i, j]) ssd

	return Object.freeze({rows, cols, get, set});
}

export default Object.freeze({grid});
