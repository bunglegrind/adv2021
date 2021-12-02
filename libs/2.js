function submarine() {
	const position = {
		horizontal: 0,
		depth: 0
	};

	function horizontal() {
		return position.horizontal;
	}

	function depth() {
		return position.depth;
	}
	
	function forward(steps) {
		position.horizontal += steps;
	}

	function down(steps) {
		position.depth += steps;
	}

	function up(steps) {
		position.depth -= steps;
		position.depth = Math.max(0, position.depth);
	}

	return Object.freeze({
		horizontal,
		depth,
		forward,
		down,
		up
	});
}

function parseCommand(string) {
	const command = string.split(" ");

	return Object.freeze({
		type: command[0],
		value: Number(command[1])
	});

}
function withAim(submarine) {
	let  actualDepth= 0;

	function aim() {
		return submarine.depth();
	}

	function forward(steps) {
		submarine.forward(steps);
		actualDepth += aim() * steps;
	}

	function depth() {
		return actualDepth;
	}

	return {
		...submarine,
		aim,
		forward,
		depth
	}
}
export default Object.freeze({parseCommand, submarine, withAim});
