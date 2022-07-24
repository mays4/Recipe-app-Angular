 import { EventEmitter } from "@angular/core";
import { Ingredient } from "../shared/ingredient.model";
export class ShoppingService{
  ingredientChanged = new EventEmitter<Ingredient[]>();

  private ingredients: Ingredient[] = [
    new Ingredient('apples', 5),
    new Ingredient('banana', 10),
  ];
  getIngredient(){
    return this.ingredients.slice()
  }
  addIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
    this.ingredientChanged.emit(this.ingredients.slice())
      }
      addIngredients(ingredients: Ingredient []){
          // for(let ingredient of ingredients){
          //   this.addIngredient(ingredient)
          // }
          this.ingredients.push(...ingredients);
          this.ingredientChanged.emit(this.ingredients.slice())
      }

}
