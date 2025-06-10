import { AbstractControl, ValidationErrors } from '@angular/forms';
import { Patterns } from '../constants';

export function passwordValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (!value) {
        return null;
    }

    if (control.value.length < 8) {
        return { minlength: true };
    } else {
        const patternRegex = new RegExp(Patterns.passwordPattern);
        if (!patternRegex.test(control.value)) {
            return { invalidPassword: true };
        }
    }

    return null;
}