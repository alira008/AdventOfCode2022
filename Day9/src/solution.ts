type Direction = "UP" | "DOWN" | "LEFT" | "RIGHT";
type Location = {
  x: number;
  y: number;
};

type Node = {
  location: Location;
  next: Node | null;
};

function are_nodes_overlapping(
  node_location: Location,
  other_node_location: Location,
): boolean {
  return (
    node_location.x === other_node_location.x &&
    node_location.y === other_node_location.y
  );
}

function are_nodes_next_to_each_other(
  node_location: Location,
  other_node_location: Location,
): boolean {
  // one space right
  if (
    node_location.x === other_node_location.x + 1 &&
    node_location.y === other_node_location.y
  ) {
    return true;
  }

  // one space up
  if (
    node_location.x === other_node_location.x &&
    node_location.y === other_node_location.y + 1
  ) {
    return true;
  }

  // one space left
  if (
    node_location.x === other_node_location.x - 1 &&
    node_location.y === other_node_location.y
  ) {
    return true;
  }

  // one space down
  if (
    node_location.x === other_node_location.x &&
    node_location.y === other_node_location.y - 1
  ) {
    return true;
  }

  return false;
}

function are_nodes_touching_diagonal(
  node_location: Location,
  other_node_location: Location,
): boolean {
  // one space up, one space left
  if (
    node_location.x === other_node_location.x + 1 &&
    node_location.y === other_node_location.y + 1
  ) {
    return true;
  }

  // one space down, one space right
  if (
    node_location.x === other_node_location.x + 1 &&
    node_location.y === other_node_location.y - 1
  ) {
    return true;
  }

  // one space up, one space left
  if (
    node_location.x === other_node_location.x - 1 &&
    node_location.y === other_node_location.y + 1
  ) {
    return true;
  }

  // one space down, one space left
  if (
    node_location.x === other_node_location.x - 1 &&
    node_location.y === other_node_location.y - 1
  ) {
    return true;
  }

  return false;
}

function are_nodes_touching(
  node_location: Location,
  other_node_location: Location,
): boolean {
  return (
    are_nodes_next_to_each_other(node_location, other_node_location) ||
    are_nodes_touching_diagonal(node_location, other_node_location) ||
    are_nodes_overlapping(node_location, other_node_location)
  );
}

function move_tail(
  node_location: Location,
  other_node_location: Location,
): Location | undefined {
  // find closest x
  let closest_new_other_node_location: Location | undefined = undefined;

  for (let x = -1; x <= 1; ++x) {
    for (let y = -1; y <= 1; ++y) {
      let new_other_node_location = {
        x: other_node_location.x + x,
        y: other_node_location.y + y,
      };
      if (
        are_nodes_next_to_each_other(node_location, new_other_node_location) ||
        are_nodes_touching_diagonal(node_location, new_other_node_location)
      ) {
        if (closest_new_other_node_location === undefined) {
          closest_new_other_node_location = new_other_node_location;
        } else if (
          Math.abs(new_other_node_location.x - node_location.x) +
            Math.abs(new_other_node_location.y - node_location.y) <
          Math.abs(closest_new_other_node_location.x - node_location.x) +
            Math.abs(closest_new_other_node_location.y - node_location.y)
        ) {
          closest_new_other_node_location = new_other_node_location;
        }
      }
    }
  }

  return closest_new_other_node_location;
}

