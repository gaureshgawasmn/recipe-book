import { Injectable, signal } from '@angular/core';
import { Recipe } from './recipe.model';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  private readonly recipesP = signal<Recipe[]>([]);
  // private readonly recipesP = signal([
  //   {
  //     name: 'Spaghetti Bolognese',
  //     description: 'A classic Italian pasta dish with a rich meat sauce.',
  //     imgPath:
  //       'https://t4.ftcdn.net/jpg/02/40/99/19/360_F_240991913_c22j6WvLgpqiUvjaLiLc5rh14WO8jShB.jpg',
  //     ingredients: [
  //       { name: 'Spaghetti', amount: 200 },
  //       { name: 'Ground Beef', amount: 300 },
  //       { name: 'Tomato Sauce', amount: 400 },
  //       { name: 'Onion', amount: 1 },
  //       { name: 'Garlic', amount: 2 },
  //       { name: 'Olive Oil', amount: 2 },
  //       { name: 'Parmesan Cheese', amount: 50 },
  //     ],
  //   },
  //   {
  //     name: 'Chicken Caesar Salad',
  //     description:
  //       'A refreshing salad with grilled chicken and Caesar dressing.',
  //     imgPath:
  //       'https://i0.wp.com/smittenkitchen.com/wp-content/uploads/2008/01/chicken-caesar-salad-1-scaled.jpg?fit=1200%2C800&ssl=1',
  //     ingredients: [
  //       { name: 'Chicken Breast', amount: 2 },
  //       { name: 'Romaine Lettuce', amount: 150 },
  //       { name: 'Caesar Dressing', amount: 50 },
  //       { name: 'Croutons', amount: 30 },
  //       { name: 'Parmesan Cheese', amount: 30 },
  //       { name: 'Lemon', amount: 1 },
  //     ],
  //   },
  //   {
  //     name: 'Vegetable Stir-fry',
  //     description: 'A healthy and colorful mix of stir-fried vegetables.',
  //     imgPath:
  //       'https://st2.depositphotos.com/1000589/10112/i/450/depositphotos_101121174-stock-photo-vegetable-stir-fry-in-a.jpg',
  //     ingredients: [
  //       { name: 'Broccoli', amount: 100 },
  //       { name: 'Carrots', amount: 100 },
  //       { name: 'Bell Peppers', amount: 2 },
  //       { name: 'Soy Sauce', amount: 30 },
  //       { name: 'Sesame Oil', amount: 10 },
  //       { name: 'Ginger', amount: 10 },
  //       { name: 'Garlic', amount: 2 },
  //     ],
  //   },
  //   {
  //     name: 'Pancakes',
  //     description: 'Fluffy and light pancakes served with syrup.',
  //     imgPath:
  //       'https://media.istockphoto.com/id/96430985/photo/pancakes.jpg?s=612x612&w=0&k=20&c=jB8amkXMUpobVZh9vlx1qJb-qk2oz-jZJIbH0O3wLO4=',
  //     ingredients: [
  //       { name: 'Flour', amount: 200 },
  //       { name: 'Eggs', amount: 2 },
  //       { name: 'Milk', amount: 300 },
  //       { name: 'Baking Powder', amount: 5 },
  //       { name: 'Sugar', amount: 50 },
  //       { name: 'Butter', amount: 30 },
  //       { name: 'Maple Syrup', amount: 100 },
  //     ],
  //   },
  //   {
  //     name: 'Margarita Pizza',
  //     description:
  //       'A simple yet delicious pizza with fresh tomatoes, mozzarella, and basil.',
  //     imgPath:
  //       'https://media.istockphoto.com/id/686957124/photo/pizza-margherita.jpg?s=612x612&w=0&k=20&c=STQALvMIjcgXPIvpXXUXItAl05QtbmEUQ_PfwSato48=',
  //     ingredients: [
  //       { name: 'Pizza Dough', amount: 1 },
  //       { name: 'Tomato Sauce', amount: 100 },
  //       { name: 'Mozzarella Cheese', amount: 200 },
  //       { name: 'Fresh Basil', amount: 10 },
  //       { name: 'Olive Oil', amount: 10 },
  //       { name: 'Salt', amount: 2 },
  //     ],
  //   },
  // ]);

  get recipes() {
    return this.recipesP.asReadonly();
  }

  setRecipes(recipes: Recipe[]) {
    this.recipesP.set(recipes);
  }

  getRecipe(index: number) {
    return this.recipesP()[index];
  }

  addRecipe(recipe: Recipe) {
    this.recipesP().push(recipe);
  }

  update(index: number, recipe: Recipe) {
    this.recipesP()[index] = recipe;
  }

  delete(index: number) {
    this.recipesP().splice(index, 1);
  }
}
