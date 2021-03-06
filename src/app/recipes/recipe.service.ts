import {  Injectable } from "@angular/core";
import { Recipe } from "./recipe.model";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingService } from "../shopping-list/shopping.service";
import { identity, Subject } from "rxjs";
// import { Subject } from "rxjs";
@Injectable()
export class RecipeService{
  // recipeSelected = new Subject<Recipe>();
  recipeChanged = new Subject <Recipe[]>();
  // private recipes: Recipe[] = [
  //   new Recipe('A Test Recipe', 'This is simply a test', 'https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F9%2F2021%2F07%2F13%2FUltimate-Veggie-Burgers-FT-Recipe-0821.jpg&q=60',
  //   [new Ingredient('bun',2),
  //   new Ingredient('meat',4),
  //   new Ingredient('onion',1)
  //   ]),

  //   new Recipe('Another Test Recipe', 'This is simply a test of burger', 'https://elavegan.com/wp-content/uploads/2021/10/hand-stirring-creamy-tomato-sauce-vegetable-pasta-in-black-skillet.jpg',
  //   [new Ingredient('pasta',2),
  //   new Ingredient('meat',1),
  //   new Ingredient('onion',2),
  //   new Ingredient('tometo',2),
  //   ])
  // ];
   private recipes:Recipe[]=[];
  constructor(private shoppingService:ShoppingService){

  }
  setRecipes(recipes:Recipe[]){
    this.recipes = recipes
    this.recipeChanged.next(this.recipes.slice())
  }
getRecipe(){
  return this.recipes.slice()
}
addIngredientsToShoppingList(ingredients:Ingredient[]){
  this.shoppingService.addIngredients(ingredients)
}
getRecipeId(index:number){
  return this.recipes[index];

}
addRecipe(recipe:Recipe){
this.recipes.push(recipe)
this.recipeChanged.next(this.recipes.slice())
}
updateRecipe(index:number,newRecipe:Recipe){
  this.recipes[index] = newRecipe
  this.recipeChanged.next(this.recipes.slice())
}
deleteRecipe(index:number){
  this.recipes.splice(index,1);
  this.recipeChanged.next(this.recipes.slice())
}
}
