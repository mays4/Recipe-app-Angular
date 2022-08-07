import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as AuthActions from './auth/store/auth.actions'
import { AuthService } from './auth/auth.service';
import { LoggingService } from './logging.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private authService:AuthService,private loggingService:LoggingService,private store:Store){}
  // loadedFeatures = 'shopping-list'
  // onNavigate(feature:string){
  //   this.loadedFeatures = feature;
  // }
  ngOnInit(){
   this.store.dispatch(new AuthActions.AutoLogin() );
  //  this.loggingService.printLog('hello from app comp')
  }
}
