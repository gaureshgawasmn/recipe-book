import { inject } from '@angular/core';
import { CanDeactivateFn, RedirectCommand, Router } from '@angular/router';
import { AuthService } from './auth.service';

export const authGuard: CanDeactivateFn<any> = () => {
  const authService = inject(AuthService);
  if (authService.user()?.token) {
    return true;
  }
  const router = inject(Router);
  const loginPath = router.parseUrl('/auth');
  return new RedirectCommand(loginPath);
};
