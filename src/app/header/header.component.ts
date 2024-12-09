import { Component, computed, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { DataStorageService } from '../shared/data-storage.service';
import { DropdownDirective } from '../shared/dropdown.directive';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [DropdownDirective, RouterLink, RouterLinkActive],
  templateUrl: 'header.component.html',
})
export class HeaderComponent {
  dataStorageService = inject(DataStorageService);
  authService = inject(AuthService);

  authUser = computed(() => this.authService.user());

  get isLoggedIn() {
    return this.authUser() != null;
  }

  saveData() {
    this.dataStorageService.saveRecipes();
  }

  fetchData() {
    this.dataStorageService.fetchRecipes();
  }

  logOut() {
    this.authService.logOut();
  }
}
