import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { RecipeService } from '../recipe.service';
import * as RecipeActions from '../store/recipe.actions';
import { Store } from '@ngrx/store';
import * as fromApp from '../../store/app.reducer';
import { map, Subscription } from 'rxjs';
@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css'],
})
export class RecipeEditComponent implements OnInit ,OnDestroy{
  id!: number;
  editMode = false;
  recipeForm!: FormGroup;
  private storeSub!: Subscription;

  constructor(
    private route: ActivatedRoute,
    // private recipeService: RecipeService,
    private router: Router,
    private store: Store<fromApp.AppState>
  ) {}


  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.editMode = params['id'] != null;
      this.initForm();
    });
  }
  onAddIngredient() {
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        name: new FormControl(null, Validators.required),
        amount: new FormControl(null, [
          Validators.required,
          Validators.pattern(/^[1-9]+[0-9]*$/),
        ]),
      })
    );
  }

  private initForm() {
    let recipeName = '';
    let recipePath = '';
    let description = '';
    const recipeIngredients = new FormArray([]);

    if (this.editMode) {
      // this.store.dispatch( new RecipeActions.FETCH_RECIPES())
      // const recipe = this.recipeService.getRecipeId(this.id);

      // recipeName = recipe.name;
      // recipePath = recipe.imagePath;
      // description = recipe.description;
      // if (recipe['ingredients']) {
      //   for (let ingredient of recipe.ingredients) {
      //     recipeIngredients.push(<never>
      //       new FormGroup({
      //         'name': new FormControl(ingredient.name,Validators.required),
      //         'amount': new FormControl(ingredient.amount,[Validators.required,Validators.pattern(/^[1-9]+[0-9]*$/)]),
      //       })
      //       );
      //     }

      //   }
      this.storeSub = this.store
        .select('recipes')
        .pipe(
          map(recipeState => {
            return recipeState.recipes.find((recipe, index) => {
              return index === this.id;
            });
          })
        )
        .subscribe((recipe:any) => {
          recipeName = recipe.name;
          recipePath = recipe.imagePath;
          description = recipe.description;
          if (recipe['ingredients']) {
            for (let ingredient of recipe.ingredients) {
              recipeIngredients.push(
                <never>new FormGroup({
                  name: new FormControl(ingredient.name, Validators.required),
                  amount: new FormControl(ingredient.amount, [
                    Validators.required,
                    Validators.pattern(/^[1-9]+[0-9]*$/),
                  ]),
                })
              );
            }
          }
        });
    }
    this.recipeForm = new FormGroup({
      name: new FormControl(recipeName, Validators.required),
      imagePath: new FormControl(recipePath, Validators.required),
      description: new FormControl(description, Validators.required),
      ingredients: recipeIngredients,
    });
  }
  getControls() {
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }
  onSubmit() {
    // const newRecipe= new Recipe(this.recipeForm.value['recipeName'],this.recipeForm.value['description'],this.recipeForm.value['imagePath'],this.recipeForm.value['ingredients']
    // )
    if (this.editMode) {
      this.store.dispatch( new RecipeActions.UpdateRecipe({ index:this.id,newRecipe:this.recipeForm.value}))
      // this.recipeService.updateRecipe(this.id, this.recipeForm.value);
    } else {
      // this.recipeService.addRecipe(this.recipeForm.value);
      this.store.dispatch( new RecipeActions.AddRecipe(this.recipeForm.value))
    }
    this.onCancel();
  }
  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }
  onDeletingIng(index: number) {
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }
  ngOnDestroy(): void {
    if(this.storeSub){
      this.storeSub.unsubscribe()
    }

  }
}
