import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http' ;
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core.module';
import {StoreModule} from '@ngrx/store'
import { shoppingListReducer } from './shopping-list/store/shopping-list.reducer';


import * as fromApp from './store/app.reducer';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    SharedModule,
    // StoreModule.forRoot({shoppingList:shoppingListReducer}),
    StoreModule.forRoot(fromApp.appReducer),
    CoreModule,

  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
