import * as R from "ramda";

function parse(data) {
	return R.pipe(
		R.split("\n"),
		R.map(R.split(""))
	)(data);
}

function findMin(input) {
	function extractIntorno(row, column) {
			
	}
	const matrix = parse(input);

	return [3];
}



export default Object.freeze({findMin});
