enum NodeType
{
    Directory,
    File
}

class Node
{
    public NodeType NodeType { get; set; }
    public string Name { get; set; }
    public long Size { get; set; }
    public List<Node> Children { get; set; }
    public Node? Parent { get; set; }

    public Node()
    {
        Name = string.Empty;
        Children = new();
        Parent = null;
    }

    public override string ToString()
    {
        System.Text.StringBuilder sb = new(string.Empty);
        foreach (var node in Children)
        {
            sb.Append("\n  " + node.ToString() + " " + node.Size);
        }
        return string.Format("{0}", Name) + sb.ToString();
    }
}

class Program
{
    public static void Main()
    {
        SolvePartOne();
        SolvePartTwo();
    }

    public static void SolvePartOne()
    {
        var directoryTree = ParseInput("input_one.txt");

        var sum = SumSizesWithinLimit(directoryTree, 100_000);

        Console.WriteLine("Sum: {0}", sum);
    }

    public static void SolvePartTwo()
    {
        var directoryTree = ParseInput("input_two.txt");

        var sum = FindSmallestDirectoryToDelete(
            directoryTree,
            30_000_000 - (70_000_000 - directoryTree.Size)
        );

        Console.WriteLine("Sum: {0}", sum);
    }

    static long FindSmallestDirectoryToDelete(Node root, long neededSpace)
    {
        long smallestSize = long.MaxValue;
        Queue<Node> queue = new Queue<Node>();
        queue.Enqueue(root);

        while (queue.Count > 0)
        {
            Node current = queue.Dequeue();
            if (current.NodeType == NodeType.Directory && current.Size >= neededSpace)
            {
                smallestSize = Math.Min(smallestSize, current.Size);
            }

            foreach (var child in current.Children)
            {
                queue.Enqueue(child);
            }
        }
        return smallestSize;
    }

    static long SumSizesWithinLimit(Node root, long limit)
    {
        long sum = 0;
        if (root.NodeType == NodeType.Directory && root.Size <= limit)
        {
            sum += root.Size;
        }

        foreach (var child in root.Children)
        {
            sum += SumSizesWithinLimit(child, limit);
        }
        return sum;
    }

    static Node ParseInput(string fileName)
    {
        var lines = ReadFile(fileName);

        var topLevelDirectory = new Node();
        var currentDirectory = topLevelDirectory;
        foreach (var line in lines)
        {
            var tokens = line.Split(" ");
            if (tokens.Length == 3 && tokens[1] == "cd" && tokens[2] == "..")
            {
                if (currentDirectory.Parent is not null)
                {
                    currentDirectory = currentDirectory.Parent;
                }
            }
            else if (tokens.Length == 3 && tokens[1] == "cd")
            {
                var newDirectory = new Node();
                newDirectory.NodeType = NodeType.Directory;
                newDirectory.Name = tokens[2];
                if (newDirectory.Name == "/")
                {
                    topLevelDirectory = newDirectory;
                }
                else
                {
                    newDirectory.Parent = currentDirectory;
                    currentDirectory.Children.Add(newDirectory);
                }
                currentDirectory = newDirectory;
            }
            else if (tokens.Length == 2 && IsTokenNumber(tokens[0], out var number))
            {
                var newDirectory = new Node();
                newDirectory.Parent = currentDirectory;
                newDirectory.NodeType = NodeType.File;
                newDirectory.Name = tokens[1];
                newDirectory.Size = number;
                currentDirectory.Children.Add(newDirectory);

                // loop through parent directories and increment size
                var currentParentDirectory = currentDirectory;
                while (currentParentDirectory is not null)
                {
                    if (currentParentDirectory.NodeType == NodeType.Directory)
                    {
                        currentParentDirectory.Size += number;
                    }
                    currentParentDirectory = currentParentDirectory.Parent;
                }
            }
        }

        return topLevelDirectory;
    }

    static bool IsTokenNumber(string token, out long number)
    {
        bool isNumber = long.TryParse(token, out var num);
        number = isNumber ? num : 0;

        return isNumber;
    }

    static IEnumerable<string> ReadFile(string filename)
    {
        return System.IO.File.ReadLines(filename);
    }
}