export function solve_part_one(input: string): number {
  let moves = input
    .split("\n")
    .map((line) => line.trim())
    .flatMap((line) => {
      if (line.length === 0) return [];

      let direction: Direction;
      // parse Directions
      if (line[0] === "U") direction = "UP";
      else if (line[0] === "D") direction = "DOWN";
      else if (line[0] === "L") direction = "LEFT";
      else if (line[0] === "R") direction = "RIGHT";
      else throw new Error("Unknown Direction");

      // parse the distance to move in Direction
      let distance = parseFloat(line.slice(2));
      let moves: Direction[] = [];
      moves.length = distance;
      moves = moves.fill(direction, 0, distance);
      return moves;
    });

  let head_position: Location = { x: 0, y: 0 };
  let tail_position: Location = { x: 0, y: 0 };
  let visited_positions = new Set<Location>();
  visited_positions.add(tail_position);

  for (let move of moves) {
    // move the head
    if (move === "UP") head_position.y += 1;
    else if (move === "DOWN") head_position.y -= 1;
    else if (move === "LEFT") head_position.x -= 1;
    else if (move === "RIGHT") head_position.x += 1;

    // if head is touching tail, skip
    if (are_nodes_touching(head_position, tail_position)) {
      continue;
    }

    // check if tail is touching head
    let new_tail_position: Location;
    if (move === "UP") {
      new_tail_position = { ...tail_position, y: tail_position.y + 1 };
    } else if (move === "DOWN") {
      new_tail_position = { ...tail_position, y: tail_position.y - 1 };
    } else if (move === "LEFT") {
      new_tail_position = { ...tail_position, x: tail_position.x - 1 };
    } else {
      new_tail_position = { ...tail_position, x: tail_position.x + 1 };
    }
    tail_position = new_tail_position;

    visited_positions.add(new_tail_position);
  }

  return visited_positions.size;
}

export function solve_part_two(input: string): number {
  let moves = input
    .split("\n")
    .map((line) => line.trim())
    .flatMap((line) => {
      if (line.length === 0) return [];

      let direction: Direction;
      // parse Directions
      if (line[0] === "U") direction = "UP";
      else if (line[0] === "D") direction = "DOWN";
      else if (line[0] === "L") direction = "LEFT";
      else if (line[0] === "R") direction = "RIGHT";
      else throw new Error("Unknown Direction");

      // parse the distance to move in Direction
      let distance = parseFloat(line.slice(2));
      let moves: Direction[] = [];
      moves.length = distance;
      moves = moves.fill(direction, 0, distance);
      return moves;
    });

  let head_position: Location = { x: 0, y: 0 };
  let tail_position: Location = { x: 0, y: 0 };
  let rope: Location[] = [];
  rope.length = 10;
  rope = rope.fill({ x: 0, y: 0 }, 0);
  let rope_directions: Array<Direction | undefined> = [];
  rope_directions.length = 10;
  rope_directions = rope_directions.fill(undefined, 0);
  let visited_positions = new Set<Location>();
  visited_positions.add(tail_position);

  for (let move of moves) {
    // move the head
    if (move === "UP") head_position.y += 1;
    else if (move === "DOWN") head_position.y -= 1;
    else if (move === "LEFT") head_position.x -= 1;
    else if (move === "RIGHT") head_position.x += 1;
    rope[0] = head_position;
    rope_directions[0] = move;

    for (let i = 1; i < rope.length; ++i) {
      // if current node and prev node are touching, skip
      if (are_nodes_touching(rope[i - 1], rope[i])) {
        continue;
      }

      // check if tail is touching head
      let new_rope_node_position: Location | undefined = undefined;
      if (rope_directions[i - 1] === "UP") {
        new_rope_node_position = { ...rope[i], y: rope[i].y + 1 };
        rope_directions[i] = 'UP';
      } else if (rope_directions[i - 1] === "DOWN") {
        new_rope_node_position = { ...rope[i], y: rope[i].y - 1 };
        rope_directions[i] = 'DOWN';
      } else if (rope_directions[i - 1] === "LEFT") {
        new_rope_node_position = { ...rope[i], x: rope[i].x - 1 };
        rope_directions[i] = 'LEFT';
      } else if (rope_directions[i - 1] == "RIGHT") {
        new_rope_node_position = { ...rope[i], x: rope[i].x + 1 };
        rope_directions[i] = 'RIGHT';
      } else {
        rope_directions[i] = undefined;
      }

      if (new_rope_node_position) {
        rope[i] = new_rope_node_position;
        visited_positions.add(new_rope_node_position);
      }
    }
  }

    console.log(visited_positions)

  return visited_positions.size;
}
