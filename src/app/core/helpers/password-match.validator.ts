    import { AbstractControl, ValidatorFn } from '@angular/forms';

    export function passwordMatchValidator(): ValidatorFn {
      return (control: AbstractControl): { [key: string]: any } | null => {
        const password = control.get('password')?.value;
        const confirmPassword = control.get('repeat_password')?.value;
    
        if (!password || !confirmPassword) {
           return null;  
         }

        if (password !== confirmPassword) {
            control.get('repeat_password')?.setErrors({ passwordsNotMatch: true });
        }
        return null;
      };
    }