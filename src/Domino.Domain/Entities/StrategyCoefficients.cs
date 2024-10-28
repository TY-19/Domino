namespace Domino.Domain.Entities;

public class StrategyCoefficients
{
    public double RandomnessCoef { get; set; } = 1;
    public double MyHandCoeff { get; set; } = 5;
    public double OpponentHandCoeff { get; set; } = 5;
    public double OpponentPossibleHandCoeff { get; set; } = 5;
    public double LeaveOfficerCoeff { get; set; } = 1;
    public double DontKeepDoublesCoeff { get; set; } = 10;
    public double GetRidOfPointsCoeff { get; set; } = 0.125;
    public double CutOpponentDoubleCoeff { get; set; } = 3;
    public double PlaySafeCoeff { get; set; } = 1;
    public double ProtectWeaknessCoeff { get; set; } = 1;
    public double NotBeatOwnEdgeCoeff { get; set; } = 1;
}