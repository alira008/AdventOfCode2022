import * as fs from "fs";
import SolvePartOne from "./part_one";
import SolvePartTwo from "./part_two";

function read_lines(filename: string): Array<string> {
  return fs.readFileSync(filename, "utf-8").split("\r\n");
}

const input = read_lines("input_one.txt");
SolvePartOne(input);

console.log("\n/////////////\n")

const input2 = read_lines("input_two.txt");
SolvePartTwo(input2)
