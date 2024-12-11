import { Routes } from '@angular/router';
import { authGuard } from './auth/auth.gaurd';
import { fetchRecipesResolver } from './shared/data-storage.service';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/recipes',
    pathMatch: 'full',
  },
  {
    path: 'recipes',
    loadChildren: () =>
      import('./recipes/recipes.routes').then((m) => m.recipesRoutes),
    resolve: { voidAction: fetchRecipesResolver },
    canActivate: [authGuard],
  },
  {
    path: 'shopping-list',
    loadChildren: () =>
      import('./shopping-list/shopping-list.routes').then(
        (m) => m.shoppingListRoutes
      ),
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.routes').then((m) => m.authRoutes),
  },
];
