using Domino.Application.Strategies;

namespace Domino.AITournament.Helpers;

public class NLHSampler
{
    private readonly Random _random = new();
    private readonly int _sampleSize = 1000;
    private readonly int _parameterCount = 10;
    private readonly double _parameterRange = 9.0;
    public NLHSampler(int sampleSize = 1000, int parameterCount = 10, double parameterRange = 9.0)
    {
        _sampleSize = sampleSize;
        _parameterCount = parameterCount;
        _parameterRange = parameterRange;
    }
    public List<StrategyCoefficients> GenerateSamples()
    {
        List<StrategyCoefficients> combinations = new();

        double[][] intervals = new double[_parameterCount][];
        for (int i = 0; i < _parameterCount; i++)
        {
            intervals[i] = new double[_sampleSize];
            for (int j = 0; j < _sampleSize; j++)
            {
                intervals[i][j] = (j + _random.NextDouble()) / _sampleSize * _parameterRange;
            }
            // Shuffle to ensure randomness
            Shuffle(intervals[i]);
        }

        // Step 2: Normalize and assign intervals to samples
        for (int i = 0; i < _sampleSize; i++)
        {
            double[] sample = new double[_parameterCount];
            double sum = 0;

            for (int j = 0; j < _parameterCount; j++)
            {
                sample[j] = intervals[j][i];
                sum += sample[j];
            }

            // Normalize so that sum of coefficients remains relative
            for (int j = 0; j < _parameterCount; j++)
            {
                sample[j] = sample[j] / sum * _parameterRange;
            }

            combinations.Add(new StrategyCoefficients
            {
                RandomnessCoef = 0,
                MyHandCoeff = sample[0],
                OpponentHandCoeff = sample[1],
                OpponentPossibleHandCoeff = sample[2],
                LeaveOfficerCoeff = sample[3],
                DontKeepDoublesCoeff = sample[4],
                GetRidOfPointsCoeff = sample[5],
                CutOpponentDoubleCoeff = sample[6],
                PlaySafeCoeff = sample[7],
                ProtectWeaknessCoeff = sample[8],
                NotBeatOwnEdgeCoeff = sample[9]
            });
        }

        return combinations;
    }

    private void Shuffle(double[] array)
    {
        for (int i = array.Length - 1; i > 0; i--)
        {
            int j = _random.Next(i + 1);
            (array[i], array[j]) = (array[j], array[i]);
        }
    }
}
