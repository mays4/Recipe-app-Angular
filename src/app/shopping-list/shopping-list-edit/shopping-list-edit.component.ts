import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingService } from '../shopping.service';

@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrls: ['./shopping-list-edit.component.css']
})
export class ShoppingListEditComponent implements OnInit {

  // @ViewChild('nameInput',{static:true}) nameInputRef!:ElementRef;
  // @ViewChild('amountInput',{static:true}) amountInputRef!:ElementRef;



  constructor(private shoppingService : ShoppingService) {

   }

  ngOnInit(): void {
  }
  onAdd(form: NgForm){
    // const ingName = this.nameInputRef.nativeElement.value
    // const ingAmount=this.amountInputRef.nativeElement.value
   const value = form.value
    const newIngrdient = new Ingredient(value.name,value.amount)
    this.shoppingService.addIngredient(newIngrdient)
  }
}
