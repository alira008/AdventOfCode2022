from enum import Enum

EXAMPLE_GUIDE = 'example_guide.txt'
PUZZLE_ONE_GUIDE = 'puzzle_one_guide.txt'
PUZZLE_TWO_GUIDE = 'puzzle_two_guide.txt'


class HandPoints(Enum):
    ROCK = 1,
    PAPER = 2,
    SCISSORS = 3,


class GameOutcome(Enum):
    WIN = 6,
    DRAW = 3,
    LOSS = 0,


WINNING_MOVES = {'A': 'Y', 'B': 'Z', 'C': 'X'}
DRAW_MOVES = {'A': 'X', 'B': 'Y', 'C': 'Z'}
LOSING_MOVES = {'A': 'Z', 'B': 'X', 'C': 'Y'}
MY_HAND_POINTS = {"X": HandPoints.ROCK,
                  "Y": HandPoints.PAPER, "Z": HandPoints.SCISSORS}


def read_file(filename):
    #   Open and read lines
    with open(filename, mode='r') as f:
        lines = [line.strip().split() for line in f.readlines()]

    return lines


def puzzle_one():
    strategy_guide = read_file(EXAMPLE_GUIDE)

    points = 0
    for [opponent_hand, my_hand] in strategy_guide:
        points += MY_HAND_POINTS[my_hand].value[0]

        if DRAW_MOVES[opponent_hand] == my_hand:
            points += GameOutcome.DRAW.value[0]
        elif LOSING_MOVES[opponent_hand] == my_hand:
            points += GameOutcome.LOSS.value[0]
        elif WINNING_MOVES[opponent_hand] == my_hand:
            points += GameOutcome.WIN.value[0]

    print(points)


def puzzle_two():
    strategy_guide = read_file(EXAMPLE_GUIDE)

    points = 0
    for [opponent_hand, my_hand] in strategy_guide:
        if my_hand == 'X':
            hand = LOSING_MOVES[opponent_hand]
            points += MY_HAND_POINTS[hand].value[0] + \
                GameOutcome.LOSS.value[0]
        elif my_hand == 'Y':
            hand = DRAW_MOVES[opponent_hand]
            points += MY_HAND_POINTS[hand].value[0] + \
                GameOutcome.DRAW.value[0]
        elif my_hand == 'Z':
            hand = WINNING_MOVES[opponent_hand]
            points += MY_HAND_POINTS[hand].value[0] + \
                GameOutcome.WIN.value[0]

    print(points)


def main():
    puzzle_one()

    puzzle_two()


if __name__ == '__main__':
    main()
