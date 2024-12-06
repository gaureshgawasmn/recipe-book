import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
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

  saveData() {
    this.dataStorageService.saveRecipes();
  }

  fetchData() {
    this.dataStorageService.fetchRecipes();
  }
}
