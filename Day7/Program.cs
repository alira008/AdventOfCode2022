using System.Collections.Generic;

enum FileTreeNode
{
    Directory,
    File
}

class Directory
{
    public FileTreeNode NodeType { get; set; }
    public string Name { get; set; }
    public long Size { get; set; }
    public List<Directory> SubDirectory { get; set; }
    public Directory? ParentDirectory { get; set; }

    public Directory()
    {
        SubDirectory = new();
        ParentDirectory = null;
    }
}

class Program
{
    public static void Main()
    {
        var directoryTree = ParseInput("input_one.txt");

        var totalSize = FindSumOfTotalDirectoriesWithLimit(100_000, directoryTree);

        Console.WriteLine(totalSize);
    }

    static long FindSumOfTotalDirectoriesWithLimit(long limit, Directory dir)
    {
        if (dir.SubDirectory.Count == 0)
        {
            if (dir.NodeType == FileTreeNode.File)
            {
                // Console.WriteLine("File {0}: {1}", dir.Name, dir.Size);
            }
            return dir.Size;
        }

        long highestSize = 0;
        long highestIndividualSize = 0;
        long totalSize = 0;
        for (int i = 0; i < dir.SubDirectory.Count; ++i)
        {
            long size = FindSumOfTotalDirectoriesWithLimit(limit, dir.SubDirectory[i]);
            totalSize += size;
            if (dir.SubDirectory[i].NodeType == FileTreeNode.Directory)
            {
                totalSize += size;
            }

            if (size > highestIndividualSize && size <= limit)
            {
                highestIndividualSize = size;
                Console.WriteLine("INDV Directory: {0}, After loop: {1}", dir.Name, size);
                // Console.WriteLine("Check indv: {0}, tot: {1}", highestIndividualSize, highestSize);
            }
        }
        if (totalSize > highestSize && totalSize <= limit)
        {
            Console.WriteLine("Directory: {0}, After loop: {1}", dir.Name, totalSize);
            highestSize = totalSize;
        }

        return highestSize < highestIndividualSize ? highestIndividualSize : highestSize;
    }

    static Directory ParseInput(string fileName)
    {
        var lines = ReadFile(fileName);

        var topLevelDirectory = new Directory();
        var currentDirectory = topLevelDirectory;
        foreach (var line in lines)
        {
            var tokens = line.Split(" ");
            if (tokens.Length == 3 && tokens[0] == "$" && tokens[1] == "cd" && tokens[2] == "..")
            {
                if (currentDirectory.ParentDirectory is not null)
                {
                    currentDirectory = currentDirectory.ParentDirectory;
                }
            }
            else if (tokens.Length == 3 && tokens[0] == "$" && tokens[1] == "cd")
            {
                var newDirectory = new Directory();
                newDirectory.NodeType = FileTreeNode.Directory;
                newDirectory.Name = tokens[2];
                if (newDirectory.Name == "/")
                {
                    topLevelDirectory = newDirectory;
                }
                else
                {
                    newDirectory.ParentDirectory = currentDirectory;
                    currentDirectory.SubDirectory.Add(newDirectory);
                }
                currentDirectory = newDirectory;
            }
            else if (tokens.Length == 2 && IsTokenNumber(tokens[0], out var number))
            {
                var newDirectory = new Directory();
                newDirectory.ParentDirectory = currentDirectory;
                newDirectory.NodeType = FileTreeNode.File;
                newDirectory.Name = tokens[1];
                newDirectory.Size = number;
                currentDirectory.SubDirectory.Add(newDirectory);

                // loop through parent directories and increment size
                var currentParentDirectory = currentDirectory;
                while (currentParentDirectory is not null)
                {
                    if (currentParentDirectory.NodeType == FileTreeNode.Directory)
                    {
                        currentParentDirectory.Size += number;
                    }
                    currentParentDirectory = currentParentDirectory.ParentDirectory;
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
