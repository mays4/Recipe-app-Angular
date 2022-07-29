import { formatCurrency } from '@angular/common';
import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingService } from '../shopping.service';

@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrls: ['./shopping-list-edit.component.css']
})
export class ShoppingListEditComponent implements OnInit,OnDestroy {

  // @ViewChild('nameInput',{static:true}) nameInputRef!:ElementRef;
  // @ViewChild('amountInput',{static:true}) amountInputRef!:ElementRef;
  subscription!: Subscription;
  editMode = false;
  editingIndexItem!:number;
  editedItem!: Ingredient
  @ViewChild('f',{static:false}) slForm!: NgForm;

  constructor(private shoppingService : ShoppingService) {

   }

  ngOnInit(): void {

    this.subscription= this.shoppingService.startingEditing.subscribe((index:number)=>{
      this.editingIndexItem = index;
      this.editMode= true;
      this.editedItem = this.shoppingService.getIngredient(index)
      this.slForm.setValue({
        name: this.editedItem.name,
        amount:this.editedItem.amount,
      })

    });
  }
  onAdd(form: NgForm){
    // const ingName = this.nameInputRef.nativeElement.value
    // const ingAmount=this.amountInputRef.nativeElement.value
   const value = form.value
    const newIngrdient = new Ingredient(value.name,value.amount)
    if(this.editMode){
      this.shoppingService.updateIngredient(this.editingIndexItem,newIngrdient)
    }else{
      this.shoppingService.addIngredient(newIngrdient)
    }
    this.editMode=false
   form.reset()
  }
  onClear(){
    this.slForm.reset();
    this.editMode=false;
  }
  onDelete(){
    this.onClear()
    this.shoppingService.deleteIngredient(this.editingIndexItem)

  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
