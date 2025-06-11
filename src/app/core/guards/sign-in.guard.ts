import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';
import { map, take } from 'rxjs';

export const signInGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  return authService.isAuthenticated$.pipe(
        take(1),
        map((isAuthenticated) => {
          if (isAuthenticated) {
            router.navigate(['./my-account/dashboard']);
            return false;
          }
          return true;
        })
      );
};
