
import {
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingService } from '../shopping.service';
import * as ShoppingListActions from '../store/shopping-list.actions';
import * as fromShoppingList from '../../store/app.reducer';
@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrls: ['./shopping-list-edit.component.css'],
})
export class ShoppingListEditComponent implements OnInit, OnDestroy {
  // @ViewChild('nameInput',{static:true}) nameInputRef!:ElementRef;
  // @ViewChild('amountInput',{static:true}) amountInputRef!:ElementRef;
  subscription!: Subscription;
  editMode = false;
  editingIndexItem!: number;
   editedItem!: Ingredient;
  @ViewChild('f', { static: false }) slForm!: NgForm;

  constructor(
    private shoppingService: ShoppingService,
    private store: Store<fromShoppingList.AppState >
  ) {}

  ngOnInit(): void {
     this.subscription=this.store.select('shoppingList').subscribe(stateData=>{
      if(stateData.editedIngredientIndex >-1){
        this.editMode = true;
        this.editedItem = stateData.editedIngredient;
        this.slForm.setValue({
          name: this.editedItem.name,
          amount: this.editedItem.amount,
        });
      }else{
        this.editMode = false;
      }
    })
    // this.subscription = this.shoppingService.startingEditing.subscribe(
    //   (index: number) => {
    //     this.editingIndexItem = index;
    //     this.editMode = true;
    //     this.editedItem = this.shoppingService.getIngredient(index);
    //     this.slForm.setValue({
    //       name: this.editedItem.name,
    //       amount: this.editedItem.amount,
    //     });
    //   }
    // );
  }
  onAdd(form: NgForm) {
    // const ingName = this.nameInputRef.nativeElement.value
    // const ingAmount=this.amountInputRef.nativeElement.value
    const value = form.value;
    const newIngrdient = new Ingredient(value.name, value.amount);
    if (this.editMode) {
      // this.shoppingService.updateIngredient(this.editingIndexItem,newIngrdient)
      this.store.dispatch(
        new ShoppingListActions.UpdateIngredient( newIngrdient

      ))
    } else {
      this.store.dispatch(new ShoppingListActions.AddIngredient(newIngrdient));
      // this.shoppingService.addIngredient(newIngrdient)
    }
    this.editMode = false;
    form.reset();
  }
  onClear() {
    this.slForm.reset();
    this.editMode = false;
    this.store.dispatch(new ShoppingListActions.StopEdit())
  }
  onDelete() {

    // this.shoppingService.deleteIngredient(this.editingIndexItem);
    this.store.dispatch(new ShoppingListActions.DeleteIngredient());
    this.onClear();
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.store.dispatch(new ShoppingListActions.StopEdit());
  }
}
