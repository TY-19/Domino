import { AsyncValidatorFn, FormControl, ValidatorFn } from '@angular/forms';

export class RangeFormControl extends FormControl {
  constructor(
    initialValue: number,
    private min: number = 0,
    private max: number = 999,
    validators?: ValidatorFn | ValidatorFn[] | null,
    asyncValidators?: AsyncValidatorFn | AsyncValidatorFn[] | null
  ) {
    super(initialValue, validators, asyncValidators);
  }

  override setValue(value: any, options?: any) {
    if (typeof value === 'number') {
      value = Math.min(this.max, Math.max(this.min, value));
    }
    super.setValue(value, options);
  }
}
