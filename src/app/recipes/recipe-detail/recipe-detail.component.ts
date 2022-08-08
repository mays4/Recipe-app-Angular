import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,  Router } from '@angular/router';

import { Recipe } from '../recipe.model';

import * as RecipeActions from '../store/recipe.actions';
import { Store } from '@ngrx/store';
import * as fromApp from '../../store/app.reducer';
import { map, switchMap } from 'rxjs';
import * as ShoppingListActions from '../../shopping-list/store/shopping-list.actions'
@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css'],
})
export class RecipeDetailComponent implements OnInit {
  // @Input() recipe!: Recipe;
  recipe!: Recipe|any;
  id!: number;

  constructor(

    private route: ActivatedRoute,
    private router: Router,
    private store: Store<fromApp.AppState>
  ) {}

  ngOnInit() {
    //  this.route.params.subscribe((params:Params)=>{
    //      this.id = +params['id']
    //      this.recipe= this.recipeService.getRecipeId(this.id)
    //  })

    this.route.params
      .pipe(
        map(params => {
          return +params['id'];
        }),
        switchMap(id => {
          this.id = id;
          return this.store.select('recipes');
        }),
        map(reipcesState => {
          return reipcesState.recipes.find((recipe, index) => {
            return index === this.id;
          });
        })
      )
      .subscribe(recipe => {
        this.recipe = recipe;
      });
  }
  onAddToShoppingList() {
    this.store.dispatch(new ShoppingListActions.AddIngredients(this.recipe.ingredients))
    // this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients);
  }
  onEdit() {
    this.router.navigate(['edit'], { relativeTo: this.route });
    // this.router.navigate(['../',this.id,'edit'],{relativeTo:this.route})
  }
  onDelete() {
    this.store.dispatch(new RecipeActions.DeleteRecipe(this.id))
    // this.recipeService.deleteRecipe(this.id);
    this.router.navigate(['/recipes']);
  }
}
