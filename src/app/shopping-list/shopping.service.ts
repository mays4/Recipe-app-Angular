import { Subject } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';
export class ShoppingService {
  ingredientChanged = new Subject<Ingredient[]>();
  startingEditing = new Subject<number>();
  private ingredients: Ingredient[] = [
    new Ingredient('apples', 5),
    new Ingredient('banana', 10),
  ];

  getIngredients() {
    return this.ingredients.slice();
  }
  getIngredient(index:number){
    return this.ingredients[index]
  }
  addIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
    this.ingredientChanged.next(this.ingredients.slice());
  }
  addIngredients(ingredients: Ingredient[]) {
    // for(let ingredient of ingredients){
    //   this.addIngredient(ingredient)
    // }
    this.ingredients.push(...ingredients);
    this.ingredientChanged.next(this.ingredients.slice());
  }
  updateIngredient(index:number,newIngrdient:Ingredient){
    this.ingredients[index] = newIngrdient;
    this.ingredientChanged.next(this.ingredients.slice())

  }
  deleteIngredient(index:number){
    this.ingredients.splice(index,1)
    this.ingredientChanged.next(this.ingredients.slice())
  }
}
