type Direction = "UP" | "DOWN" | "LEFT" | "RIGHT";
type Location = {
  x: number;
  y: number;
};

type Node = {
  location: Location;
  next: Node | null;
};

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
  let tail_position = head_position;
  let visited_positions = new Set<Location>();
  visited_positions.add(tail_position);

  for (let move of moves) {
    // move the head
    if (move === "UP") head_position.y += 1;
    else if (move === "DOWN") head_position.y -= 1;
    else if (move === "LEFT") head_position.x -= 1;
    else if (move === "RIGHT") head_position.x += 1;

    // check if tail is touching head
    // if not then move the tail
  }
  return 21;
}
