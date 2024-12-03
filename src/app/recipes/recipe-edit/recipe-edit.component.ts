import { Component, input } from '@angular/core';

@Component({
  selector: 'app-recipe-edit',
  standalone: true,
  imports: [],
  templateUrl: './recipe-edit.component.html',
  styleUrl: './recipe-edit.component.css',
})
export class RecipeEditComponent {
  id = input<string>();
  editMode = false;
  ngOnInit() {
    this.editMode = this.id() != undefined;
    console.log('We are in edit mode ' + this.editMode);
  }
}
