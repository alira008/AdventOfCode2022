def read_file(filename):
  #   Open and read lines
  with open(filename, mode='r') as f:
      pairs = [line.strip().split(',') for line in f.readlines()]
  return pairs


def main():
  print('hello')


if __name__ == '__main__':
  main()
