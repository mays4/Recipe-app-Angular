import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { exhaustMap, map, take, tap } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { Recipe } from '../recipes/recipe.model';
import { Store } from "@ngrx/store";
import { RecipeService } from '../recipes/recipe.service';
import * as RecipeActions from '../recipes/store/recipe.actions';
import * as fromApp from '../store/app.reducer'
@Injectable({
  providedIn: 'root',
})
export class DataStorageService {
  constructor(
    private http: HttpClient,
    private recipeService: RecipeService,
    private authService: AuthService,
    private store :Store<fromApp.AppState>
  ) {}
  // storeRecipe() {
  //   const recipes = this.recipeService.getRecipe();
  //   this.http
  //     .put(
  //       'https://recipe-book-15b88-default-rtdb.firebaseio.com/recipes.json',
  //       recipes
  //     )
  //     .subscribe((response) => {
  //       console.log(response);
  //     });
  // }
  // fetchRecipe() {

  //       return this.http.get<Recipe[]>(
  //         'https://recipe-book-15b88-default-rtdb.firebaseio.com/recipes.json',


  //       ).pipe(
  //         map((recipes) => {
  //           return recipes.map((recipe) => {
  //             return {
  //               ...recipe,
  //               ingredients: recipe.ingredients ? recipe.ingredients : [],
  //             };
  //           });
  //         }),
  //         tap((recipes) => {
  //           this.store.dispatch( new RecipeActions.SetRecpies(recipes))
  //           // this.recipeService.setRecipes(recipes);
  //         })
  //       );


  // }
}
