namespace Day10.Common;

public class SolutionService
{
    public int PartOne(string input)
    {
        var lines = input.Split("\n").Select(line => line.Trim()).ToList();

        List<int> cycles = new();

        int register = 1;

        foreach (var line in lines)
        {
            if (line.Contains("noop"))
            {
                cycles.Add(register);
            }
            else if (line.Contains("addx"))
            {
                int num = line.Split(" ")
                    .Where(tok => int.TryParse(tok, out _))
                    .Select(tok => int.Parse(tok))
                    .ToList()
                    .First();

                // two cycles
                cycles.Add(register);

                // register does not change until after second cycle
                cycles.Add(register);
                register += num;
            }
        }

        var signalStrengths = new List<int>();
        var intervalNumber = 0;
        for (var i = 0; i < cycles.Count; ++i)
        {
            if (i == 19 + intervalNumber * 40)
            {
                var signalStrength = cycles[i] * (i + 1);
                signalStrengths.Add(signalStrength);
                ++intervalNumber;
            }
        }
        Console.WriteLine(cycles[218]);

        return signalStrengths.Sum();
    }

    class Location(int x, int y)
    {
        public int X { get; set; } = x;
        public int Y { get; set; } = y;
    }

    class Sprite
    {
        public Location Left { get; set; } = new(0, 0);
        public Location Middle { get; set; } = new(1, 0);
        public Location Right { get; set; } = new(2, 0);
    }

    const int WIDTH = 40;
    const int HEIGHT = 6;

    private void MoveSprite(Sprite sprite, int moveAmount)
    {
        if (sprite.Right.X + moveAmount < WIDTH - 1)
        {
            sprite.Left.X += moveAmount;
            sprite.Middle.X += moveAmount;
            sprite.Right.X += moveAmount;
        }
        else if (sprite.Right.X + moveAmount >= WIDTH - 1)
        {
            sprite.Left.X = WIDTH - 1 - moveAmount;
            sprite.Middle.X = WIDTH - 1 - moveAmount;
            sprite.Right.X = WIDTH - 1 - moveAmount;
            sprite.Left.Y += 1;
            sprite.Middle.Y += 1;
            sprite.Right.Y += 1;
        }
        else if (sprite.Left.X + moveAmount < 0)
        {
            sprite.Left.X = WIDTH - 1 + (moveAmount - sprite.Left.X);
            sprite.Middle.X = WIDTH - 1 + (moveAmount - sprite.Middle.X);
            sprite.Right.X = WIDTH - 1 + (moveAmount - sprite.Right.X);
            sprite.Left.Y += 1;
            sprite.Middle.Y += 1;
            sprite.Right.Y += 1;
        }
    }

    private void PrintChar(ref int i, ref int j, List<List<char>> screen, char c)
    {
        if (i < WIDTH - 2)
        {
            screen[j].Add(c);
            i += 1;
        }
        else if (i >= WIDTH - 2)
        {
            screen[j].Add(c);
            i = 0;
            j += 1;
            screen.Add(new List<char>());
        }
    }

    private void PrintCrt(ref int i, ref int j, List<List<char>> screen, Sprite sprite)
    {
        if (CompareSpriteLocationScreenLocation(i, j, sprite))
        {
            PrintChar(ref i, ref j, screen, '#');
        }
        // if sprite location and screen location are not the same print .
        else
        {
            PrintChar(ref i, ref j, screen, '.');
        }
    }

    private bool CompareSpriteLocationScreenLocation(int i, int j, Sprite sprite)
    {
        return (sprite.Right.X == i && sprite.Right.Y == j)
            || (sprite.Middle.X == i && sprite.Middle.Y == j)
            || (sprite.Left.X == i && sprite.Left.Y == j);
    }

    public List<List<char>> PartTwo(string input)
    {
        var lines = input.Split("\n").Select(line => line.Trim()).ToList();

        Sprite sprite = new();
        List<List<char>> screen = new();
        screen.Add(new List<char>());
        int iHeight = 0,
            jWidth = 0;

        foreach (var line in lines)
        {
            if (line.Contains("noop"))
            {
                // if sprite location and screen location are the same print #
                PrintCrt(ref iHeight, ref jWidth, screen, sprite);
            }
            else if (line.Contains("addx"))
            {
                int num = line.Split(" ")
                    .Where(tok => int.TryParse(tok, out _))
                    .Select(tok => int.Parse(tok))
                    .ToList()
                    .First();

                // two cycles
                // if sprite location and screen location are the same print #
                PrintCrt(ref iHeight, ref jWidth, screen, sprite);

                // does not change until after second cycle
                PrintCrt(ref iHeight, ref jWidth, screen, sprite);
                MoveSprite(sprite, num);
            }
        }

        return screen;
    }
}
