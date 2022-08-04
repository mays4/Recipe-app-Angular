import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingService } from './shopping.service';
import * as fromShoppingList from '../store/app.reducer';
import * as ShoppingListActions from '../shopping-list/store/shopping-list.actions'
@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],

})
export class ShoppingListComponent implements OnInit ,OnDestroy{

  ingredients!: Observable<{ ingredients: Ingredient[]}>;
  private ingChangeSub!: Subscription
  constructor(private shoppingService: ShoppingService,private store:Store<fromShoppingList.AppState>) {}

  ngOnInit() {

    this.ingredients=this.store.select('shoppingList')
    // this.ingredients =  this.shoppingService.getIngredients();
    // this.ingChangeSub =this.shoppingService.ingredientChanged.subscribe((ingredients: Ingredient[])=>{
    //   this.ingredients = ingredients;
    // })

  }
  onEditItem(index:number){
    this.store.dispatch(new ShoppingListActions.StartEdit(index))
    // this.shoppingService.startingEditing.next(index)

  }
  ngOnDestroy(): void {
    // this.ingChangeSub.unsubscribe()
  }



}
