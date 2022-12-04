from math import floor

EXAMPLE = 'example.txt'
INPUT_ONE = 'input_one.txt'
INPUT_TWO = 'input_two.txt'


def read_file(filename):
    #   Open and read lines
    with open(filename, mode='r') as f:
        rucksacks = [line.strip() for line in f.readlines()]

    return rucksacks


def get_compartments(rucksack: str):
    middle = floor(len(rucksack) / 2)
    return (rucksack[:middle], rucksack[middle:])


def find_same_char(str1: str, str2: str):
    s1 = set(str1)
    s2 = set(str2)

    return s1.intersection(s2).pop()


def find_same_char_three_strings(str1: str, str2: str, str3: str):
    s1 = set(str1)
    s2 = set(str2)
    s3 = set(str3)

    return s1.intersection(s2, s3).pop()


def get_priority(char: str):
    if char.islower():
        return ord(char) - 96

    return ord(char) - 38


def puzzle_one():
    rucksacks = read_file(EXAMPLE)

    sum_of_priorities = 0

    for rucksack in rucksacks:
        compartment_one, compartment_two = get_compartments(rucksack)
        same_char = find_same_char(compartment_one, compartment_two)
        char_priority = get_priority(same_char)
        sum_of_priorities += char_priority

    print(sum_of_priorities)


def puzzle_two():
    rucksacks = read_file(INPUT_TWO)

    sum_of_priorities = 0

    for i in range(0, len(rucksacks), 3):
        elf_one = rucksacks[i]
        elf_two = rucksacks[i+1]
        elf_three = rucksacks[i+2]

        same_char = find_same_char_three_strings(elf_one, elf_two, elf_three)
        char_priority = get_priority(same_char)
        sum_of_priorities += char_priority

    print(sum_of_priorities)


def main():
    # puzzle_one()

    puzzle_two()


if __name__ == '__main__':
    main()
