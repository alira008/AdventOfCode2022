from math import floor

EXAMPLE = 'example.txt'
INPUT_ONE = 'input_one.txt'
INPUT_TWO = 'input_two.txt'


def read_file(filename):
    #   Open and read lines
    with open(filename, mode='r') as f:
        pairs = [line.strip().split(',') for line in f.readlines()]

    return pairs


def convert_to_set(string: str):
    [s1, s2] = string.split('-')
    num1, num2 = int(s1), int(s2)
    nums = {num1} if num1 == num2 else set(range(num1, num2+1))

    return nums


def puzzle_one():
    pairs = read_file(INPUT_ONE)

    num_pairs = 0
    for pair in pairs:
        [p1, p2] = pair
        set1, set2 = convert_to_set(p1), convert_to_set(p2)

        if set1.issubset(set2) or set2.issubset(set1):
            num_pairs += 1

    print(num_pairs)


def puzzle_two():
    pairs = read_file(INPUT_TWO)

    num_pairs = 0
    for pair in pairs:
        [p1, p2] = pair
        set1, set2 = convert_to_set(p1), convert_to_set(p2)

        if len(set1.intersection(set2)) > 0:
            num_pairs += 1

    print(num_pairs)


def main():
    # puzzle_one()

    puzzle_two()


if __name__ == '__main__':
    main()
