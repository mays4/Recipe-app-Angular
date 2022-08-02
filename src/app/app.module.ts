import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http' ;
import { AppComponent } from './app.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';

import { HeaderComponent } from './header/header.component';
import {RecipeListComponent}from'./recipes/recipe-list/recipe-list.component'
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
import { RecipeItemComponent } from './recipes/recipe-list/recipe-item/recipe-item.component';
import { ShoppingListEditComponent } from './shopping-list/shopping-list-edit/shopping-list-edit.component';
import { RecipesComponent } from './recipes/recipes.component';
import { DropdownDirective } from './shared/dropdown.directive';
import { ShoppingService } from './shopping-list/shopping.service';
import { AppRoutingModule } from './app-routing.module';

import { RecipeStartComponent } from './recipes/recipe-start/recipe-start.component';
import { RecipeEditComponent } from './recipes/recipe-edit/recipe-edit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RecipeService } from './recipes/recipe.service';
import { AuthComponent } from './auth/auth.component';

import { LoadingSpinnerComponent } from './shared/loading-spinner/loading-spinner.component';
import { AuthIntercepterService } from './auth/auth-intercepter.service';

@NgModule({
  declarations: [
    AppComponent,
    ShoppingListComponent,
    RecipeDetailComponent,
    RecipeItemComponent,
    RecipeListComponent,
    ShoppingListEditComponent,
    HeaderComponent,
    RecipesComponent,
    DropdownDirective,

    RecipeStartComponent,
     RecipeEditComponent,
     AuthComponent,
     LoadingSpinnerComponent
  ],
  imports: [
    BrowserModule,
    FormsModule ,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,

  ],
  providers: [ShoppingService,RecipeService,{provide:HTTP_INTERCEPTORS ,useClass:AuthIntercepterService,multi:true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
