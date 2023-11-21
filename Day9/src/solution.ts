type Direction = "UP" | "DOWN" | "LEFT" | "RIGHT";
type Location = {
  x: number;
  y: number;
};

function are_nodes_overlapping(
  node_location: Location,
  other_node_location: Location
): boolean {
  return (
    node_location.x === other_node_location.x &&
    node_location.y === other_node_location.y
  );
}

function are_nodes_next_to_each_other(
  node_location: Location,
  other_node_location: Location
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
  other_node_location: Location
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
  other_node_location: Location
): boolean {
  return (
    are_nodes_next_to_each_other(node_location, other_node_location) ||
    are_nodes_touching_diagonal(node_location, other_node_location) ||
    are_nodes_overlapping(node_location, other_node_location)
  );
}

function move_node(
  node_location: Location,
  other_node_location: Location
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
        are_nodes_next_to_each_other(node_location, new_other_node_location)
      ) {
        closest_new_other_node_location = new_other_node_location;
      }
    }
  }

  if (closest_new_other_node_location === undefined) {
    for (let x = -1; x <= 1; ++x) {
      for (let y = -1; y <= 1; ++y) {
        let new_other_node_location = {
          x: other_node_location.x + x,
          y: other_node_location.y + y,
        };
        if (
          are_nodes_touching_diagonal(node_location, new_other_node_location)
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
  let visited_positions = new Set<string>();
  visited_positions.add(JSON.stringify(tail_position));

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
    let new_tail_position: Location | undefined = move_node(
      head_position,
      tail_position
    );

    if (new_tail_position) {
      tail_position = new_tail_position;
      visited_positions.add(JSON.stringify(new_tail_position));
    }
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

  let rope: Location[] = [];
  rope.length = 10;

  // fill rope
  for (let i = 0; i < rope.length; ++i) {
    rope[i] = { x: 0, y: 0 };
  }

  let visited_positions = new Set<string>();
  visited_positions.add(JSON.stringify({ x: 0, y: 0 }));

  for (let move of moves) {
    // move the head
    if (move === "UP") rope[0].y += 1;
    else if (move === "DOWN") rope[0].y -= 1;
    else if (move === "LEFT") rope[0].x -= 1;
    else if (move === "RIGHT") rope[0].x += 1;

    for (let i = 1; i < rope.length; ++i) {
      // if current node and prev node are touching, skip
      if (are_nodes_touching(rope[i - 1], rope[i])) {
        continue;
      }

      // check if tail is touching head
      let new_rope_node_position: Location | undefined = move_node(
        rope[i - 1],
        rope[i]
      );

      if (new_rope_node_position) {
        rope[i] = new_rope_node_position;

        // if last node because we only want to know the visited positions of the tail,
        // add to visited
        if (i === rope.length - 1) {
          visited_positions.add(JSON.stringify(new_rope_node_position));
        }
      }
    }
  }

  return visited_positions.size;
}
