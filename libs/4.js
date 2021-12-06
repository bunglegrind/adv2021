import * as R from "ramda";

const boardSize = 5;

function toNumber(v) {
	if (v === "") {
		return NaN;
	}
	return Number(v);
}

function parse(datafile) {
	const [extractionsInput, ...boardsInput] = datafile.split("\n\n");
	const extractions = extractionsInput ? extractionsInput.split(",").map(toNumber) : [];
	if(!validateExtractions(extractions)) {
		throw new Error("Bad valued extractions");
	}
	const boards = boardsInput.map(board);
	return Object.freeze({boards, extractions});
}

function validateExtractions(extractions) {
	return extractions.every(
		(x) => typeof x === "number" && !Number.isNaN(x) && x < 100
	);
}

function validateBoard(board) {
	return (
		board.length === boardSize
		&& R.all((x) => x.length === boardSize, board)
		&& R.all(R.pipe(R.pluck(0), validateExtractions), board)
		//all unique values missing
	);
}

function board(str) {
	const makeBoard = R.pipe(
		R.split("\n"),
		R.map(R.split(" ")),
		R.map(R.filter((x) => x !== "")),
		R.map(R.map((x) => [toNumber(x), false]))
	);

	const table = makeBoard(str);

	if (!validateBoard(table)) {
		throw new Error("Bad valued boards: " + JSON.stringify(table));
	}

	function get(row, col) {
		return table[row][col][0];
	}

	function mark(extraction) {
		return R.any(function (x) {
			if(x[0] === extraction) {
				x[1] = true;
				return true;
			}
			return false;
		}, R.unnest(table));
	}

	function hasWinnerRow(table) {
		return R.any(R.reduce((acc, x) => acc && x[1], true), table);
	}

	function hasWon() {
		return hasWinnerRow(table) || hasWinnerRow(R.transpose(table));
	}

	function sumOfUnmarked() {
		return R.reduce((acc, x) => x[1] ? acc : acc + x[0], 0, R.unnest(table));
	}

	function toString() {
		return JSON.stringify(table);
	}

	return Object.freeze({get, hasWon, mark, sumOfUnmarked, toString});
}

function game(boards, extractions) {
	let lastNumberExtracted;
	let winner;

	const step = R.curry(function (boards, extraction) {
		lastNumberExtracted = extraction;
		winner =  R.pipe(
			R.forEach((board) => board.mark(extraction)),
			R.filter((board) => board.hasWon())
		)(boards);

		return Boolean(winner.length);
	});

	function lastExtraction() {
		return lastNumberExtracted;
	}

	function findWinner(boards, extractions, oneRound = false) {

		R.any(step(boards), extractions);
		return (
			(extractions.length === 1 || boards.length === 1 || oneRound)
			? true
			: findWinner(
				R.without(winner, boards),
				R.drop(
					1 + R.indexOf(
						lastExtraction(),
						extractions
					),
					extractions
				)
			)
		);
	}

	function getWinner() {
		return winner[0];
	}

	return Object.freeze({
		play: () => findWinner(boards, extractions, true),
		playUntil: () => findWinner(boards, extractions),
		lastExtraction,
		getWinner
	});

}


export default Object.freeze({
	parse,
	game
});
