namespace Domino.Application.Strategies;

public class MoveWeight
{
    public double Randomness { get; set; } = new Random().Next(100)/100.0;
    public double MyHand { get; set; }
    public double OpponentHand { get; set; }
    public double OpponentPossibleHand { get; set; }
    public double LeaveOfficer { get; set; }
    public double DontKeepDoubles { get; set; }
    public double GetRidOfPoints { get; set; }
    public double CutOpponentDouble { get; set; }
    public double PlaySafe { get; set; }
    public double ProtectWeakness { get; set; }
    public double NotBeatOwnEdge { get; set; }
    // For logging purposes
    public object SeeWeights(StrategyCoefficients coeffs)
    {
        return new
        {
            Randomness = Randomness * coeffs.RandomnessCoef,
            MyHand = MyHand * coeffs.MyHandCoeff,
            OpponentHand = OpponentHand * coeffs.OpponentHandCoeff,
            OpponentPossibleHand = OpponentPossibleHand * coeffs.OpponentPossibleHandCoeff,
            LeaveOfficer = LeaveOfficer * coeffs.LeaveOfficerCoeff,
            DontKeepDoubles = DontKeepDoubles * coeffs.DontKeepDoublesCoeff,
            GetRidOfPoints = GetRidOfPoints * coeffs.GetRidOfPointsCoeff,
            CutOpponentDouble = CutOpponentDouble * coeffs.CutOpponentDoubleCoeff,
            PlaySafe = PlaySafe * coeffs.PlaySafeCoeff,
            ProtectWeakness = ProtectWeakness * coeffs.ProtectWeaknessCoeff,
            NotBeatOwnEdge = NotBeatOwnEdge * coeffs.NotBeatOwnEdgeCoeff
        };
    }
    public double CalculateWeight(StrategyCoefficients coeffs)
    {
        return Randomness * coeffs.RandomnessCoef
            + MyHand * coeffs.MyHandCoeff
            + OpponentHand * coeffs.OpponentHandCoeff
            + OpponentPossibleHand * coeffs.OpponentPossibleHandCoeff
            + LeaveOfficer * coeffs.LeaveOfficerCoeff
            + DontKeepDoubles * coeffs.DontKeepDoublesCoeff
            + GetRidOfPoints * coeffs.GetRidOfPointsCoeff
            + CutOpponentDouble * coeffs.CutOpponentDoubleCoeff
            + PlaySafe * coeffs.PlaySafeCoeff
            + ProtectWeakness * coeffs.ProtectWeaknessCoeff
            + NotBeatOwnEdge * coeffs.NotBeatOwnEdgeCoeff;
    }
}
