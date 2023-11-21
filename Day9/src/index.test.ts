import { readFileSync } from "fs";
import { solve_part_one } from "./solution";
import { solve_part_two } from "./solution";

test("test part one", () => {
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

test("test part two", () => {
  let answer = solve_part_one(`R 5
U 8
L 8
D 3
R 17
D 10
L 25
U 20`);
  expect(answer).toBe(39);
});
