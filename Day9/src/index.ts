import * as fs from "fs";

type Location = {
  x: number;
  y: number;
};

function read_lines(filename: string) {
  return fs.readFileSync(filename, "utf8").split("\r\n");
}

function is_out_of_bounds_horizontal(
  grid: Array<Array<boolean>>,
  next_location: number
): boolean {
  if (next_location >= grid.length) {
    return true;
  }

  return false;
}

function is_out_of_bounds_vertical(
  grid: Array<Array<boolean>>,
  next_location: number
): boolean {
  if (next_location >= grid[0].length) {
    return true;
  }

  return false;
}

function is_head_tail_overlapping(
  head_location: Location,
  tail_location: Location
) {
  // head and tail overlapping
  if (
    head_location.x === tail_location.x &&
    head_location.y === tail_location.y
  ) {
    return true;
  }

  return false;
}

function is_head_tail_next_to_each_other(
  head_location: Location,
  tail_location: Location
): boolean {
  // head and tail one space apart
  // once space right
  if (
    head_location.x === tail_location.x + 1 &&
    head_location.y === tail_location.y
  ) {
    return true;
  }
  // one space up
  if (
    head_location.x === tail_location.x &&
    head_location.y === tail_location.y + 1
  ) {
    return true;
  }
  // one space left
  if (
    head_location.x === tail_location.x - 1 &&
    head_location.y === tail_location.y
  ) {
    return true;
  }
  // one space down
  if (
    head_location.x === tail_location.x &&
    head_location.y === tail_location.y - 1
  ) {
    return true;
  }

  return false;
}

function is_head_tail_touching_diagonal(
  head_location: Location,
  tail_location: Location
): boolean {
  // head and tail are diagonal distance away
  // one space up, one space left
  if (
    head_location.x === tail_location.x + 1 &&
    head_location.y === tail_location.y - 1
  ) {
    return true;
  }
  // one space up, one space right
  if (
    head_location.x === tail_location.x + 1 &&
    head_location.y === tail_location.y + 1
  ) {
    return true;
  }
  // one space down, one space left
  if (
    head_location.x === tail_location.x - 1 &&
    head_location.y === tail_location.y - 1
  ) {
    return true;
  }
  // one space down, one space right
  if (
    head_location.x === tail_location.x - 1 &&
    head_location.y === tail_location.y + 1
  ) {
    return true;
  }

  return false;
}

function move_head(
  grid: Array<Array<boolean>>,
  start_location: Location,
  current_location: Location,
  next_location: Location,
  tail_location: Location
): [Array<Array<boolean>>, Location, Location, Location] {
  if (next_location.x !== current_location.x && next_location.x < 0) {
    let new_horizontal: boolean[] = [];
    new_horizontal.length = grid.length;
    new_horizontal = new_horizontal.fill(false);
    // new_horizontal = new_horizontal.fill(false);
    // console.log("new hori");
    // console.log(new_horizontal);
    // console.log("grid before");
    // console.log(grid);
    grid = [new_horizontal, ...grid];
    // console.log("grid after");
    // console.log(grid);
    start_location = { ...start_location, x: start_location.x + 1 };
    next_location = { ...next_location, x: next_location.x + 1 };
    tail_location = { ...tail_location, x: tail_location.x + 1 };
  }

  if (
    next_location.x !== current_location.x &&
    is_out_of_bounds_horizontal(grid, next_location.x)
  ) {
    let new_horizontal: boolean[] = [];
    new_horizontal = new_horizontal.fill(false, 0, grid[0].length);
    grid.push(new_horizontal);
  }

  if (
    next_location.y !== current_location.y &&
    is_out_of_bounds_vertical(grid, next_location.y)
  ) {
    for (let i = 0; i < grid.length; ++i) {
      grid[i].push(false);
    }
  }

  if (
    next_location.y !== current_location.y &&
    next_location.y < start_location.y
  ) {
    let new_grid: Array<Array<boolean>> = [];
    for (let i = 0; i < grid.length; ++i) {
      new_grid.push([false, ...grid[i]]);
    }
    grid = new_grid;
    start_location = { ...start_location, y: start_location.y + 1 };
    next_location = { ...next_location, y: next_location.y + 1 };
    // console.log("new y offset");
    // console.log(tail_location);
    tail_location = { ...tail_location, y: tail_location.y + 1 };
    // console.log(tail_location);
    // console.log("new start location");
    // console.log(start_location);
  }

  return [grid, next_location, start_location, tail_location];
}

function move_tail(
  grid: Array<Array<boolean>>,
  head_location: Location,
  tail_location: Location
): Location {
  // find closest x
  let new_tail_location: Location = { x: 0, y: 0 };
  for (let x = -1; x <= 1; ++x) {
    for (let y = -1; y <= 1; ++y) {
      let new_possible_tail_location = {
        x: tail_location.x + x,
        y: tail_location.y + y,
      };
      if (
        is_head_tail_next_to_each_other(
          head_location,
          new_possible_tail_location
        )
      ) {
        new_tail_location = new_possible_tail_location;
      }
    }
  }
  // console.log(head_location);
  // console.log(new_tail_location);
  // console.log(grid);

  // mark this place as visited
  grid[new_tail_location.x][new_tail_location.y] = true;

  return new_tail_location;
}

function move_rope(
  grid: Array<Array<boolean>>,
  start_location: Location,
  current_head_location: Location,
  next_head_location: Location,
  current_tail_location: Location
): [Array<Array<boolean>>, Location, Location, Location] {
  // move head first
  [grid, current_head_location, start_location, current_tail_location] =
    move_head(
      grid,
      start_location,
      current_head_location,
      next_head_location,
      current_tail_location
    );

  // console.log(current_tail_location);

  // check if tail is touching head
  if (
    is_head_tail_next_to_each_other(
      current_head_location,
      current_tail_location
    ) ||
    is_head_tail_touching_diagonal(
      current_head_location,
      current_tail_location
    ) ||
    is_head_tail_overlapping(current_head_location, current_tail_location)
  ) {
    return [grid, start_location, current_head_location, current_tail_location];
  }

  // head and tail not touching so we move tail closest to head
  current_tail_location = move_tail(
    grid,
    current_head_location,
    current_tail_location
  );

  return [grid, start_location, current_head_location, current_tail_location];
}

function solve(moves: string[]) {
  let head_location: Location = { x: 0, y: 0 };
  let start_location = head_location;
  let tail_location = head_location;
  let next_head_location = head_location;
  let grid = [[true]];

  for (let move of moves) {
    if (move.length === 0) continue;
    let [direction, spaces] = move.split(" ");
    // console.log(`direction: ${direction} spaces: ${spaces}`);
    for (let i = 0; i < parseFloat(spaces); ++i) {
      switch (direction) {
        case "L": {
          next_head_location = { ...head_location, x: head_location.x - 1 };
          break;
        }
        case "R": {
          next_head_location = { ...head_location, x: head_location.x + 1 };
          break;
        }
        case "U": {
          next_head_location = { ...head_location, y: head_location.y + 1 };
          break;
        }
        case "D": {
          next_head_location = { ...head_location, y: head_location.y - 1 };
          break;
        }
      }

      [grid, start_location, head_location, tail_location] = move_rope(
        grid,
        start_location,
        head_location,
        next_head_location,
        tail_location
      );
    }
  }

  // check visited spaces
  let count = 0;
  for (let arr of grid) {
    for (let element of arr) {
      if (element) {
        count += 1;
      }
    }
  }
  console.log("Visited spaces: " + count);
}

let moves = read_lines("input_one");
solve(moves);
