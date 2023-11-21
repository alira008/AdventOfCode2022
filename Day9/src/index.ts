import { readFileSync } from "fs";
import { solve_part_one, solve_part_two } from "./solution";

const input_one = readFileSync("input_one", "utf8");
const input_two = readFileSync("input_two", "utf8");

console.log("part one: ", solve_part_one(input_one));
console.log("part two: ", solve_part_two(input_two));
