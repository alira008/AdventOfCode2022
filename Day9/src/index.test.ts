import { readFileSync } from "fs";
import { solve_part_one } from "./solution";

test("test one", () => {
  // let question = readFileSync("input_one", "utf8");
  // let test = solve_part_one(question);
  let answer = solve_part_one(`R 4
U 4
L 3
D 1
R 4
D 1
L 5
R 2`);
  expect(answer).toBe(13);
});
