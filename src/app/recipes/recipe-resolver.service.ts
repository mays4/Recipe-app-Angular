import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';

import { DataStorageService } from '../shared/data-storge.service';
import { Recipe } from './recipe.model';
import { RecipeService } from './recipe.service';
import * as RecipeActions from './store/recipe.actions';
import * as fromApp from '../store/app.reducer';
import { Store } from '@ngrx/store';
import { Actions, ofType, Effect, createEffect } from '@ngrx/effects';
import { map, of, switchMap, take } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RecipeResolverService implements Resolve<Recipe[]> {
  constructor(

    private store: Store<fromApp.AppState>,
    private actions$: Actions
  ) {}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    // const recipes = this.recipeService.getRecipe();
    // if (recipes.length === 0) {
    //   return this.dataStorgaService.fetchRecipe();
    // } else {
    //   return recipes;
    // }

    return this.store.select('recipes').pipe(
      take(1),
      map(recipeState => {
        return recipeState.recipes;
      }),
      switchMap(recipes => {
        if (recipes.length === 0) {
          this.store.dispatch(new RecipeActions.FetchRecipes());
          return this.actions$.pipe(ofType(RecipeActions.SET_RECIPES), take(1));
        } else {
          return of(recipes);
        }
      })
    );
  }
}
