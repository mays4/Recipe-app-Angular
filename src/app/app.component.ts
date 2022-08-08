import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Store } from '@ngrx/store';
import * as AuthActions from './auth/store/auth.actions'
import { AuthService } from './auth/auth.service';
import { LoggingService } from './logging.service';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private authService:AuthService,private loggingService:LoggingService,private store:Store,
  @Inject(PLATFORM_ID) private platformId:any
    ){}
  // loadedFeatures = 'shopping-list'
  // onNavigate(feature:string){
  //   this.loadedFeatures = feature;
  // }
  ngOnInit(){
    if(isPlatformBrowser(this.platformId)){
      this.store.dispatch(new AuthActions.AutoLogin() );
    }
  //  this.store.dispatch(new AuthActions.AutoLogin() );
   this.loggingService.printLog('hello from app comp')
  }
}
