export function solve_part_one(input_lines: Array<string>) {
  let input_lines_index = 0;
  while (input_lines.length && input_lines[input_lines_index].length !== 0) {
    ++input_lines_index;
  }

  let stacks: Array<Array<string>> = [];

  // Loop through line with stack numbers
  let stacks_line = input_lines[input_lines_index - 1];
  for (let i = 0; i < stacks_line.length; ++i) {
    if (!isNaN(parseFloat(stacks_line[i]))) {
      let stack: Array<string> = [];
      let stacks_line_index = input_lines_index - 2;
      while (stacks_line_index >= 0) {
        if (input_lines[stacks_line_index][i].trim().length === 0) {
          --stacks_line_index;
          continue;
        }

        stack.push(input_lines[stacks_line_index][i]);
        --stacks_line_index;
      }
      stacks.push(stack);
    }
  }

  // Parse moves
  for (let i = input_lines_index + 1; i < input_lines.length; ++i) {
    const words = input_lines[i].split(" ");
    const amount_to_move = parseFloat(words[1]);
    const source = parseFloat(words[3]) - 1;
    const destination = parseFloat(words[5]) - 1;

    for (let j = 0; j < amount_to_move; ++j) {
      const value = stacks[source].pop() ?? "";
      stacks[destination].push(value);
    }
  }

  // return answer
  // (top letters of each stack)
  let result = "";
  for (let i = 0; i < stacks.length; ++i) {
    result += stacks[i].pop() ?? "";
  }
  console.log(result);
}
