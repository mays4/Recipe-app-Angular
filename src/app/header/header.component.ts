import { Component, EventEmitter, OnDestroy, OnInit, Output } from "@angular/core";
import { Subscription } from "rxjs";

import { AuthService } from "../auth/auth.service";
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
 constructor(private dataStorgeService :DataStorageService,private authService:AuthService ){}

ngOnInit(): void {
  this.sub= this.authService.user.subscribe(user=>{
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
  this.authService.logout()
}
ngOnDestroy(): void {
  this.sub.unsubscribe()
}
}
