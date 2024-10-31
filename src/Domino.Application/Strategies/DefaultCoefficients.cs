using Domino.Domain.Entities;

namespace Domino.Application.Strategies;

public class DefaultCoefficients
{
    private readonly Random _random = new();
    public List<StrategyCoefficients> Coefficients =
    [
        new() {
            RandomnessCoef = 0,
            MyHandCoeff = 0.8435298562782451,
            OpponentHandCoeff = 0.9022328666653052,
            OpponentPossibleHandCoeff = 1.247106901945839,
            LeaveOfficerCoeff = 1.2610608637410472,
            DontKeepDoublesCoeff = 0.2858132019617241,
            GetRidOfPointsCoeff = 1.3102845411949524,
            CutOpponentDoubleCoeff = 1.011802292510455,
            PlaySafeCoeff = 1.0965451207735275,
            ProtectWeaknessCoeff = 0.5482562625654255,
            NotBeatOwnEdgeCoeff = 0.4933680923634786
        },
        new() {
            RandomnessCoef = 0,
            MyHandCoeff = 1.5386778354788873,
            OpponentHandCoeff = 0.9741041629773922,
            OpponentPossibleHandCoeff = 0.596298811620739,
            LeaveOfficerCoeff = 0.8629058767251268,
            DontKeepDoublesCoeff = 1.3155681515735838,
            GetRidOfPointsCoeff = 0.48915521802687717,
            CutOpponentDoubleCoeff = 0.24279533371449244,
            PlaySafeCoeff = 0.9244662964951722,
            ProtectWeaknessCoeff = 0.9286618868026945,
            NotBeatOwnEdgeCoeff = 1.1273664265850352
        },
        new() {
            RandomnessCoef = 0,
            MyHandCoeff = 1.4938854502827799,
            OpponentHandCoeff = 0.7666915050215233,
            OpponentPossibleHandCoeff = 1.3582511695566108,
            LeaveOfficerCoeff = 0.919084837969396,
            DontKeepDoublesCoeff = 0.6659052135112498,
            GetRidOfPointsCoeff = 0.8126788429932158,
            CutOpponentDoubleCoeff = 1.1694743920550257,
            PlaySafeCoeff = 0.4113750001802601,
            ProtectWeaknessCoeff = 0.700487181738843,
            NotBeatOwnEdgeCoeff = 0.7021664066910942
        },
        new() {
            RandomnessCoef = 0,
            MyHandCoeff = 1.1139991218526204,
            OpponentHandCoeff = 0.7915238659992647,
            OpponentPossibleHandCoeff = 1.2030172110275965,
            LeaveOfficerCoeff = 0.8578293106973198,
            DontKeepDoublesCoeff = 0.7075125032426932,
            GetRidOfPointsCoeff = 0.23178440609703765,
            CutOpponentDoubleCoeff = 1.3149344003003594,
            PlaySafeCoeff = 0.38464722881123126,
            ProtectWeaknessCoeff = 1.1138211368582072,
            NotBeatOwnEdgeCoeff = 1.2809308151136702
        },
        new() {
            RandomnessCoef = 0,
            MyHandCoeff = 1.4588712647577518,
            OpponentHandCoeff = 0.41923745996689304,
            OpponentPossibleHandCoeff = 0.8648140262460856,
            LeaveOfficerCoeff = 1.159606133018302,
            DontKeepDoublesCoeff = 0.06461556936334494,
            GetRidOfPointsCoeff = 1.0338356230324286,
            CutOpponentDoubleCoeff = 1.4128885399742703,
            PlaySafeCoeff = 0.008814950724220751,
            ProtectWeaknessCoeff = 0.7710894304960366,
            NotBeatOwnEdgeCoeff = 1.8062270024206677
        },
        new() {
            RandomnessCoef = 0,
            MyHandCoeff = 0.9740013864441693,
            OpponentHandCoeff = 0.9933149332798719,
            OpponentPossibleHandCoeff = 1.0931494212511808,
            LeaveOfficerCoeff = 0.5070553491502859,
            DontKeepDoublesCoeff = 0.5569619812919914,
            GetRidOfPointsCoeff = 1.4043912790317001,
            CutOpponentDoubleCoeff = 0.5753426699302587,
            PlaySafeCoeff = 1.6708270408782273,
            ProtectWeaknessCoeff = 0.06853416893766874,
            NotBeatOwnEdgeCoeff = 1.1564217698046466
        },
        new() {
            RandomnessCoef = 0,
            MyHandCoeff = 1.4077420906179208,
            OpponentHandCoeff = 1.7447869568284733,
            OpponentPossibleHandCoeff = 0.2831913995888811,
            LeaveOfficerCoeff = 0.6747023614683734,
            DontKeepDoublesCoeff = 0.4724038026401182,
            GetRidOfPointsCoeff = 1.4146998067703325,
            CutOpponentDoubleCoeff = 0.8802945137172864,
            PlaySafeCoeff = 0.05314166411569729,
            ProtectWeaknessCoeff = 0.8835669345043345,
            NotBeatOwnEdgeCoeff = 1.185470469748581
        }
    ];
    public StrategyCoefficients GetOneOfDefaultCoefficients()
    {
        var index = _random.Next(0, Coefficients.Count);
        return Coefficients[index];
    }
}
