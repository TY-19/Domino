import { Component } from '@angular/core';
import { LanguageService } from '../_shared/language.service';
import { StrategyCoeffsTranslation } from '../_shared/translations';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RangeFormControl } from '../_shared/rangeFormControl';
import { Router, RouterLink } from '@angular/router';
import { StrategyCoefficients } from '../_models/strategyCoefficients';
import { PlayersService } from '../players-statistics/players.service';

@Component({
  selector: 'Dom-create-opponent',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './create-opponent.component.html',
  styleUrl: './create-opponent.component.scss'
})
export class CreateOpponentComponent {
  form: FormGroup = new FormGroup({
    opponentName: new FormControl("", [Validators.required]),
    randomnessCoef: new RangeFormControl(500, 0, 999, [Validators.required]),
    myHandCoeff: new RangeFormControl(500, 0, 999, [Validators.required]),
    opponentHandCoeff: new RangeFormControl(500, 0, 999, [Validators.required]),
    opponentPossibleHandCoeff: new RangeFormControl(500, 0, 999, [Validators.required]),
    leaveOfficerCoeff: new RangeFormControl(500, 0, 999, [Validators.required]),
    dontKeepDoublesCoeff: new RangeFormControl(500, 0, 999, [Validators.required]),
    getRidOfPointsCoeff: new RangeFormControl(500, 0, 999, [Validators.required]),
    cutOpponentDoubleCoeff: new RangeFormControl(500, 0, 999, [Validators.required]),
    playSafeCoeff: new RangeFormControl(500, 0, 999, [Validators.required]),
    protectWeaknessCoeff: new RangeFormControl(500, 0, 999, [Validators.required]),
    notBeatOwnEdgeCoeff: new RangeFormControl(500, 0, 999, [Validators.required]),
  });
  get names(): StrategyCoeffsTranslation | undefined {
    return this.langugeService.translation?.strategyCoeffs;
  }
  constructor(private playerService: PlayersService,
    private langugeService: LanguageService,
    private router: Router) {

  }

  buildStrategyLineStyle() {
    let total: number = 0;
    for(let coeff in this.form.controls) {
      if(coeff === "opponentName") {
        continue;
      } else {
        total += Number.parseInt((this.form.controls as any)[coeff].value);
      }
    }
    let weights: number[] = [
      this.form.controls['randomnessCoef'].value * 100 / total,
      this.form.controls['myHandCoeff'].value * 100 / total,
      this.form.controls['opponentHandCoeff'].value * 100 / total,
      this.form.controls['opponentPossibleHandCoeff'].value * 100 / total,
      this.form.controls['leaveOfficerCoeff'].value * 100 / total,
      this.form.controls['dontKeepDoublesCoeff'].value * 100 / total,
      this.form.controls['getRidOfPointsCoeff'].value * 100 / total,
      this.form.controls['cutOpponentDoubleCoeff'].value * 100 / total,
      this.form.controls['playSafeCoeff'].value * 100 / total,
      this.form.controls['protectWeaknessCoeff'].value * 100 / total,
      this.form.controls['notBeatOwnEdgeCoeff'].value * 100 / total,
    ];

    let cumulative: number[] = [];
    let point: number = 0;
    for(let i = 0; i < weights.length; i++) {
      point += weights[i];
      cumulative.push(point);
    }
    return `
      background: linear-gradient(
        to right,
        #808080 0%,
        #808080 ${cumulative[0]}%,
        #FF5733 ${cumulative[0]}%,
        #FF5733 ${cumulative[1]}%,
        #3375FF ${cumulative[1]}%,
        #3375FF ${cumulative[2]}%,
        #FFBD33 ${cumulative[2]}%,
        #FFBD33 ${cumulative[3]}%,
        #7533FF ${cumulative[3]}%,
        #7533FF ${cumulative[4]}%,
        #75FF33 ${cumulative[4]}%,
        #75FF33 ${cumulative[5]}%,
        #FF33BD ${cumulative[5]}%,
        #FF33BD ${cumulative[6]}%,
        #266031 ${cumulative[6]}%,
        #266031 ${cumulative[7]}%,
        #BD33FF ${cumulative[7]}%,
        #BD33FF ${cumulative[8]}%,
        #33FFBD ${cumulative[8]}%,
        #33FFBD ${cumulative[9]}%,
        #FF3375 ${cumulative[9]}%,
        #FF3375 100%
    );`
  }
  saveOpponent() {
    if(this.form.valid) {
      let playerName = this.form.controls['opponentName'].value;
      let coeffs: StrategyCoefficients = {
        randomnessCoef: this.form.controls['randomnessCoef'].value,
        myHandCoeff: this.form.controls['myHandCoeff'].value,
        opponentHandCoeff: this.form.controls['opponentHandCoeff'].value,
        opponentPossibleHandCoeff: this.form.controls['opponentPossibleHandCoeff'].value,
        leaveOfficerCoeff: this.form.controls['leaveOfficerCoeff'].value,
        dontKeepDoublesCoeff: this.form.controls['dontKeepDoublesCoeff'].value,
        getRidOfPointsCoeff: this.form.controls['getRidOfPointsCoeff'].value,
        cutOpponentDoubleCoeff: this.form.controls['cutOpponentDoubleCoeff'].value,
        playSafeCoeff: this.form.controls['playSafeCoeff'].value,
        protectWeaknessCoeff: this.form.controls['protectWeaknessCoeff'].value,
        notBeatOwnEdgeCoeff: this.form.controls['notBeatOwnEdgeCoeff'].value,
      }
      this.playerService.createPlayer(playerName, true, coeffs)
        .subscribe(res => {
          console.log(res);
          this.router.navigate(['/']);
        });
    } else {
      
    }
  }
}
