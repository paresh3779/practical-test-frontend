 import { AbstractControl, ValidationErrors } from '@angular/forms';
 import { Patterns } from '../constants';

   export function phoneValidator(control: AbstractControl): ValidationErrors | null {
     const value = control.value;
     if(!value){
        return null;
     }
    const patternRegex = new RegExp(Patterns.phonePattern);
    if (!patternRegex.test(control.value)) {
        return {invalidPhone:true};
    }
     return null;
   }