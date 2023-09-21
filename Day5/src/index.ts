import * as fs from "fs";
import { solve_part_one } from "./part_one";
import { solve_part_two } from "./part_two";

function read_lines(filename: string): Array<string> {
  return fs.readFileSync(filename, "utf-8").split("\n");
}

function main() {
    const input_one_lines = read_lines('input_one.txt')
    solve_part_one(input_one_lines)

    const input_two_lines = read_lines('input_two.txt')
    solve_part_two(input_two_lines)
}

main()
