import test from "tape";
import lib7 from "./libs/7.js";

const input = "16,1,2,0,4,2,7,1,2,14";

test("final", function (t) {
	t.plan(1);

	t.equal(lib7.findMin(input), 37);
});
