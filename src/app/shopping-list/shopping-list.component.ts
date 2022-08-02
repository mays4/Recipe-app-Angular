import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { LoggingService } from '../logging.service';
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
  constructor(private shoppingService: ShoppingService,private logService:LoggingService) {}

  ngOnInit() {
    this.ingredients =  this.shoppingService.getIngredients();
    this.ingChangeSub =this.shoppingService.ingredientChanged.subscribe((ingredients: Ingredient[])=>{
      this.ingredients = ingredients;
    })
    this.logService.printLog("hello from shopping-list")
  }
  onEditItem(index:number){
    this.shoppingService.startingEditing.next(index)

  }
  ngOnDestroy(): void {
    this.ingChangeSub.unsubscribe()
  }



}
