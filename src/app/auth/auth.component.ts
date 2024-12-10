import { Component, inject, OnDestroy, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AlertComponent } from '../shared/alert/alert/alert.component';
import { LoadingSpinnerComponent } from '../shared/loading-spinner/loading-spinner.component';
import { PlaceHolderDirective } from '../shared/place-holder/place-holder.directive';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [FormsModule, LoadingSpinnerComponent, PlaceHolderDirective],
  templateUrl: './auth.component.html',
})
export class AuthComponent implements OnDestroy {
  isLoginMode = true;
  isLoading = false;
  closeSub: Subscription | undefined;
  @ViewChild(PlaceHolderDirective)
  alertHost!: PlaceHolderDirective;

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
        this.showError(error.message);
        this.isLoading = false;
      },
    });

    authForm.reset();
  }

  private showError(message: string) {
    const hostViewContainerRef = this.alertHost.viewContainerRef;
    hostViewContainerRef.clear();

    const alertComponentRef =
      hostViewContainerRef.createComponent(AlertComponent);
    alertComponentRef.instance.message = message;

    this.closeSub = alertComponentRef.instance.close.subscribe(() => {
      hostViewContainerRef.clear();
      this.closeSub?.unsubscribe();
    });
  }

  ngOnDestroy(): void {
    this.closeSub?.unsubscribe();
  }
}
