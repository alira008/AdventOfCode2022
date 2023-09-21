string ReadFile(string filename)
{
    return System.IO.File.ReadAllText(filename);
}

void Solve(string filename, int amountOfDistinctChars)
{
    var input = ReadFile(filename);

    for (int i = 0; i < input.Length - 4; ++i)
    {
        System.Collections.Generic.HashSet<char> set = new();

        int j = i;
        var isFound = true;
        for (; j < i + amountOfDistinctChars && j < input.Length; ++j)
        {
            if (!set.Contains(input[j]))
            {
                set.Add(input[j]);
            }
            else
            {
                isFound = false;
                break;
            }
        }
        if (isFound)
        {
            Console.WriteLine(j);
            break;
        }
    }
}

Solve("input_one.txt", 4);

Solve("input_two.txt", 14);
