import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';

@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrls: ['./shopping-list-edit.component.css']
})
export class ShoppingListEditComponent implements OnInit {

  @ViewChild('nameInput',{static:true}) nameInputRef!:ElementRef;
  @ViewChild('amountInput',{static:true}) amountInputRef!:ElementRef;
  @Output() ingredientAdded = new EventEmitter<Ingredient>();


  constructor() {

   }

  ngOnInit(): void {
  }
  onAdd(){
    const ingName = this.nameInputRef.nativeElement.value
    const ingAmount=this.amountInputRef.nativeElement.value
    const newIngrdient = new Ingredient(ingName ,ingAmount)
    this.ingredientAdded.emit(newIngrdient)
  }
}
