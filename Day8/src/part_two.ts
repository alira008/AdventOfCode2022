export default function solve(input: string[]) {
  let arr: Array<Array<string>> = [];

  for (let row of input) {
    if (row.length == 0) {
      continue;
    }
    let inner_arr: string[] = [];
    for (let c of row) {
      inner_arr.push(c);
    }
    arr.push(inner_arr);
  }

  let highest_scenic_score = 0;
  for (let i = 1; i < arr.length - 1; ++i) {
    for (let j = 1; j < arr.length - 1; ++j) {
      const visible_trees_above = check_above(arr, arr[i][j], i - 1, j);
      const visible_trees_below = check_below(arr, arr[i][j], i + 1, j);
      const visible_trees_left = check_left(arr, arr[i][j], i, j - 1);
      const visible_trees_right = check_right(arr, arr[i][j], i, j + 1);

      const score =
        visible_trees_left *
        visible_trees_right *
        visible_trees_below *
        visible_trees_above;

      if (score > highest_scenic_score) {
        highest_scenic_score = score;
      }
    }
  }

  console.log(`Highest scenic score: ${highest_scenic_score}`);
}

function check_left(
  arr: Array<Array<string>>,
  value: string,
  i: number,
  j: number
): number {
  let visible_tree_count = 0;

  while (j >= 0) {
    ++visible_tree_count;
    if (value <= arr[i][j]) {
      break;
    }
    --j;
  }

  return visible_tree_count;
}
function check_right(
  arr: Array<Array<string>>,
  value: string,
  i: number,
  j: number
): number {
  let visible_tree_count = 0;

  while (j <= arr.length - 1) {
    ++visible_tree_count;
    if (value <= arr[i][j]) {
      break;
    }
    ++j;
  }

  return visible_tree_count;
}
function check_below(
  arr: Array<Array<string>>,
  value: string,
  i: number,
  j: number
): number {
  let visible_tree_count = 0;

  while (i <= arr.length - 1) {
    ++visible_tree_count;
    if (value <= arr[i][j]) {
      break;
    }
    ++i;
  }

  return visible_tree_count;
}
function check_above(
  arr: Array<Array<string>>,
  value: string,
  i: number,
  j: number
): number {
  let visible_tree_count = 0;

  while (i >= 0) {
    ++visible_tree_count;
    if (value <= arr[i][j]) {
      break;
    }
    --i;
  }

  return visible_tree_count;
}
