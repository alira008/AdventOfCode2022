#!/bin/zsh

# Checking if an argument is provided
if [ $# -eq 0 ]; then
    echo "No arguments supplied. Please provide a directory name."
    exit 1
fi

# Directory name from the argument
dir_name=$1

# Create the directory
mkdir -p $dir_name

# Go into the directory
cd $dir_name

# Create a main.py file with a main function
echo "def read_file(filename):" >main.py
echo "  #   Open and read lines" >>main.py
echo "  with open(filename, mode='r') as f:" >>main.py
echo "      pairs = [line.strip().split(',') for line in f.readlines()]" >>main.py
echo "  return pairs" >>main.py
echo "\n" >>main.py
echo "def main():" >>main.py
echo "  print('hello')" >>main.py
echo "\n" >>main.py
echo "if __name__ == '__main__':" >>main.py
echo "  main()" >>main.py

# Create two txt files
touch input_one.txt
touch input_two.txt
touch example.txt

# Go back to the previous directory
cd ..

echo "Directory and files created successfully."
