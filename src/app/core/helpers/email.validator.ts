 import { AbstractControl, ValidationErrors } from '@angular/forms';
 import { Patterns } from '../constants';

   export function emailValidator(control: AbstractControl): ValidationErrors | null {
     const value = control.value;
     if(!value){
        return null;
     }
    const patternRegex = new RegExp(Patterns.emailPattern);
    if (!patternRegex.test(control.value)) {
        return {invalidEmail:true};
    }
     return null;
   }