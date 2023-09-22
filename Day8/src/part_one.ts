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

  let visible_tree_count = 0;
  for (let i = 1; i < arr.length - 1; ++i) {
    for (let j = 1; j < arr.length - 1; ++j) {
      let is_obstructed_above = check_above(arr, arr[i][j], i - 1, j);
      let is_obstructed_below = check_below(arr, arr[i][j], i + 1, j);
      let is_obstructed_left = check_left(arr, arr[i][j], i, j - 1);
      let is_obstructed_right = check_right(arr, arr[i][j], i, j + 1);

      if (
        !is_obstructed_left ||
        !is_obstructed_right ||
        !is_obstructed_above ||
        !is_obstructed_below
      ) {
        ++visible_tree_count;
      }
    }
  }

  let visible_exterior_tree_count = arr.length * 4 - 4;
  console.log(`Interior trees visible: ${visible_tree_count}`);
  console.log(`Exterior trees visible: ${visible_exterior_tree_count}`);
  console.log(
    `Total trees visible: ${
      visible_exterior_tree_count + visible_tree_count
    }`
  );
}

function check_left(
  arr: Array<Array<string>>,
  value: string,
  i: number,
  j: number
): boolean {
  let tall_tree = false;

  while (j >= 0) {
    if (value <= arr[i][j]) {
      tall_tree = true;
      break;
    }
    --j;
  }

  return tall_tree;
}
function check_right(
  arr: Array<Array<string>>,
  value: string,
  i: number,
  j: number
): boolean {
  let tall_tree = false;

  while (j <= arr.length - 1) {
    if (value <= arr[i][j]) {
      tall_tree = true;
      break;
    }
    ++j;
  }

  return tall_tree;
}
function check_below(
  arr: Array<Array<string>>,
  value: string,
  i: number,
  j: number
): boolean {
  let tall_tree = false;

  while (i <= arr.length - 1) {
    if (value <= arr[i][j]) {
      tall_tree = true;
      break;
    }
    ++i;
  }

  return tall_tree;
}
function check_above(
  arr: Array<Array<string>>,
  value: string,
  i: number,
  j: number
): boolean {
  let tall_tree = false;

  while (i >= 0) {
    if (value <= arr[i][j]) {
      tall_tree = true;
      break;
    }
    --i;
  }

  return tall_tree;
}
