function school(input) {
	
	let fishes = new Array(9).fill(0);
	input.split(",").map(Number).forEach((x) => fishes[x] += 1);

	function step() {
		fishes = [...fishes.slice(1), fishes[0]];
		fishes[6] += fishes[fishes.length - 1];
	}

	function pass(day) {
		step();
		return (
			day === 1
			? true
			: pass(day - 1)
		);
	}
	return Object.freeze({
		size: () => fishes.reduce((acc, x) => acc + x),
		pass
	});
}

export default Object.freeze({school});
