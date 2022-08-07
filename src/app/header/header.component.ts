import { Component, EventEmitter, OnDestroy, OnInit, Output } from "@angular/core";
import { map, Subscription } from "rxjs";

import { AuthService } from "../auth/auth.service";
import  * as AuthActions from '../auth/store/auth.actions';
import * as fromApp from '../store/app.reducer';
import { Store } from '@ngrx/store';
import { DataStorageService } from "../shared/data-storge.service";

@Component({
  selector:'app-header',
  templateUrl:'./header.component.html',
  styleUrls:['./header.component.css']
})
export class HeaderComponent implements OnInit,OnDestroy{
 @Output() featureSelected = new EventEmitter<string>();
 isAuthanticated=false;
 private sub!:Subscription
 onSelect(feature:string){
     this.featureSelected.emit(feature);

 };
 constructor(private dataStorgeService :DataStorageService,private authService:AuthService ,private store:Store<fromApp.AppState>){}

ngOnInit(): void {
  // this.sub= this.authService.user.subscribe(user=>{
  this.sub= this.store.select('auth').pipe(map(authState=>{

    return authState.user
  }

    )).subscribe(user=>{
    this.isAuthanticated = !!user;

  })
}
 onSaveData(){
  this.dataStorgeService.storeRecipe()
 }
 onFetchData(){
    this.dataStorgeService.fetchRecipe().subscribe();
}
onLogout(){
  this.store.dispatch(new AuthActions.Logout());

}
ngOnDestroy(): void {
  this.sub.unsubscribe()
}
}
