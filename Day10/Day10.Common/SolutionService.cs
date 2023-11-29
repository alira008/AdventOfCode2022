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
}
