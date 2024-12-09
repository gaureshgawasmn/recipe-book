import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingSpinnerComponent } from '../shared/loading-spinner/loading-spinner.component';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [FormsModule, LoadingSpinnerComponent],
  templateUrl: './auth.component.html',
})
export class AuthComponent {
  isLoginMode = true;
  isLoading = false;
  error: string | null = null;

  authService = inject(AuthService);
  router = inject(Router);

  switchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(authForm: NgForm) {
    if (authForm.invalid) {
      return;
    }
    this.isLoading = true;
    let authObserve;
    if (this.isLoginMode) {
      authObserve = this.authService.login(
        authForm.value.email,
        authForm.value.password
      );
    } else {
      authObserve = this.authService.signUp(
        authForm.value.email,
        authForm.value.password
      );
    }
    authObserve.subscribe({
      next: (responseData) => {
        console.log(responseData);
        this.router.navigate(['/recipes']);
        this.isLoading = false;
      },
      error: (error: Error) => {
        this.error = error.message;
        this.isLoading = false;
      },
    });

    authForm.reset();
  }
}
