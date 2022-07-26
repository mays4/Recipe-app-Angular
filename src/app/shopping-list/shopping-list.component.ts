import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingService } from './shopping.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],

})
export class ShoppingListComponent implements OnInit ,OnDestroy{

  ingredients: Ingredient[] = []
  private ingChangeSub!: Subscription
  constructor(private shoppingService: ShoppingService) {}

  ngOnInit() {
    this.ingredients =  this.shoppingService.getIngredient();
    this.ingChangeSub =this.shoppingService.ingredientChanged.subscribe((ingredients: Ingredient[])=>{
      this.ingredients = ingredients;
    })
  }
  ngOnDestroy(): void {
    this.ingChangeSub.unsubscribe()
  }



}
