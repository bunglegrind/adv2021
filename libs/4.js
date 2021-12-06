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
	
	return Object.freeze({get, hasWon, mark, sumOfUnmarked});
}

function game(boards, extractions) {
	function play() {
		return R.any(step, extractions);
	}
	
	function findWinner(boards, extractions) {
		R.any(step, extractions);

		return (
			extractions.length === 0 || boards.length === 0
			? true
			: findWinner(
				R.without(winner, boards), R.drop(1 + lastExtraction(), extractions)
			)
		);
	}

	function playUntil() {
		return findWinner(boards, extractions);
	}

	let lastNumberExtracted;
	let winner; 

	function step(extraction) {
		lastNumberExtracted = extraction;
		winner =  R.pipe(
			R.forEach((board) => board.mark(extraction)),
			R.find((board) => board.hasWon())
		)(boards);

		return Boolean(winner);
	}

	function getWinner() {
		return winner;
	}

	function lastExtraction() {
		return lastNumberExtracted;
	}

	return Object.freeze({play, playUntil, lastExtraction, getWinner});

}


export default Object.freeze({
	parse,
	game
});
